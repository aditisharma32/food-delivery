import { fileURLToPath } from 'url';
import path from 'path';
import express from "express";
import { addFood , listFood, removeFood, getImage} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for adding food
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("File:", req.file);  // Debug: Check if file is being populated
    next();
}, addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove", removeFood);

foodRouter.get('/image/:imageUrl', getImage);

export default foodRouter;
