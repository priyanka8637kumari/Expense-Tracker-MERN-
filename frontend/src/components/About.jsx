import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1 class="text-5xl font-extrabold font-[Rubik]">
        Welcome TO Money<span class="text-orange-500">Mate</span>
      </h1>
      <p class="mt-4 leading-relaxed text-lg italic">
        "Your smart companion for effortless expense tracking."
      </p>
      <p class="mt-4 mb-8 leading-relaxed text-lg">
        MoneyMate is a personal finance management app that helps you track your
        income and expenses.
      </p>

      <Link
        to="/signup"
        class=" bg-orange-500 py-3 px-10 rounded-lg hover:bg-orange-600 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default About;
