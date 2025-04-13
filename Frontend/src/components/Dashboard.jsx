import React from "react";
import Sidebar from "./Sidebar";

const AgentDashboard = ({ onLogout }) => {
    return (
        <div>
            <h2>Agent Dashboard</h2>
            <Sidebar onLogout={onLogout} /> {/* ✅ Pass onLogout */}
        </div>
    );
};

export default AgentDashboard;
