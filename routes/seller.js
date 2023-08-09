const auth = require('../Middleware/auth');
const sellerControllers = require("../Controllers/sellerControllers");
const { Router } = require("express");
const router = Router();
// const imagesaver= require('../Middleware/imageupload');
const multer = require('multer');
// const upload = multer(); // Initialize multer without storage options
const upload = multer({ dest: 'uploads/' });
router.post("/signup", sellerControllers.Signup);
router.post("/signin", sellerControllers.Signin);
router.post("/product", auth, upload.single('image'), sellerControllers.createProduct);

module.exports = router;
