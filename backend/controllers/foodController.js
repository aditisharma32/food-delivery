import foodModel from "../models/foodModel.js";
import { google } from "googleapis";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
  },
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: "v3", auth });

const uploadToGoogleDrive = async (fileBuffer, fileName, mimeType) => {
    const media = {
      mimeType: mimeType,
      body: Readable.from(fileBuffer),
    };
  
    const fileMetadata = {
      name: fileName,
    };
  
    try {
      const file = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
      });
  
      const fileId = file.data.id;

      await drive.permissions.create({
          fileId: fileId,
          requestBody: {
              role: 'reader',
              type: 'anyone',
          },
      });

      const publicUrl = `https://drive.google.com/uc?id=${fileId}`;
      return publicUrl;
    } catch (error) {
      console.error('Error uploading to Google Drive:', error);
      throw error;
    }
  };

// add food item

const addFood = async(req, res) =>{
    try {
        const imageBuffer = req.file ? req.file.buffer : null;
        if (!imageBuffer) {
          return res.status(400).json({ success: false, message: 'No image provided' });
        }  
        const mimeType = req.file.mimetype;
        const imageUrl = await uploadToGoogleDrive(imageBuffer, req.file.originalname, mimeType);
        console.log('Public URL:', imageUrl);
  
        const food = new foodModel({
            name : req.body.name,
            description : req.body.description,
            price : req.body.price,
            category : req.body.category,
            image: imageUrl,
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
            const fileId = extractFileIdFromUrl(food.image);

            await drive.files.delete({ fileId: fileId });
            
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

const extractFileIdFromUrl = (url) => {
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
};

const getImage = async (req, res) => {
    try {
        const imageUrl = req.params.imageUrl;
        const fileId = extractFileIdFromUrl(imageUrl);
      
        if (!fileId) {
          return res.status(400).json({ success: false, message: 'Invalid image URL' });
        }
        
        const file = await drive.files.get({
          fileId: fileId,
          alt: 'media', // Fetch the media (image)
        }, { responseType: 'stream' });
        
        res.setHeader('Content-Type', file.headers['content-type']);
        file.data.pipe(res); // Pipe the image data directly to the response (this sends the image to the frontend)
    } catch (error) {
        console.error('Error fetching image from Google Drive:', error);
        res.status(500).json({ success: false, message: "Failed to fetch image" });
    }
  };

export {addFood, listFood, removeFood, getImage};