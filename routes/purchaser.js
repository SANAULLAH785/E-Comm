const auth = require("../Middleware/auth");
const purchaserControllers = require("../Controllers/purchaserController");

const { Router } = require("express");
const router = Router();

// Purchasers

// Purchaser -> Signup -> Signin -> View available products -> add products to cart -> Place order and Checkout via stripe

// Post Purchaser signup
// Credentials save
// router.post("/signup", purchaserControllers.Signup);
router.post("/signup", purchaserControllers.Signup);
router.post("/signin", purchaserControllers.Signin);

router.get("/products", purchaserControllers.viewProducts);
 router.post("/myCart/:id", auth, purchaserControllers.addProductToCart);
router.get("/myCart", auth, purchaserControllers.viewCartProducts);
//  router.post("/checkout", auth, purchaserControllers.checkout);
// router.get("/orders/:id", auth, purchaserControllers.viewOrders);

module.exports = router;
