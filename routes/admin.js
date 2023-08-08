const auth = require('../Middleware/auth');
const adminControllers = require("../Controllers/adminControllers");
const { Router } = require("express");
const router = Router();



// Can view Products
router.post("/signup",auth,adminControllers.signUp);
router.post("/signin",auth,adminControllers.signIn);
 router.get("/products", auth, adminControllers.viewProducts);

// // Can view Sellers
router.get("/Sellers", auth, adminControllers.viewSellers);

// // Can view Purchasers
 router.get("/purchaser", auth,adminControllers.viewPurchasers);

// // Can restrict Products, seller, purchasers
// router.put("/purchaser/restrict/:id", auth, adminControllers.restrictPurchaser);
// router.put("/Seller/restrict/:id", auth,adminControllers.restrictSeller);
// router.put("/Products/restrict/:id", auth,adminControllers.restrictProduct);

// // Can view orders
router.get("/orders", auth,adminControllers.viewOrders);

module.exports = router;
