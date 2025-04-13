const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  grade: String,
  image: String,
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// ✅ Prevent model overwrite error
module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
