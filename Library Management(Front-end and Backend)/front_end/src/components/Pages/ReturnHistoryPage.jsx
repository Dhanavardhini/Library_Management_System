import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/BorrowHistoryPage.css";
import AdSidenav from "./AdSidenav";

function ReturnHistoryPage() {
  const [data, setData] = useState([]);

  // Fetch return history from the backend
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/return-history") // Fetch data from FastAPI
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // // Function to approve the return of a book
  // const approveReturn = (book_name) => {
  //   axios
  //     .post(`http://127.0.0.1:8000/return/book/${encodeURIComponent(book_name)}/accept`)
  //     .then(() => {
  //       alert("Book return marked as Returned!");

  //       // Update UI after backend update
  //       setData((prevData) =>
  //         prevData.map((entry) =>
  //           entry.book_name === book_name ? { ...entry, status: "Returned" } : entry
  //         )
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error approving book:", error);
  //       alert("Failed to update book return status.");
  //     });
  // };

  return (
    <>
      <AdSidenav />
      <div className="BorrowHistoryPage-container">
        <h2>User Return Details</h2>
        <div className="table-wrapper">
          <table className="borrow-history-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>User Name</th>
                <th>Email ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Time Out</th>
                <th>Time in</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((entry, index) => (
                  <tr key={entry.id || index}>
                    {" "}
                    <td>{index + 1}</td>
                    <td>{entry.username}</td>
                    <td>{entry.email}</td>
                    <td>{entry.book_name}</td>
                    <td>{entry.author_name}</td>
                    <td>{entry.date_borrowed}</td>
                    <td>{entry.time_out}</td>
                    <td>{entry.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>
                    No return history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ReturnHistoryPage;
