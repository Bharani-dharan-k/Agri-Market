import React, { useState } from "react";
import axios from "axios";

const PriceQualityPrediction = () => {
  const [formData, setFormData] = useState({
    name: "",
    state: "",
    district: "",
    market: "",
    quantity: ""
  });

  const [prediction, setPrediction] = useState(null);
  const [bestSellingTime, setBestSellingTime] = useState(null);
  const [predictedDemand, setPredictedDemand] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const submitPrice = async () => {
    const cleanedData = {
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      name: formData.name.trim(),
      state: formData.state.trim(),
      district: formData.district.trim(),
      market: formData.market.trim()
    };

    console.log("Submitting Data:", cleanedData);

    try {
      const response = await axios.post("http://127.0.0.1:5001/api/price", cleanedData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("✅ API Response:", response.data);

      setPrediction(response.data.predicted_price);
      setBestSellingTime(response.data.best_selling_time);
      setPredictedDemand(response.data.predicted_demand);

    } catch (error) {
      console.error("❌ API Error:", error.response ? error.response.data : error.message);
      alert("Error: " + (error.response ? error.response.data.error : error.message));
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          input {
            width: 100%;
            padding: 10px;
            margin: 8px 0;
            border: 2px solid #e8a66c;
            border-radius: 5px;
            background: #22243a;
            color: white;
            font-size: 16px;
          }

          input::placeholder {
            color: #aaa;
          }

          button {
            width: 100%;
            padding: 10px;
            background-color: #e8a66c;
            color: #1d1f32;
            font-size: 18px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: bold;
            transition: 0.3s;
          }

          button:hover {
            background-color: #c08b5c;
          }

          .prediction-container {
            margin-top: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            text-align: center;
          }

          h3 {
            font-size: 18px;
            margin: 5px 0;
            color: white;
          }
        `}
      </style>

      <h2 style={styles.heading}>Price Quality Prediction</h2>
      <input type="text" name="name" placeholder="Commodity" value={formData.name} onChange={handleChange} />
      <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
      <input type="text" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
      <input type="text" name="market" placeholder="Market" value={formData.market} onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Quantity(per Quintal)" value={formData.quantity} onChange={handleChange} />
      <button onClick={submitPrice}>Submit</button>

      {prediction !== null && (
        <div className="prediction-container">
          <h3>Predicted Price: ₹{prediction}</h3>
          <h3>Best Selling Time: {bestSellingTime}</h3>
          <h3>Predicted Demand: {predictedDemand}</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    background: "linear-gradient(135deg, #1d1f32, #292b45)", // Violet gradient
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    color: "#e8a66c",
    fontFamily: "Arial, sans-serif"
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#e8a66c"
  }
};

export default PriceQualityPrediction;
