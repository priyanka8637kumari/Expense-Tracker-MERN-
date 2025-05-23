import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import About from "../components/About";
import Cookies from "js-cookie";

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
      // Calling the API
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(LogInData),
      });
      const data = await response.json();
      const { success, message, error, name, userId } = data;
      if (success) {
        handleSucess(message);

        // Setting cookies for logged in user and userId
        Cookies.set("loggedInUser", name, { secure: true, sameSite: "Strict" });
        Cookies.set("userId", userId, { secure: true, sameSite: "Strict" });
       //---------------------------
       
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
    <main>
      <section className="items-center justify-center mt-12 w-full grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10">
        <About />
        <div className="px-8 py-16 bg-white rounded-2xl shadow-md fade-in">
          <h2 className="text-4xl font-bold text-black font-[Rubik] mb-10">
            LOGIN
          </h2>
          <form onSubmit={handleLogIn} className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <input
                onChange={handleChange}
                type="email"
                id="email"
                className="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your email"
                value={LogInData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                className="w-full p-3 mb-2 border  text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
                value={LogInData.password}
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-10 rounded-lg hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Submit login form"
            >
              Log in
            </button>
            <span className="block mt-4 text-lg text-gray-600 text-center">
              Doesn't have an account{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Sign Up
              </Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </section>
    </main>
  );
}

export default LogIn;
