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
    <div>
      <div className="bg-orange-500  border-b shadow-sm sticky top-0 z-50 ">
        <nav className="flex justify-between items-center px-3 max-w-6xl mx-auto h-12">
          <div>
            <img
              src="/img/logo1.png"
              className="h-7 cursor-pointer }"
              onClick={() => navigate("/")}
            ></img>
          </div>
          <div>
            <ul className="flex space-x-10">
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                  pathmatch("/") && "text-white  border-b-solid border-b-white"
                }`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                  pathmatch("/Offer") &&
                  "text-white  border-b-solid border-b-white"
                }`}
                onClick={() => navigate("/Offer")}
              >
                Offer
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                  pathmatch("/Sign-In") &&
                  "text-white  border-b-solid border-b-white"
                }`}
                onClick={() => navigate("/Sign-In")}
              >
                Sign in
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
