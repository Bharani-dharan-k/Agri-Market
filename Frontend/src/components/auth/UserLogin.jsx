import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const UserLogin = ({ setIsUserLoggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", formData);
  
      // ✅ Store the token in localStorage
      localStorage.setItem("token", res.data.token);
  
      setIsUserLoggedIn(true);
      alert("Login Successful");
      navigate("/user-dashboard"); 
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "An unexpected error occurred");
    }
  };
  ;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>User Login</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <div className="forgot-password"><a href="/forgot-password">Forgot Password?</a></div>
          <button type="submit" className="btn">Login</button>
        </form>
        <div className="extra-links">Don't have an account? <a href="/user-signup">Sign Up</a></div>
      </div>
    </div>
  );
};

export default UserLogin;
