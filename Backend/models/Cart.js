const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // ✅ Reference Product
      name: { type: String, required: true },  // ✅ Store Product Name
      price: { type: Number, required: true }, // ✅ Store Product Price
      image: { type: String, required: true }, // ✅ Store Product Image
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

module.exports = mongoose.model("Cart", CartSchema);
