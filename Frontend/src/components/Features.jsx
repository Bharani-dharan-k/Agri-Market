import React from "react";
import "../styles.css";

const Features = () => {
  const features = [
    { 
      title: "📈 AI-Powered Price Forecasting", 
      desc: "Predict prices of pulses, onions, and potatoes using market trends and weather data." 
    },
    { 
      title: "🌿 Quality Grading System", 
      desc: "Assess fruit and vegetable freshness using AI-based grading for better decision-making." 
    },
    { 
      title: "📊 Predictive Analytics", 
      desc: "Utilize AI-driven insights to help farmers and traders make informed selling decisions." 
    },
    { 
      title: "📱 Digital Receipts via SMS/WhatsApp", 
      desc: "Generate and send automated digital receipts to customers for seamless transactions." 
    },
    { 
      title: "⛈️ Weather-Based Recommendations", 
      desc: "Provide climate-based insights to optimize harvesting and selling schedules." 
    },
    { 
      title: "🚜 IoT-Enabled Crop Monitoring", 
      desc: "Use smart sensors to monitor soil health, moisture levels, and crop conditions remotely." 
    }
  ];

  return (
    <section id="features" className="section">
      <h2>🌾 Key Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-box">
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
