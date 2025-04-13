import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = ({ products = [] }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addToCart = async (product) => {
    try {
      setLoading(true);

      // ✅ Retrieve stored token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please log in again.");
        navigate("/login");
        return;
      }

      // ✅ Send request with Authorization header
      await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add product. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ "Buy Now" Function (Redirects to Payment Page)
  const buyNow = (product) => {
    navigate(`/payment?productId=${product._id}&price=${product.price}`);
  };

  return (
    <div className="product-container">
      {/* ✅ "My Cart" Button */}
      <div className="cart-button-container">
        <button className="cart-button" onClick={() => navigate("/cart")}>
          🛒 My Cart
        </button>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image || "/default-placeholder.png"}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>

              {/* ✅ Wrapped buttons inside `button-container` for proper spacing */}
              <div className="button-container">
                <button onClick={() => addToCart(product)} disabled={loading}>
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
                
                {/* <button onClick={() => buyNow(product)} className="buy-now-button">
                  Buy Now
                </button> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
