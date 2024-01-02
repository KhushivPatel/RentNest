import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pageState, setpageState] = useState("Sign-In");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setpageState("profile");
      } else {
        setpageState("Sign-In");
      }
    });
  }, [auth]);
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div>
      <div className="bg-orange-500  border-b shadow-sm sticky top-0 z-40 ">
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
                  pathMatchRoute("/") &&
                  "text-white  border-b-solid border-b-white"
                }`}
                onClick={() => navigate("/")}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                  pathMatchRoute("/Offer") &&
                  "text-white  border-b-solid border-b-white"
                }`}
                onClick={() => navigate("/Offer")}
              >
                Offer
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-black border-b-2 border-b-transparent ${
                  pathMatchRoute("/Sign-In") ||
                  (pathMatchRoute("/Profile") &&
                    "text-white  border-b-solid border-b-white")
                }`}
                onClick={() => navigate("/Profile")}
              >
                {pageState}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
