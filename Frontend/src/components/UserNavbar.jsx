import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserNavbar.css";
const UserNavbar = ({ setIsUserLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove user token
    setIsUserLoggedIn(false); // Update state
    navigate("/"); // Redirect to home
  };

  return (
    <nav className="user-navbar">
      <h2>User Dashboard</h2>
      <ul>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
