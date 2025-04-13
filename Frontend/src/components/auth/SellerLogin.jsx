import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const SellerLogin = ({ setIsSellerLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/sellers/login", formData);
      console.log("Seller Login Success:", res.data);
      localStorage.setItem("token", res.data.token);
      setIsSellerLoggedIn(true); // Update login state
      alert("Login Successful");
      navigate("/seller-dashboard");
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Seller Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="extra-links">
          Don't have an account? <a href="/seller-signup">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
