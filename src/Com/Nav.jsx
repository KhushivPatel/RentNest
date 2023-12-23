import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  function pathmatch(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className="bg-green-200 border-b shadow-sm sticky top-0 z-50">
      <nav className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="img/rent.png"
            className="h-11 cursor-pointer }"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                pathmatch("/") && "text-green-600 border-b-green-600"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                pathmatch("/Offer") && "text-green-600 border-b-green-600"
              }`}
              onClick={() => navigate("/Offer")}
            >
              Offer
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                pathmatch("/Sign-In") && "text-green-600 border-b-green-600"
              }`}
              onClick={() => navigate("/Sign-In")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
