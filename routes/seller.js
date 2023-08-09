const auth = require('../Middleware/auth');
const sellerControllers = require("../Controllers/sellerControllers");
const { Router } = require("express");
const router = Router();
// const imagesaver= require('../Middleware/imageupload');
// const storage = multer.diskStorage({
//     destination: "./images/",
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + file.originalname);
//     },
    
//   });
//   const upload = multer({ storage });
const imagesave =require('../Middleware/imagesave');
router.post("/signup", sellerControllers.Signup);
router.post("/signin", sellerControllers.Signin);
router.post("/product", auth, imagesave, sellerControllers.createProduct);

module.exports = router;
