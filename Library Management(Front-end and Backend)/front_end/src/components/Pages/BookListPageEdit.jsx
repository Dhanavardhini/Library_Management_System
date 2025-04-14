
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdSidenav from "./AdSidenav";
import "../Style/BookListPage.css";

export function BookListPageEdit() {
  const navigate = useNavigate();

  // State to store form data
  const [bookDetails, setBookDetails] = useState({
    bookId: "",
    bookName: "",
    authorName: "",
    publishedYear: "",
    description: "",
    bookImage: null,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      bookImage: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!bookDetails.bookId || !bookDetails.bookName || !bookDetails.authorName || !bookDetails.publishedYear || !bookDetails.description || !bookDetails.bookImage) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("book_id", bookDetails.bookId);
    formData.append("book_name", bookDetails.bookName);
    formData.append("author_name", bookDetails.authorName);
    formData.append("published_year", bookDetails.publishedYear);
    formData.append("description", bookDetails.description);
    formData.append("book_image", bookDetails.bookImage);

    try {
      const response = await axios.post("http://127.0.0.1:8000/books/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);
      navigate("/book-list"); // Redirect after success
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book. Please try again.");
    }
  };

  return (
    <>
      <AdSidenav />
      <div className="BpEdit-container">
        {/* Back Button */}
        <button className="back-btnbp" onClick={() => navigate("/book-list")}>
          <ArrowBackIcon className="back-icon" /> Back
        </button>

        {/* Edit Form */}
        <div className="edit-form-container">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h2 className="form-title-1">Edit Book Details</h2>

            <div className="form-group">
              <label>Book ID</label>
              <input type="number" name="bookId" placeholder="Enter book ID" value={bookDetails.bookId} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Book Name</label>
              <input type="text" name="bookName" placeholder="Enter book name" value={bookDetails.bookName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <input type="text" name="authorName" placeholder="Enter author name" value={bookDetails.authorName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Published Year</label>
              <input type="number" name="publishedYear" placeholder="Enter published year" value={bookDetails.publishedYear} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Enter book description" rows="4" value={bookDetails.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label>Book Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} required />
            </div>

            <button type="submit" className="submit-btn">Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
}
