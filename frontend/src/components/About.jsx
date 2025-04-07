import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.png";

function About() {
  return (
    <section className="flex flex-col gap-8 items-center justify-center">
      <img
        src={heroImage}
        alt="Hero image representing the MoneyMate expense tracking app"
        className="w-64 h-64 animate-pulse"
      />
      <h1 className="text-5xl font-extrabold font-[Rubik]">
        Welcome TO Money<span className="text-orange-500">Mate</span>
      </h1>
      <p className="leading-relaxed text-lg italic">
        "Your smart companion for effortless expense tracking."
      </p>

      <Link
        to="/signup"
        className=" bg-orange-500 py-3 px-10 rounded-lg hover:bg-slate-900 hover:border hover:border-orange-500 transition focus:outline-none focus:ring focus:ring-orange-500"
        aria-label="Sign up for MoneyMate"
      >
        Sign Up
      </Link>
    </section>
  );
}

export default About;
