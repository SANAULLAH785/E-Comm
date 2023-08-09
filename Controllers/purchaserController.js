// const { getCollection } = require("../db/connect");
const Purchaser = require("../Models/PurchaserModel");
const Product = require("../Models/ProductModel");
const Cart = require("../Models/CartModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");
// const adminControllers = require("./adminControllers");

const purchaserControllers = {};

purchaserControllers.Signup = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const existingUser = await Purchaser.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Purchaser  with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newpurchaser = new Purchaser({
      name,
      email,
      password: hashPassword,
      role: "purchaser",
    });
    await newpurchaser.save();

    res.status(201).json(newpurchaser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create Purchaser" });
  }
};
purchaserControllers.Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingpurchaser = await Purchaser.findOne({ email });
    if (!existingpurchaser) {
      return res.status(400).send("Purchaser with this email does not exist");
    }
    const isvalidpassword = await bcrypt.compare(
      password,
      existingpurchaser.password
    );
    if (!isvalidpassword) {
      return res.status(401).json({ error: "invalid password" });
    }
    const token = jwt.sign(
      { userid: existingpurchaser._id, username: existingpurchaser.name },
      jwtSecret
    );
    res.status(200).send(token);
  } catch (error) {
    res.status(500).send("Failed to login as purchaser");
  }
};
purchaserControllers.viewProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
purchaserControllers.addProductToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.id;
    const user = await Purchaser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    const existingProduct = cart.items.find(
      (item) => item.productid.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.items.push({ productid: productId });
    }
    await cart.save();
    res.send(`Product with ID ${productId} has been added to the cart`);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
purchaserControllers.viewCartProducts=async(req,res)=>{
try{
    const cartproducts=await Cart.find({});
    res.json(cartproducts);
}catch(error){
    res.status(500).send({error:'Internl server error'});
}
};

module.exports = purchaserControllers;
