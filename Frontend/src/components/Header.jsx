import React from "react";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
const Header = () => {
  const headerStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1000, // Ensures the header stays above other content
    backgroundColor: "#fff", // Optional: Set a background color to match the rest of your design
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
  };
  return (
    <div style={headerStyle}>
      <TopBar />
      <NavBar />
    </div>
  );
};

export default Header;
