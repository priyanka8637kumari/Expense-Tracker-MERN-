import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSucess } from "../utils";
import About from "../components/About";

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
      // Calling the API
      const url = `${import.meta.env.VITE_API_BASE_URL}/users/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      const { success, message, error } = data;
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate("/login");
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
      <section className="items-center justify-center mt-16 w-full grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10">
        <About />
        <div className="px-8 py-16 bg-white rounded-2xl shadow-md fade-in">
          <h2 className="text-4xl font-bold text-black font-[Rubik] mb-10">
            Sign Up
          </h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                onChange={handleChange}
                type="text"
                id="name"
                className="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
                placeholder="Enter your name"
                value={signupData.name}
                aria-label="name"
              />
            </div>
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
                value={signupData.email}
                aria-label="email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={handleChange}
                type="password"
                id="password"
                className="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your password"
                value={signupData.password}
                aria-label="password"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 py-2 px-10 rounded-lg hover:bg-white hover:text-orange-500 hover:border hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-50"
              aria-label="Submit sign-up form"
            >
              Sign Up
            </button>
            <span className="block mt-4 text-lg text-gray-600 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-orange-50"
              >
                Log In
              </Link>
            </span>
          </form>
          <ToastContainer />
        </div>
      </section>
    </main>
  );
}

export default SignUp;
