const Cart = require("../models/Cart");
const Product = require("../models/productModel"); // ✅ Import Product model

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ userId }).populate({
      path: "products.productId",
      select: "name price image", // ✅ Fetch only required fields
    });

    if (!cart) {
      return res.json({ products: [] }); // ✅ Return empty cart if no cart exists
    }

    // ✅ Transform response to include full image path
    const formattedCart = cart.products.map((item) => ({
      productId: item.productId._id, 
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image 
        ? `http://localhost:5000/uploads/${item.productId.image}` // ✅ Ensure full path
        : "http://localhost:5000/uploads/default-placeholder.png", // ✅ Fallback default image
      quantity: item.quantity,
    }));

    console.log("✅ Cart Data Sent to Frontend:", formattedCart);
    res.json({ products: formattedCart }); // ✅ Send formatted data
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
};

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // ✅ Validate input
    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    console.log("🛒 Adding to Cart - Product ID:", productId, "Quantity:", quantity);

    // ✅ Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      console.error("❌ Product Not Found:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("✅ Product Found:", product);

    // ✅ Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      console.log("🛍️ No Cart Found, Creating New Cart...");
      cart = new Cart({ userId, products: [] });
    }

    // ✅ Check if product already exists in cart
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
      console.log("🔄 Updated Quantity for Existing Product:", cart.products[existingProductIndex]);
    } else {
      cart.products.push({
        productId: product._id, // ✅ Ensure correct ObjectId format
        name: product.name, // ✅ Store name
        price: product.price, // ✅ Store price
        image: product.image, // ✅ Store image
        quantity,
      });
      console.log("➕ Added New Product to Cart:", product);
    }

    // ✅ Save updated cart
    await cart.save();

    console.log("✅ Cart Updated Successfully:", cart);
    res.json({ message: "Product added to cart successfully", cart });
  } catch (error) {
    console.error("❌ Error in addToCart:", error);
    res.status(500).json({ message: "Failed to add product to cart", error: error.message });
  }
};

// Remove product after purchase
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter((item) => item.productId.toString() !== productId);
    await cart.save();

    res.json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove product", error: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };
