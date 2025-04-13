import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Billing.css"; // Import the CSS file

const Billing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  console.log("Billing Page Received Cart Items:", cartItems); // ✅ Debugging Log

  // Ensure each item has a valid structure
  const validCartItems = cartItems.map((item) => {
    const product = item.product || item;
    return {
      name: product.name || "Unknown Item",
      price: parseFloat(product.price) || 0,
      quantity: parseInt(item.quantity, 10) || 1,
      id: product._id || item.productId || Math.random(),
    };
  });

  console.log("Processed Cart Items:", validCartItems);

  // Calculate Total Price
  const totalAmount = validCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const transactionFee = totalAmount * 0.05;
  const finalAmount = totalAmount + transactionFee;

  console.log("Final Amount (Total + Fee):", finalAmount);

  // Redirect to Payment Page
  const handleProceedToPayment = () => {
    navigate("/payment", {
      state: {
        cartItems: validCartItems,
        totalAmount,
        transactionFee,
        finalAmount,
      },
    });
  };

  return (
    <div className="billing-container">
      <div className="billing-header">Billing Receipt</div>
      
      <div className="billing-items">
        {validCartItems.map((item) => (
          <div key={item.id} className="billing-item">
            <span>{item.name} ({item.quantity}x)</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="billing-total">Subtotal: ${totalAmount.toFixed(2)}</div>
      <div className="billing-fee">Transaction Fee (5%): ${transactionFee.toFixed(2)}</div>
      <div className="billing-final-total">Final Total: ${finalAmount.toFixed(2)}</div>

      <button className="pay-button" onClick={handleProceedToPayment}>Pay Now</button>
    </div>
  );
};

export default Billing;
