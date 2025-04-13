import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerDashboard from "./components/SellerDashboard";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import PriceForecasting from "./components/PriceForecasting";
import GradingSystem from "./components/GradingSystem";
import DigitalReceipts from "./components/DigitalReceipts";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import UserLogin from "./components/auth/UserLogin";
import UserSignup from "./components/auth/UserSignup";
import SellerLogin from "./components/auth/SellerLogin";
import SellerSignup from "./components/auth/SellerSignup";
import LoginSelection from "./components/auth/LoginSelection";
import Navbar from "./components/Navbar"; // Normal Navbar
import UserNavbar from "./components/UserNavbar"; // User Navbar
import UserDashboard from "./components/UserDashboard";
import Cart from "./components/Cart";
import PaymentPage from "./components/Payment";
import Billing from "./components/Billing";
import SuccessPage from "./components/SuccessPage";

const App = () => {
  const [isSellerLoggedIn, setIsSellerLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Load login status on mount
  useEffect(() => {
    setIsSellerLoggedIn(!!localStorage.getItem("sellerToken"));
    setIsUserLoggedIn(!!localStorage.getItem("userToken"));
  }, []);

  return (
    <Router>
      {/* Show Home Navbar Only If No One is Logged In */}
      {!isSellerLoggedIn && !isUserLoggedIn && <Navbar />}

      {/* Show User Navbar If User is Logged In */}
      {isUserLoggedIn && <UserNavbar setIsUserLoggedIn={setIsUserLoggedIn} />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/price-forecasting" element={<PriceForecasting />} />
        <Route path="/grading-system" element={<GradingSystem />} />
        <Route path="/digital-receipts" element={<DigitalReceipts />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />

        {/* Authentication Routes */}
        <Route path="/user-login" element={<UserLogin setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/seller-login" element={<SellerLogin setIsSellerLoggedIn={setIsSellerLoggedIn} />} />
        <Route path="/seller-signup" element={<SellerSignup />} />
        <Route path="/login-selection" element={<LoginSelection />} />

        {/* Seller Dashboard */}
        <Route path="/seller-dashboard/*" element={<SellerDashboard setIsSellerLoggedIn={setIsSellerLoggedIn} />} />

        {/* User Dashboard & Cart */}
        <Route path="/user-dashboard" element={isUserLoggedIn ? <UserDashboard /> : <UserLogin setIsUserLoggedIn={setIsUserLoggedIn} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/billing" element={<Billing/>} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
};

export default App;
