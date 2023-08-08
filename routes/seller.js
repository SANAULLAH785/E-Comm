const auth = require('../Middleware/auth');
const sellerControllers = require("../Controllers/sellerControllers");
const { Router } = require("express");
const router = Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/signup", auth, sellerControllers.Signup);
router.post("/signin", auth, sellerControllers.Signin);
router.post("/product", auth, upload.single('image'), sellerControllers.createProduct);

module.exports = router;
