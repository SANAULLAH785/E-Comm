const { Router } = require("express");
const router = Router();
const Product=require('../Models/ProductModel');
// adminControllers.viewProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
//Show all the featured products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
     // Await the query execution
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
