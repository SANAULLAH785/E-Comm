// const { getCollection } = require("../db/connect");
const User=require('../Models/UsersModel');
const Product=require('../Models/ProductModel');
const Seller =require('../Models/SellerModel');
const Purchaser=require('../Models/PurchaserModel');
const Order=require('../Models/OrderModel');
const bcrypt=require('bcrypt');
require("dotenv").config();
const jstsecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");


const adminControllers = {};

// Controller to View Products:
adminControllers.signUp = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newAdmin = new User({ name, email, password: hashPassword, role: 'admin' });
    await newAdmin.save();

    res.status(201).json(newAdmin);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create admin' });
  }
};
adminControllers.signIn=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const existinguser=await User.findOne({email});
    if(!existinguser){
     return res.status(400).send("user with this email does not exist");
    }
    const ispassword=await bcrypt.compare(password,existinguser.password);
    if(!ispassword){
      console.log(existinguser.password);
     return res.status(400).json({ error: "Incorrect password." });
    }
    const token=jwt.sign({userid:existinguser._id,username:existinguser.name},jstsecret)
    res.status(200).json({token});
  }
  catch(err){
    res.status(500).json("Falid to login as admin")
  }
};

adminControllers.viewProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
adminControllers.viewSellers=async(req,res)=>{
try{
  const sellers =await Seller.find({});
  res.json(sellers); 
}catch(error){
console.error('error fetching sellers',error);
res.status(500).json({error:'Internal server error'});
}
};
adminControllers.viewPurchasers=async(req,res)=>{
try{
  const purchaser=await Purchaser.find({});
  res.json(purchaser);
}catch(error){
  console.error('error fetching purchasers',error);
  res.status(500).json({error:'Internal server error'});
}
};

adminControllers.viewOrders=async(req,res)=>{
try{
  const orders=await Order.find({});
  res.json(orders);
}catch(error){
  console.error('error fetching orders',error);
  res.status(500).json({error:'Internl server error'});
}
};

module.exports = adminControllers;
