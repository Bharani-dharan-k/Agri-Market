import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import ManageProducts from "./ManageProducts";
import PriceQualityPrediction from "./PriceQualityPrediction";
import axios from "axios";
import "./SellerDashboard.css";

const Overview = ({ totalEarnings, products }) => (
  <div>
    <h2>Seller Overview</h2>
    <p><strong>Total Earnings:</strong> ${totalEarnings}</p>
    <h3>Products Listed</h3>

    <div className="product-list">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="product-card">
                      <img
  src={product.image}
  alt={product.name}
  className="product-image"
/>


            <div className="product-details">
              <h4>{product.name}</h4>
              <p><strong>Quantity:</strong> {product.quantity}</p>
              <p><strong>Grade:</strong> {product.grade}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No products listed yet.</p>
      )}
    </div>
  </div>
);

const SellerDashboard = ({ setIsSellerLoggedIn }) => {
  const navigate = useNavigate();
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Redirecting to login.");
        navigate("/");
        return;
      }

      const response = await axios.get("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSellerLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Seller Dashboard</h2>
        <Link to="/seller-dashboard" className="nav-item">Overview</Link>
        <Link to="/seller-dashboard/add-product" className="nav-item">Add Product</Link>
        <Link to="/seller-dashboard/manage-products" className="nav-item">Manage Products</Link>
        <Link to="/seller-dashboard/price-quality-prediction" className="nav-item">Price & Quality Prediction</Link>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <div className="main-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route path="/" element={<Overview totalEarnings={totalEarnings} products={products} />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/manage-products" element={<ManageProducts />} />
            <Route path="/price-quality-prediction" element={<PriceQualityPrediction />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
