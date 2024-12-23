import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food item

const addFood = async(req, res) =>{
    //let image_filename = req.file ? `${req.file.filename}` : '';
    console.log("File path:", req.file?.path); // Debug: Log file path
    let image_filename = req.file ? `${req.file.filename}` : 'D:/Project/food-del/frontend/src/assets/food_3.png';

    const food = new foodModel({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price,
        category : req.body.category,
        image: image_filename
    })
    try{
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
        if(food.image){
            fs.unlinkSync(`uploads/${food.image}`,()=>{})

            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success:true, message:"Food item removed successfully"});
        }
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Failed to remove food item"});
    }
}

export {addFood, listFood, removeFood}