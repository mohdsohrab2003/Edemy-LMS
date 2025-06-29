import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";
const Navbar = () => {
  const isColorListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { isEducator, navigate } = useContext(AppContext);
  return (
    <>
      <div
        className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
          isColorListPage ? "bg-white" : "bg-cyan-100/60"
        }`}
      >
        <Link to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-28 lg:w-32 cursor-pointer"
          />
        </Link>

        {/* Desktop and md screen */}
        <div className="hidden md:flex items-center gap-8 text-gray-500">
          <div className="flex items-center gap-5">
            {user && (
              <>
                <button
                  onClick={() => {
                    navigate("/educator");
                  }}
                >
                  {isEducator ? "Educator DashBoard" : "Become Educator"}{" "}
                </button>{" "}
                |<Link to="/my-enrollment"> My Enrollment </Link>{" "}
              </>
            )}
          </div>
          {user ? (
            <UserButton />
          ) : (
            <button
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-5 py-2 rounded-full cursor-pointer"
            >
              Create Account
            </button>
          )}
        </div>
        {/* Mobile Screen */}
        <div className="md:hidden flex items-center gap-2  sm:gap-5 text-gray-500">
          <div className="flex items-center gap-5 sm:gap-2 max-sm:xs">
            {user && (
              <>
                <button
                  onClick={() => {
                    navigate("/educator");
                  }}
                >
                  {isEducator ? "Educator DashBoard" : "Become Educator"}{" "}
                </button>{" "}
                |<Link to="/my-enrollment"> My Enrollment </Link>
              </>
            )}
          </div>
          {user ? (
            <UserButton />
          ) : (
            <button onClick={() => openSignIn()}>
              <img src={assets.user_icon} alt="" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
