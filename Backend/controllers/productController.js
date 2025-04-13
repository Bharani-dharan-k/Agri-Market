const Product = require("../models/productModel");

// Add a New Product
const addProduct = async (req, res) => {
  try {
    const { name, price, quantity, grade } = req.body;
    const image = req.file ? req.file.filename : null; // ✅ Store filename only

    // Ensure seller authentication
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized - Seller not found" });
    }

    const sellerId = req.seller.id; // ✅ Use req.seller.id instead of req.user.id

    if (!name || !price || !quantity || !grade) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, price, quantity, grade, image, sellerId });
    await newProduct.save();

    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Products (Only Seller's Products)
const getProducts = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized - Seller not found" });
    }

    const sellerId = req.seller.id;
    const products = await Product.find({ sellerId });

    // ✅ Update Image Path for Frontend
    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      image: product.image ? `http://localhost:5000/uploads/${product.image}` : null, 
    }));

    res.json(updatedProducts);
  } catch (error) {
    console.error("Error in getProducts:", error);
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


// Delete a Product by ID (Only if Owner)
const deleteProduct = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized - Seller not found" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.seller.id) {
      return res.status(403).json({ message: "Not authorized to delete this product" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a Product
const updateProduct = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(401).json({ message: "Unauthorized - Seller not found" });
    }

    const { name, price, quantity, grade } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId.toString() !== req.seller.id) {
      return res.status(403).json({ message: "Not authorized to update this product" });
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (quantity) product.quantity = quantity;
    if (grade) product.grade = grade;

    await product.save();

    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name");

    const updatedProducts = products.map((product) => ({
      ...product.toObject(),
      image: product.image ? `http://localhost:5000/uploads/${product.image}` : null,
    }));

    res.json(updatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error: error.message });
  }
};


module.exports = { addProduct, getProducts, deleteProduct, updateProduct,getAllProducts };
