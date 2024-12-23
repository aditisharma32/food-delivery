import { fileURLToPath } from 'url';
import path from 'path';
import express from "express";
import { addFood , listFood, removeFood} from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure "uploads" directory exists
const uploadPath = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Route for adding food
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
    console.log("File:", req.file);  // Debug: Check if file is being populated
    next();
}, addFood);

foodRouter.get("/list", listFood);

foodRouter.post("/remove", removeFood);



export default foodRouter;
