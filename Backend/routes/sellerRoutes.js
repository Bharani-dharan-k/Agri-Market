const express = require("express");
const { registerSeller, loginSeller, getSellerDashboard } = require("../controllers/sellerController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerSeller);
router.post("/login", loginSeller);
router.get("/dashboard", protect, getSellerDashboard);

module.exports = router;
