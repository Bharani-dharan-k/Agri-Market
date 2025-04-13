const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // ✅ Debugging

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received Token:", token); // ✅ Debugging

  if (!token || token === "null") {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token Payload:", decoded); // ✅ Debugging

    req.seller = await Seller.findById(decoded.id).select("-password");

    if (!req.seller) {
      return res.status(401).json({ message: "Seller not found" });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token, authentication failed" });
    }
    
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
