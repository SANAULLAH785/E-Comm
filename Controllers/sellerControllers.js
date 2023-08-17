const Seller = require('../Models/SellerModel');
const Product = require('../Models/ProductModel');
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

const sellerControllers = {};

sellerControllers.Signup = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;
        const existingUser = await Seller.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Seller with this email already exists');
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
            return res.status(401).send('Invalid Password');
        }
        const token = jwt.sign({ userid: existingseller._id, username: existingseller.name }, jwtSecret);
        res.status(200).send(token);
    } catch (error) {
        res.status(500).send('Failed to login as Seller');
    }
};

sellerControllers.createProduct = async (req, res) => {
    const { name, description, quantity, price } = req.body;
    try {
        const existingProduct = await Product.findOne({ product_name: name });
        if (existingProduct) {
            return res.status(400).send('Product already exists with this name');
        }
        console.log(req.imageUrl);
        const newProduct = new Product({
            product_name: name,
            description: description,
            quantity: quantity,
            price: price,
            sellerId: req.user.userid,
            image_key: req.imageUrl
        });
        await newProduct.save();
        return res.status(201).send(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
};
sellerControllers.viewProduct = async (req, res) => {
    try {
        
        const products = await Product.find({ sellerId: req.user.userid });
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch seller products" });
    }
};
sellerControllers.editProduct = async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    console.log(req.body);
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product with this ID not found." });
      }
  
      const { name, description, price ,quantity} = req.body;
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.imageUrl = req.imageUrl || product.imageUrl;
      product.quantity=quantity || product.quantity;
  
      await product.save();
  
      res.send(`Edit Product with ID ${id} Successful`);
    } catch (error) {
      console.log(error,'error');
      res.status(500).json({ message: "Failed to edit product fsdf" });
    }
  };
  sellerControllers.deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Product with this ID not found." });
      }
      if (product.sellerId == req.user.userid) {
        await Product.findByIdAndDelete(id);
        return res.send(`Delete Product with ID ${id} Successful`);
      }
      res.status(201).json({ error: "Bad Request" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  };
module.exports = sellerControllers;
