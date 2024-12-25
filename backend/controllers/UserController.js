import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs"
import argon2 from "argon2";
import validator from "validator";

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exists" });
    }
    const isMatch = await argon2.verify(user.password, password);
    
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    
    const token = createToken(user._id);
    res.json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//register user

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // check if users already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }
    // validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    //hashing user password
    //const salt = bcrypt.genSaltSync(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    // const newUser = new userModel({
    //     name:name,
    //     email:email,
    //     password:hashedPassword
    // })
    const hashedPassword = await argon2.hash(password);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

const getUserData = async (req, res) => {
  try {
    const useId = req.body.userId

    if (!useId) {
      return res.status(401).json({ success: false, message: "Unauthorized access" });
    }
    const user = await userModel.findById(useId).select('name email');

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User data fetched successfully", userData: { name: user.name, email: user.email} });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser, getUserData };
