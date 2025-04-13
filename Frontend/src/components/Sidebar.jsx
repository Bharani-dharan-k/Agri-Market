import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/styles/AgentDashboard.css"; // Import CSS

const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("sellerToken");
        localStorage.removeItem("userToken");
        localStorage.removeItem("agentToken");
        onLogout();
        navigate("/agent-login");
    };

    return (
        <div className="sidebar">
            <h3 className="sidebar-title">Agent Panel</h3>
            <ul className="sidebar-menu">
                <li>Seller Details</li>
                <li>Seller Products</li>
                <li>Agent Options</li>
                <li>Bid Management</li> 
                <li className="logout-btn" onClick={handleLogout}>Logout</li> 
            </ul>
        </div>
    );
};

export default Sidebar;
