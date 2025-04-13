import React, { useState } from "react";
import axios from "axios";
import "./auth.css"; 

const SellerSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    shopName: "",
    businessType: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agree) {
      alert("Please agree to the Terms & Conditions");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/sellers/register", formData);
      console.log("Seller Signup Success:", res.data);
      alert("Signup Successful! Please Login.");
      window.location.href = "/seller-login"; // Redirect to login page
    } catch (error) {
      console.error("Signup Error:", error.response.data);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Seller Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
          <input type="text" name="shopName" placeholder="Shop Name" value={formData.shopName} onChange={handleChange} required />
          <input type="text" name="businessType" placeholder="Business Type" value={formData.businessType} onChange={handleChange} required />

          <div className="checkbox-group">
            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
            <label>I agree to the Terms & Conditions</label>
          </div>
          
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <div className="extra-links">Already have an account? <a href="/seller-login">Login</a></div>
      </div>
    </div>
  );
};

export default SellerSignup;
