import "../Style/BookListPage.css";
import AdSidenav from "./AdSidenav";
import img from "../../assets/img 13.jpg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function BookListPage() {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState([]);
  const [error, setError] = useState(null);
    
      useEffect(() => {
        axios
          .get("http://127.0.0.1:8000/books") 
          .then((response) => {
            setBookData(response.data);
            setError(null);
          })
          .catch((error) => {
            setError("Error fetching books.");
            console.error("Error fetching books:", error);
          });
      }, []);

  const handleEditClick = () => {
    navigate("/edit-book"); 
  };

  return (
    <>
      <AdSidenav />
      <div className="book-list-page">
        <div className="main-container">
          <div className="left-section">
            <div className="book-list-container">
              {bookData.map((book) => (
                <div key={book.id} className="book-card">
                  <img src={`http://127.0.0.1:8000/books/image/${book.id}`} height="200"  alt={book.book_name} className="book-image" />
                  <h3 className="book-name">{book.book_name}</h3>
                  <button className="edit-btn" onClick={handleEditClick}>
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
