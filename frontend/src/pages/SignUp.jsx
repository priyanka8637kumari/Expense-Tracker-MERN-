import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";

function SignUp() {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // const copysignupData = { ...signupData };
    // copysignupData[name] = value;
    // setSignupData(copysignupData);
    const { id, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupData;
    if (!name || !email || !password) {
      return handleError("All fields are required!");
    }
    try {
      // Call the API
      const url = "http://localhost:5001/api/users/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      const { success, message, error } = data;
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }else if (error) {
        const details = error?.details[0].message;
        handleError(details);

      }else if (!success) {
        handleError(message);
      }

      // If the user is successfully signed up, redirect to the login page
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            className="form-control"
            autoFocus
            placeholder="Enter name"
            value={signupData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter email"
            value={signupData.email}
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
            value={signupData.password}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
        <span>
          Already have an account? <Link to="/login">Log In</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
