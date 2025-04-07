import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import About from "../components/About";

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
    <section class="items-center justify-center mt-12 w-full grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10">
      <About />
      <div class="px-8 py-16 bg-white rounded-2xl shadow-md fade-in">
        <h2 className="text-4xl font-bold text-black font-[Rubik] mb-10">
          LOGIN
        </h2>
        <form onSubmit={handleLogIn} class="space-y-4">
          <div>
            <input
              onChange={handleChange}
              type="email"
              id="email"
              class="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your email"
              value={LogInData.email}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange}
              type="password"
              id="password"
              class="w-full p-3 mb-2 border  text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your password"
              value={LogInData.password}
            />
          </div>
          <button
            type="submit"
            class="bg-orange-500 py-2 px-10 rounded-lg hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500"
          >
            Log in
          </button>
          <span class="block mt-4 text-lg text-gray-600 text-center">
            Doesn't have an account{" "}
            <Link to="/signup" class="text-orange-500 hover:underline">
              Sign Up
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
}

export default LogIn;
