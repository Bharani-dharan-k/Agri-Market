import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const isUserLoggedIn = localStorage.getItem("authToken"); // Check User Token
  const isSellerLoggedIn = localStorage.getItem("sellerToken"); // Check Seller Token

  // Hide Navbar if User or Seller is Logged In
  if (isUserLoggedIn || isSellerLoggedIn) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Left Side - Logo */}
        <div className="nav-left">
          <Link to="/">
            <img src="/agri_ai.png" alt="Logo" className="logo" />
          </Link>
        </div>

        {/* Right Side - Navigation Links */}
        <div className="nav-right">
          <ul className="nav-links">
            {[
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
              { name: "Features", path: "/features" },
              { name: "Price Forecasting", path: "/price-forecasting" },
              { name: "Grading System", path: "/grading-system" },
              { name: "Digital Receipts", path: "/digital-receipts" },
              { name: "Testimonials", path: "/testimonials" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <li key={index}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}

            {/* ✅ Login Button */}
            <li>
              <Link to="/login-selection" className="login-btn">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
