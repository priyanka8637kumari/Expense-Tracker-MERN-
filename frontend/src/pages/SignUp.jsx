import React, { useState} from "react";
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
    <section class="items-center justify-center mt-16 w-full grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10">
      <About />
    <div class="px-8 py-16 bg-white rounded-2xl shadow-md">
      <h2 class="text-4xl font-bold text-black font-[Rubik] mb-10">Sign Up</h2>
      <form onSubmit={handleSignUp} class="space-y-4">
        <div>
          <input
            onChange={handleChange}
            type="text"
            id="name"
            class="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
            placeholder="Enter your name"
            value={signupData.name}
          />
        </div>
        <div>
          
          <input
            onChange={handleChange}
            type="email"
            id="email"
            class="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your email"
            value={signupData.email}
          />
        </div>
        <div>
        
          <input
            onChange={handleChange}
            type="password"
            id="password"
            class="w-full p-3 mb-2 border text-gray-700 text-lg border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your password"
            value={signupData.password}
          />
        </div>
        <button type="submit"  class="bg-orange-500 py-2 px-10 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600">
          Sign Up
        </button>
        <span class="block mt-4 text-lg text-gray-600 text-center">
          Already have an account? <Link to="/login" class="text-orange-500 hover:underline">Log In</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
    </section>
  );
}

export default SignUp;
