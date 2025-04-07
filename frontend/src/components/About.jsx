import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/heroImage.png";

function About() {
  return (
    <div class="flex flex-col gap-8 items-center justify-center">
      <img
        src={heroImage}
        alt="An icon to show expense app"
        class="w-64 h-64 animate-pulse"
      />
      <h1 class="text-5xl font-extrabold font-[Rubik]">
        Welcome TO Money<span class="text-orange-500">Mate</span>
      </h1>
      <p class="leading-relaxed text-lg italic">
        "Your smart companion for effortless expense tracking."
      </p>

      <Link
        to="/signup"
        class=" bg-orange-500 py-3 px-10 rounded-lg hover:bg-slate-900 hover:border hover:border-orange-500 transition"
      >
        Sign Up
      </Link>
    </div>
  );
}

export default About;
