const auth = require('../Middleware/auth');
const sellerControllers = require("../Controllers/sellerControllers");
const { Router } = require("express");
const router = Router();

const imagesave =require('../Middleware/imagesave');
router.post("/signup", sellerControllers.Signup);
router.post("/signin", sellerControllers.Signin);
router.post("/product", auth, imagesave, sellerControllers.createProduct);

module.exports = router;
