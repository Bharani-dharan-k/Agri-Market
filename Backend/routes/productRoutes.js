const express = require("express");
const {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Routes for sellers (requires authentication)
router.post("/add-product", authMiddleware, upload.single("image"), addProduct);
router.get("/", authMiddleware, getProducts); // Fetch products added by the authenticated seller
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/:id", authMiddleware, updateProduct);

// Route for users to view all available products (no authentication required)
router.get("/user-product", getAllProducts);

module.exports = router;
