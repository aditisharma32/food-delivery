import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
//import Stripe from "stripe";


//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order from frontend
const placeOrder = async (req, res) =>{

    const frontend_url = process.env.FRONTEND_URL || "http://localhost:5173";
    try {
        let order = new orderModel({
            userId: req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address: req.body.address
        })
        await order.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});
        
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price*100*80
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity:1
        })
        // const session = await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode: "payment",
        ////   payment_method_types: ["card"],
        //     success_url: `${frontend_url}/verfiy?success=true&orderId=${newOrder._id}`,
        //     cancel_url: `${frontend_url}/verfiy?success=false&orderId=${newOrder._id}`,
        // })
        //res.json({success: true, session_url:sessionStorage.url, message: "Order placed successfully"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error In orderController.js under placeOrder."});
    }
}

const verifyOrder = async (req, res) =>{
    const {orderId, success} = req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true});
            res.json({success: true, message: "Payment successful"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message: "Payment failed"});
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "Internal server error"});
    }
}

//user orders for frontend
const userOrders = async (req, res) =>{
    try{
        const orders = await orderModel.find({userId: req.body.userId});
        console.log(orders);
        console.log(orders);
        res.json({success:true, data:orders});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "Internal server error"});
    }
}


// listing orders for admin panel

const listOrders = async (req, res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "Internal server error"});
    }
}


// api for updating order status

const updateStatus = async (req, res) =>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message: "Order status updated"});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message: "Internal server error"});
    }
}

export {placeOrder, verifyOrder, userOrders,listOrders,updateStatus}