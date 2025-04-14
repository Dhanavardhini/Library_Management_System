import React, { useState } from "react"; 
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/UserLoginPage.css"; 

export function UserLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/user", formData);
      if (response.status === 200) {
        alert("Login successful!");
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Invalid login credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Typography variant="h5" className="login-title">
          User Login
        </Typography>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="input-field"
              placeholder="Enter Email"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input-field"
              placeholder="Enter Password"
              type="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>

          <Button type="submit" className="login-button" fullWidth>
            Login
          </Button>

          <Typography className="register-text">
            Don't have an account?{" "}
            <span className="register-link" onClick={() => navigate("/user-register")}>
              Register
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
}

