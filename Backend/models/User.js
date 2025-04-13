const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // ✅ Auto-generated ID
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
