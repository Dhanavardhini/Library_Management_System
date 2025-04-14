import React from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HistoryIcon from "@mui/icons-material/History";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import LogoutIcon from "@mui/icons-material/Logout";

import "../Style/AdSidenav.css";

export default function AdSidenav() {
  const navigate = useNavigate();

  // Sidebar Items
  const sidebarItems = [
    { icon: <DashboardIcon />, text: "Dashboard", path: "/addashboard" },
    { icon: <LibraryAddIcon />, text: "Add New Books", path: "/add-new-book" },
    { icon: <MenuBookIcon />, text: "Book List", path: "/book-list" },
    { icon: <HistoryIcon />, text: "Borrow History", path: "/borrow-history" },
    { icon: <AssignmentReturnIcon />, text: "Return History", path: "/return-history" },
  ];

  return (
    <div className="adsidenav-container">
      {/* Admin Panel Title */}
      <Typography variant="h4" className="adsidenav-title">
        Admin Panel
      </Typography>

      {/* Sidebar Sections */}
      {sidebarItems.map((item, index) => (
        <div key={index} className="sidebar-section" onClick={() => navigate(item.path)}>
            <div className="sidebar-icon">{item.icon}</div>
            <Typography variant="h6" className="sidebar-text">
                {item.text}
            </Typography>
        </div>
      ))}


      {/* Logout */}
      <div className="sidebar-section logout" onClick={() => { alert("You have been logged out."); navigate("/"); }}>
        <LogoutIcon className="sidebar-icon" />
        <Typography variant="h6" className="sidebar-text">
          Logout
        </Typography>
      </div>
    </div>
  );
}
