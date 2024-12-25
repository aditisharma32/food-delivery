import express from "express"
import { loginUser, registerUser, getUserData } from "../controllers/UserController.js";
import auth from "../middleware/auth.js";



const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/profile", auth, getUserData);

export default userRouter;