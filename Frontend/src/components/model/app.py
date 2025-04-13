from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("market_prices.csv")  # Ensure this file exists

@app.route('/api/price', methods=['POST'])
def price_prediction():
    try:
        data = request.json
        print("Received Data:", data)

        required_fields = ["name", "state", "district", "market", "quantity"]
        if not all(field in data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        # Validate data types
        if not isinstance(data["name"], str) or not isinstance(data["state"], str) or \
           not isinstance(data["district"], str) or not isinstance(data["market"], str) or \
           not isinstance(data["quantity"], int):
            return jsonify({"error": "Invalid data types"}), 400

        # 🔍 Fetch modal price from dataset
        commodity_data = df[
            (df["Commodity"] == data["name"]) &
            (df["State"] == data["state"]) &
            (df["District"] == data["district"]) &
            (df["Market"] == data["market"])
        ]

        if commodity_data.empty:
            return jsonify({"error": "No price data available for this selection"}), 404

        modal_price = commodity_data["Modal Price"].values[0]  # Get modal price
        predicted_price = modal_price * data["quantity"]  # Calculate total price

        # 🕒 Predict best selling time (Month with highest price)
        best_selling_month = commodity_data.groupby("Arrival_Date")["Modal Price"].idxmax()
        best_selling_time = commodity_data.loc[best_selling_month, "Arrival_Date"].values[0]

        # 📈 Predict demand (Based on sales frequency)
        demand_count = commodity_data.shape[0]
        demand_level = "High" if demand_count > 10 else "Medium" if demand_count > 5 else "Low"

        return jsonify({
            "message": "Prediction successful!",
            "data": data,
            "predicted_price": predicted_price,
            "best_selling_time": best_selling_time,
            "predicted_demand": demand_level
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)

