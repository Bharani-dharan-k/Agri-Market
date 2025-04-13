import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../components/styles/AgentAuth.css"; // Importing CSS

const AgentSignup = () => {
    const [agent, setAgent] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => setAgent({ ...agent, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/agents/signup", agent);
            alert("Signup successful! Please login.");
            navigate("/agent-login"); // ✅ Redirect to Agent Login
        } catch (err) {
            alert("Signup failed. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Agent Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit" className="signup-btn">Signup</button>
                </form>
                <p className="login-link">
                    Already have an account? <a href="/agent-login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default AgentSignup;
