import React, { useState } from "react";
import "../Style/AddNewBooksPage.css";
import AdSidenav from "./AdSidenav";
import axios from "axios";

export default function AddNewBooksPage() {
  const [values,setValues]=useState({
    book_name: "",
    author_name: "",
    published_year:"",
    description: ""
  })
  const [image,setimg]=useState();
 
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata=new FormData();
      formdata.append("book_name",values.book_name)
      formdata.append("author_name",values.author_name)
      formdata.append("published_year",values.published_year)
      formdata.append("description",values.description)
      formdata.append("book_image",image)
      const response = await axios.post("http://127.0.0.1:8000/books/add", formdata);
      console.log(response);
      
      alert("book added")
      
    } catch (error) {
      console.log(error);

      alert("book added failed");
    }
  };

  var imgOnchange=(e)=>{
    setimg(e.target.files[0]);
    
  }
  return (
    <>
      <AdSidenav />
      <div className="add-new-books-page">
        <div className="form-container1">
            
          <h2 className="form-title">Add to Collection</h2>

          <form className="book-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Book Name</label>
              <input name="book_name" type="text" placeholder="Enter book name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Author Name</label>
              <input name="author_name" type="text" placeholder="Enter author name" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Published Year</label>
              <input name="published_year" type="number" placeholder="Enter published year" onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea name="description" placeholder="Enter book description" rows="4" onChange={handleChange} required></textarea>
            </div>

            <div className="form-group">
              <label>Book Image</label>
              <input type="file" accept="image/*" onChange={imgOnchange} />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
} 
