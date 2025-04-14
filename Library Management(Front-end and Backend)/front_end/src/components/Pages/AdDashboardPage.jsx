
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdSidenav from "./AdSidenav";
import "../Style/AdDashboardPage.css";

export default function AdDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    total_users: 0,
    total_books: 0,
    total_borrowed: 0,
    total_returned: 0,
  });

  // Fetch dashboard counts from FastAPI
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios.get("http://127.0.0.1:8000/totalusers");
        const books = await axios.get("http://127.0.0.1:8000/totalbooks");
        const borrowed = await axios.get("http://127.0.0.1:8000/totalborrow");
        const returned = await axios.get("http://127.0.0.1:8000/totalreturn");

        setDashboardData({
          total_users: users.data.total_users,
          total_books: books.data.total_books,
          total_borrowed: borrowed.data.total_borrowed,
          total_returned: returned.data.total_returned,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <AdSidenav />
      <div className="AdDashboardPage-container">
        <div className="row g-3">
          {/* <img src={"http://localhost:8000/books/image/2"} alt="Library" /> */}

          {/* Dashboard Cards */}
          <div className="col-md-6">
            <div className="card text-center p-3">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text-1">{dashboardData.total_users}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-center p-3">
              <h5 className="card-title">Total Books</h5>
              <p className="card-text-1">{dashboardData.total_books}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-center p-3">
              <h5 className="card-title">Borrowed Books</h5>
              <p className="card-text-1">{dashboardData.total_borrowed}</p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-center p-3">
              <h5 className="card-title">Returned Books</h5>
              <p className="card-text-1">{dashboardData.total_returned}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
