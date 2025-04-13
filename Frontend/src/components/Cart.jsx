import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // ✅ Import CSS

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); // ✅ Move useNavigate inside the component

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Cart Data:", response.data); // ✅ Debugging log
        setCartItems(response.data.products || response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, []);

  // Redirect to Billing Page
  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/billing", { state: { cartItems } }); // ✅ Pass cart data to billing page
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length > 0 ? (
        <>
          <div className="cart-products">
            {cartItems.map((item) => {
              const product = item.product || item; // ✅ Handle response structure
              return (
                <div key={product._id || item.productId} className="cart-product">
                  <img
                    src={product.image} 
                    alt={product.name}
                    onError={(e) => (e.target.src = "/default-placeholder.png")} // ✅ Fallback for broken images
                  />
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {item.quantity || 1}</p> {/* ✅ Display Quantity */}
                </div>
              );
            })}
          </div>

          {/* 🛒 Buy All Button at Bottom */}
          <div className="buy-now-container">
            <button className="buy-button" onClick={handleBuyAll}>
              Buy All Now
            </button>
          </div>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
