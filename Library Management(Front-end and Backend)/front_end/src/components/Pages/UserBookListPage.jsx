import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Card, CardMedia, CardContent, Button, Typography } from "@mui/material";
import "../Style/UserBookListPage.css";
import axios from "axios";


function UserBookListPage() {
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
  return (
    <>
      <Header />
      <div className="userbooklistpage-container">
      <div className="userbooklistpage-container-1">
        {bookData.map((book) => (
          <Card key={book.id} className="book-card">
            <CardMedia component="img" height="200" image={`http://127.0.0.1:8000/books/image/${book.id}`} alt={book.book_name} />
            <CardContent>
              <Typography variant="h5" className="book-title">
                {book.book_name}
                {/* {book.author_name} */}
                {/* {book.published_year} */}
              </Typography>
              <Typography variant="h6" className="book-title">
                {/* {book.book_name} */}
                {book.author_name}
                {/* {book.published_year} */}
              </Typography>
              <Typography variant="h6" className="book-title">
                {/* {book.book_name} */}
                {/* {book.author_name} */}
                {book.published_year}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="borrow-btn"
                onClick={() => navigate("/userbooklistreg")}
              >
                Borrow Book
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </>
  );
}

export default UserBookListPage;
