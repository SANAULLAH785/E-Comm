// const { getCollection } = require("../db/connect");
const Seller = require('../Models/SellerModel');
const Product=require('../Models/ProductModel');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");
// const { uploadFile, getFileStream } = require('../Middleware/imageupload')
const { uploadFile, getFileStream } = require('../Middleware/s3');


const sellerControllers = {};

sellerControllers.Signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const existingUser = await Seller.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Seller with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newseller = new Seller({ name, email, password: hashPassword, role: 'seller' });
        await newseller.save();

        res.status(201).json(newseller);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create seller' });
    }
};
sellerControllers.Signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingseller = await Seller.findOne({ email });
        if (!existingseller) {
            return res.status(400).send('Seller with this email does not exist');
        }
        const isvalidpassword = await bcrypt.compare(password, existingseller.password);
        if (!isvalidpassword) {
            return res.status(400).json({error:'invalid password'});
        }
        const token=jwt.sign({userid:existingseller._id,username:existingseller.name},jwtSecret);
        res.status(200).send(token);
    }catch(error){
        res.status(500).send('Failed to login as Seller');
    }
};
// sellerControllers.createProduct = async (req, res) => {
//    const {name,description}=req.body;
//    const existingproduct=await Product.findOne({name});
//    if(existingproduct){
//     res.status(400).send('Product already exist with this name');
//    }
//    const newproduct =new Product({name:name,description:description});
//    await newproduct.save();
//    res.status(201).send("Product created");
// };
sellerControllers.createProduct = async (req, res) => {
    const { name, description, quantity, price } = req.body;

    try {
        const existingProduct = await Product.findOne({ product_name: name });

        if (existingProduct) {
            return res.status(400).send('Product already exists with this name');
        }

        if (!req.file) {
            return res.status(400).send('No image uploaded');
        }
        const file = req.file

        const uploadedImage = await uploadFile(file);
        console.log('s3key')
        console.log(uploadedImage);
        const newProduct = new Product({
            product_name: name,
            description: description,
            quantity: quantity,
            price: price,
            sellerId: req.user.userid, // Assuming you have this information in your authentication middleware
            image_key: uploadedImage.Key,
            image_url: uploadedImage.Location,
        });
        

        await newProduct.save();
        return res.status(201).send(newProduct);
        
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
  

module.exports = sellerControllers;
