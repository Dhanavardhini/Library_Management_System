
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdSidenav from "./AdSidenav";
import "../Style/BorrowHistoryPage.css";

export default function BorrowHistoryPage() {
  const [borrowHistoryData, setBorrowHistoryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(" http://127.0.0.1:8000/admin/borrow-history") 
      .then((response) => {
        setBorrowHistoryData(response.data);
        setError(null);
      })
      .catch((error) => {
        setError("Error fetching borrow history.");
        console.error("Error fetching borrow history:", error);
      });
  }, []);


  return (
    <>
      <AdSidenav />
      <div className="BorrowHistoryPage-container">
        <h2>User Borrowing Details</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="table-wrapper">
          <table className="borrow-history-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>Email ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Time In</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {borrowHistoryData.length === 0 ? (
                <tr>
                  <td colSpan="10">No data available</td>
                </tr>
              ) : (
                borrowHistoryData.map((entry, index) => (
                  <tr key={entry.id}>
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.email}</td>
                    {/* <td>{entry.book_id}</td> */}
                    <td>{entry.book_name}</td>
                    <td>{entry.author_name}</td>
                    <td>{entry.time_in}</td>
                    <td>{entry.status || "Pending"}</td> 
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
