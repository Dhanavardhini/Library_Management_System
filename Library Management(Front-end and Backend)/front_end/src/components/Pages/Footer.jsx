import React from "react";
import { useNavigate } from "react-router-dom";
import "../Style/Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* ✅ Left: Project Info */}
        <div className="footer-section">
          <h3>Library Management System</h3>
          <p>Efficiently manage books, users, and transactions with ease.</p>
        </div>

        {/* ✅ Middle: Quick Links */}
        {/* <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li onClick={() => navigate("/userbooklist")}>Book List</li>
            <li onClick={() => navigate("/addbooklist")}>Add Book</li>
            <li onClick={() => navigate("/borrow-book")}>Borrow Book</li>
            <li onClick={() => navigate("/return-book")}>Return Book</li>
          </ul>
        </div> */}

        {/* ✅ Right: Copyright */}
        <div className="footer-section">
          <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
