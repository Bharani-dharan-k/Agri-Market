const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const sellerRoutes = require("./routes/sellerRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const twilio = require("twilio");
const path = require("path");

dotenv.config(); // ✅ Load environment variables
connectDB(); // ✅ Connect to the database

const app = express();

// ✅ Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !twilioPhone) {
  console.error("❌ Twilio configuration is missing in .env!");
  process.exit(1);
}

const twilioClient = twilio(accountSid, authToken);

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ Parses JSON requests
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.use("/api/sellers", sellerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Twilio SMS API Route
app.post("/api/send-sms", async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ success: false, message: "Phone and message are required!" });
  }

  try {
    const smsResponse = await twilioClient.messages.create({
      body: message,
      from: twilioPhone,
      to: phone,
    });

    console.log(`✅ SMS sent to ${phone}, SID: ${smsResponse.sid}`);
    res.status(200).json({ success: true, message: "SMS Sent Successfully!", sid: smsResponse.sid });
  } catch (error) {
    console.error("❌ Twilio Error:", error);
    res.status(500).json({ success: false, message: "Failed to send SMS", error: error.message });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
