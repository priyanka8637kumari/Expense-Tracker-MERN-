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
    <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-center">LogIn</h1>
      <form onSubmit={handleLogIn} class="space-y-4">
        <div>
          <label htmlFor="email" class="block text-sm font-medium text-gray-700 mb-2">Email address</label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
            value={LogInData.email}
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
            value={LogInData.password}
          />
        </div>
        <button type="submit"   class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          LogIn
        </button>
        <span class="block mt-4 text-sm text-gray-600 text-center">
          Doesn't have an account <Link to="/signup" class="text-blue-500 hover:underline">SignUp</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LogIn;
