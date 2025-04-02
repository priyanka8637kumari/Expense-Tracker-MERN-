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
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSignUp} class="space-y-4">
        <div>
          <label htmlFor="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            placeholder="Enter name"
            value={signupData.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={signupData.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            onChange={handleChange}
            type="password"
            id="password"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
            value={signupData.password}
          />
        </div>
        <button type="submit"  class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Sign Up
        </button>
        <span class="block mt-4 text-sm text-gray-600 text-center">
          Already have an account? <Link to="/login" class="text-blue-500 hover:underline">Log In</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
