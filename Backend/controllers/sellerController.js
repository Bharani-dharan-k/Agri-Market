const Seller = require("../models/Seller");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

// Register Seller
const registerSeller = async (req, res) => {
  const { name, email, password, phone, shopName, businessType } = req.body;

  try {
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) return res.status(400).json({ message: "Seller already exists" });

    const seller = await Seller.create({ name, email, password, phone, shopName, businessType });

    if (seller) {
      res.status(201).json({
        _id: seller.id,
        name: seller.name,
        email: seller.email,
        token: generateToken(seller.id),
      });
    } else {
      res.status(400).json({ message: "Invalid seller data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login Seller
const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });

    if (seller && (await bcrypt.compare(password, seller.password))) {
      res.json({
        _id: seller.id,
        name: seller.name,
        email: seller.email,
        token: generateToken(seller.id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Seller Dashboard
const getSellerDashboard = async (req, res) => {
  try {
    if (!req.seller) {
      return res.status(403).json({ message: "Access Denied" });
    }
    res.json(req.seller);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerSeller, loginSeller, getSellerDashboard };
