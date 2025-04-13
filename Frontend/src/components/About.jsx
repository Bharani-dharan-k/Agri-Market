import React from "react"; 
import "../styles.css";

const About = () => {
  return (
    <section id="about" className="section">
      <h2>About Our Project</h2>
      <p>
        Our <strong>AI-powered Smart Agriculture Tool</strong> integrates predictive analytics 
        to help farmers, traders, and buyers make informed decisions. By leveraging advanced 
        machine learning models, our platform forecasts the prices of agri-horticultural commodities 
        such as <strong>pulses, onions, and potatoes</strong> based on market trends, weather conditions, 
        and historical data.
      </p>

      <h3>Key Features</h3>
      <ul className="about-list">
        <li>
          📊 <strong>Price Prediction:</strong> Forecasts future prices of fruits and vegetables 
          using AI-based trend analysis.
        </li>
        <li>
          🌿 <strong>Quality Grading System:</strong> Analyzes freshness and quality of produce 
          through an automated grading mechanism.
        </li>
        <li>
          📱 <strong>Digital Receipts:</strong> Generates and sends purchase receipts via 
          <strong>SMS or WhatsApp</strong> for better transaction transparency.
        </li>
        <li>
          🌦️ <strong>Weather-Based Insights:</strong> Provides smart recommendations based on 
          real-time weather conditions affecting agriculture.
        </li>
      </ul>

      <h3>Developers</h3>
      <p>
        This project was developed by a passionate team of engineers:
      </p>
      <ul className="dev-list">
        <li>👨‍💻 Bharanidharan</li>
        <li>👨‍💻 Bhupesh</li>
        <li>👨‍💻 Dharshan</li>
      </ul>
    </section>
  );
};

export default About;
