const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const agent = await Agent.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: "Agent registered successfully" });
    } catch (err) {
        res.status(400).json({ message: "Signup failed" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const agent = await Agent.findOne({ email });
        if (!agent) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, agent.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: agent._id }, "secretkey", { expiresIn: "1h" });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
};

module.exports = { signup, login };
