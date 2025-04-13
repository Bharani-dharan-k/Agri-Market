import React from "react";
import { Link } from "react-router-dom";
import "./auth.css"; // Importing CSS file

const LoginSelection = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Select Your Login Type</h2>
        <div className="role-options">
          <Link to="/seller-login" className="role-card">
            <i className="fas fa-store"></i>
            <h3>Seller</h3>
            <p>Manage and sell your products.</p>
          </Link>
          <Link to="/user-login" className="role-card">
            <i className="fas fa-user"></i>
            <h3>User</h3>
            <p>Buy products and explore the store.</p>
          </Link>
          <Link to="/agent-login" className="role-card">
                      <i className="fas fa-user-tie"></i>
                      <h3>Agent</h3>
                      <p>Manage product logistics and orders.</p>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;
