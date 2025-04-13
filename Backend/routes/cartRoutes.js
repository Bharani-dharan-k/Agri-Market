const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/cartMiddlerware");

const router = express.Router();

router.get("/", authMiddleware, getCart); // ✅ Fetch cart (requires authentication)
router.post("/add", authMiddleware, addToCart); // ✅ Add to cart (requires authentication)
router.delete("/remove/:productId", authMiddleware, removeFromCart); // ✅ Remove from cart (requires authentication)

module.exports = router;
