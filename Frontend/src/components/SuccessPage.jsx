import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css"; // Add CSS for styling

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">
      <h2>✅ Payment Successful!</h2>
      <p>Your payment has been processed, and the receipt has been sent via SMS.</p>
      <button onClick={() => navigate("/user-dashboard")}>Go to Home</button>
    </div>
  );
};

export default SuccessPage;
