import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav class="w-full h-20 flex justify-between items-center px-4 py-4">
      <div class="text-2xl font-bold font-[Rubik]">
        <Link to="/">
          Money<span class="text-orange-500">Mate</span>
        </Link>
      </div>
      <div class="flex gap-8">
        {location.pathname !== "/home" && (
          <>
        <Link to="/login" class="cursor-pointer hover:text-orange-500">
          Log In
        </Link>
        <Link to="/signup" class="cursor-pointer hover:text-orange-500">
          Sign Up
        </Link>
        </>
        )}
      </div>
      {/* <div class="md:hidden">
              <Link to="#" class="text-6xl cursor-pointer hover:text-orange-500">&#8801;</Link>
            </div> */}
    </nav>
  );
}

export default Navbar;
