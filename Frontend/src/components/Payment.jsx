import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css"; // ✅ Ensure this CSS file exists

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalAmount, transactionFee, finalAmount } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);

  console.log("🛒 Payment Page Data:", { cartItems, totalAmount, transactionFee, finalAmount });

  // ✅ Function to Send SMS Receipt
  const sendReceiptSMS = async () => {
    if (!cartItems || cartItems.length === 0 || !finalAmount) {
      console.warn("⚠️ Cannot send SMS: Missing required data.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/send-sms", {
        phone: "+919080105868", // ✅ Update with dynamic customer phone number
        message: `✅ Payment Successful!\nTotal: $${finalAmount.toFixed(2)}\nItems: ${cartItems.length} purchased.\nThank you for shopping with us!`,
      });

      console.log("📩 SMS Response:", response.data);
      alert("📩 Receipt Sent via SMS!");
    } catch (error) {
      console.error("❌ Error sending SMS:", error);
      alert("⚠️ Failed to send receipt via SMS. Please check your connection.");
    }
  };

  // ✅ Handle Payment Confirmation
  const handleConfirmPayment = async () => {
    if (!finalAmount) {
      alert("⚠️ Invalid payment amount. Please try again.");
      return;
    }

    setIsProcessing(true);
    alert("Processing Payment... Please wait ⏳");

    // Simulate payment processing delay
    setTimeout(async () => {
      console.log("✅ Payment Processed Successfully!");
      alert("✅ Payment Successful!");

      await sendReceiptSMS(); // ✅ Send SMS after successful payment

      navigate("/success"); // ✅ Redirect to Success Page
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      {finalAmount !== undefined ? (
        <h3>Total Amount: ${finalAmount.toFixed(2)}</h3>
      ) : (
        <h3 className="error-text">⚠️ Error: Invalid Amount</h3>
      )}
      <button 
        className="confirm-button" 
        onClick={handleConfirmPayment} 
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default Payment;
