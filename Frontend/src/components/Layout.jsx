import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="page-content">
        <Outlet /> {/* ✅ This will render the correct page component */}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
