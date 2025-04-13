import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/styles/AgentAuth.css"; // Import the CSS file

const AgentLogin = ({ setIsAgentLoggedIn }) => { // ✅ Accept setIsAgentLoggedIn as a prop
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/agents/login", credentials);
            localStorage.setItem("agentToken", res.data.token);
            setIsAgentLoggedIn(true); // ✅ Update login state
            navigate("/agent-dashboard"); // ✅ Redirect to Agent Dashboard
        } catch (err) {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Agent Login</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <p className="signup-link">
                    Don't have an account? <Link to="/agent-signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default AgentLogin;
