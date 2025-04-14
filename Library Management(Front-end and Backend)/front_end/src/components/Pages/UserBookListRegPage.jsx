
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/UserBookListRegPage.css";
import { ArrowBack } from "@mui/icons-material";

function UserBookListRegPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    book_id: "", // Changed from book_name to book_id
    payment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.book_id || !formData.payment) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/borrow/book", formData, {
        headers: { "Content-Type": "application/json" },
      });

      alert(response.data.message);
      navigate("/userbooklist");
    } catch (error) {
      alert("Error: " + (error.response?.data?.detail || error.message));
    }
  };

  return (
    <div className="UserBookListRegPage-container">
      <div className="form-page-container">
        {/* Back Button */}
        <button className="back-btn-1" onClick={() => navigate("/userbooklist")}>
          <ArrowBack className="back-icon" /> Back
        </button>

        <div className="form-container">
          <h2 className="UserBookListRegPage-title">Borrow Book Registration</h2>
          <form onSubmit={handleSubmit} className="book-reg-form">
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" placeholder="Enter Username" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email ID</label>
              <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Book ID</label> {/* Updated label */}
              <input type="text" name="book_id" placeholder="Enter Book ID" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select name="payment" onChange={handleChange} required>
                <option value="">Select Payment Method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cash">Cash</option>
              </select>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserBookListRegPage;