
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import "../Style/UserReturnBookPage.css";

function UserReturnBookPage() {
  const [returnBooks, setReturnBooks] = useState([]);

  // Fetch borrowed books
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/user/borrowed-books")
      .then((response) => setReturnBooks(response.data)) // Fixing response structure
      .catch((error) => console.error("Error fetching borrowed books:", error));
  }, []);

  // Function to return a book
  const handleReturnBook = (bookId) => {
    axios
      .post(`http://127.0.0.1:8000/user/return-book/${bookId}`)
      .then((response) => {
        alert(response.data.message);
        setReturnBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === bookId
              ? { ...book, status: "returned", return_status: "Returned", time_in: new Date().toISOString() }
              : book
          )
        );
      })
      .catch((error) => {
        console.error("Error returning book:", error);
        alert("Failed to return book. Please try again.");
      });
  };

  return (
    <>
      <Header />
      <div className="user-return-container">
        <div className="user-return-container-1">
          <h2>Return Book List</h2>
          <div className="table-wrapper">
            <table className="return-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>User Name</th>
                  <th>Email ID</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Payment Method</th>
                  <th>Time In</th>
                  <th>Return Book</th>
                </tr>
              </thead>
              <tbody>
                {returnBooks.length > 0 ? (
                  returnBooks.map((book, index) => (
                    <tr key={book.id}>
                      <td>{index + 1}</td>
                      <td>{book.username}</td>
                      <td>{book.email}</td>
                      <td>{book.book_name}</td>
                      <td>{book.author_name}</td>
                      <td>{book.payment_method}</td>
                      <td>{book.time_in || "Not Returned"}</td>
                      <td>
                        <button
                          className="return-btn"
                          onClick={() => handleReturnBook(book.id)}
                          disabled={book.return_status === "Returned"}
                        >
                          {book.return_status === "Returned" ? "Returned" : "Return Book"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center" }}>No borrowed books found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserReturnBookPage;
