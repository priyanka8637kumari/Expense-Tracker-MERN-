import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";

function LogIn() {
  const [LogInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setLogInData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogIn = async (e) => {
    e.preventDefault();
    const { email, password } = LogInData;
    if (!email || !password) {
      return handleError("All fields are required!");
    }
    try {
      // Call the API
      const url = "http://localhost:5001/api/users/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LogInData),
      });
      const data = await response.json();
      const { success, message, error, name, userId } = data;
      if (success) {
        handleSucess(message);
        localStorage.setItem("userId", userId);
        localStorage.setItem("loggedIn user", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>LogIn</h1>
      <form onSubmit={handleLogIn}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={LogInData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={LogInData.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LogIn
        </button>
        <span>
          Doesn't have an account <Link to="/signup">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
