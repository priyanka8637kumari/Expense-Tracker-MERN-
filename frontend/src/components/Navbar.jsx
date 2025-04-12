import React from "react";
import { Link } from "react-router-dom";

function Navbar({ handleLogOut }) {
  return (
    <header>
      <nav className="w-full h-20 flex justify-between items-center px-4 py-4">
        <div className="text-2xl font-bold font-[Rubik]">
          <Link to="/" aria-label="website name">
            Money
            <span className="text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500">
              Mate
            </span>
          </Link>
        </div>
        <div className="flex gap-8">
          {location.pathname === "/home" ? (
            <button
              onClick={handleLogOut}
              className=" text-white hover:text-orange-500 cursor-pointer focus:outline-none focus:ring focus:ring-orange-500"
              aria-label="Logout button of your account"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex gap-2 cursor-pointer hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Link for login"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="cursor-pointer hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="link for signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
