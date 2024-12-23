import foodModel from "../models/foodModel.js";
import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

// add food item

const addFood = async(req, res) =>{
    try {
        const imageBuffer = req.file ? req.file.buffer : null;
        const food = new foodModel({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            image: imageBuffer
        })
        await food.save();
        res.json({success:true, message:"Food item added successfully"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to add food item"});
    }
}

// all food list

const listFood = async (req,res) => {
    try{
        const food_list = await foodModel.find({});
        res.json({success:true, data:food_list});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to fetch food items"});
    }
}

//remove food item

const removeFood = async (req,res) =>{
    try{
        const food = await foodModel.findById(req.body.id);

        if (food) {
            await foodModel.findByIdAndDelete(req.body.id);

            res.json({ success: true, message: "Food item removed successfully" });
        } else {
            res.status(404).json({ success: false, message: "Food item not found" });
        }
    }catch(error){
        console.log("Error in removeFood:", error);
        res.json({ success: false, message: "Failed to remove food item" });
    }
};

const getImage = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id); // Fetch food item by ID
        if (!food || !food.image) {
            return res.status(404).json({ success: false, message: "Image not found" });
        }

        // Set the appropriate content type (can be image/jpeg, image/png, etc.)
        res.setHeader('Content-Type', 'image/jpeg');

        res.send(food.image);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch image" });
    }
};

export {addFood, listFood, removeFood, getImage}