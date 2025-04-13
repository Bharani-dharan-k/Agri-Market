import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import UserNavbar from "./UserNavbar"; // Import User Navbar
import "./UserDashboard.css";

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const token = localStorage.getItem("authToken"); // Check if user is logged in
    if (token) {
      setIsLoggedIn(true);
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/user-product");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update login status
  };

  return (
    <div className="dashboard-container">
      {isLoggedIn && <UserNavbar onLogout={handleLogout} />} {/* Show user navbar if logged in */}
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default UserDashboard;
