import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigation

  return (
    <header className="hero" id="home">
      <div className="hero-content">
        <h1>🌾 AI-Powered Agriculture Insights</h1>
        <p>
          Forecast agri-horticultural commodity prices 📊, assess produce quality 🍎,  
          and generate digital receipts 💬 via SMS or WhatsApp.
        </p>
        <div className="buttons">
          {/* Navigate to Login Selection on "Get Started" */}
          <button className="btn signup" onClick={() => navigate("/login-selection")}>
            Get Started
          </button>
          
          {/* Navigate to About Page on "Learn More" */}
          <button className="btn login" onClick={() => navigate("/about")}>
            Learn More
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
