import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Close, LibraryBooks } from "@mui/icons-material"; // Import LibraryBooks icon
import "../Style/Header.css";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State for Mobile Menu

  return (
    <header className="header">
      {/* Left: Project Title with Icon */}
      <div className="header-title">
        <LibraryBooks className="lib-icon" /> 
        Library Management  
      </div>

      {/* ✅ Hamburger Menu for Mobile (Hidden on Desktop) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <Close /> : <Menu />}
      </div>

      {/* ✅ Navigation Menu (Always Visible on Desktop) */}
      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <span onClick={() => navigate("/user-dashboard")}>Home</span> 
        <span onClick={() => navigate("/userbooklist")}>Book List</span>
        <span onClick={() => navigate("/return-book")}>Return Book</span>
        <span className="logout1" onClick={() => navigate("/")}>Logout</span>
      </nav>
    </header>
  );
}

export default Header;
