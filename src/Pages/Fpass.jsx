import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../Com/OAuth";

const Fpass = () => {
  const [email, setEmail] = useState("");
  function onchange(e) {
    setEmail(e.target.value);
  }
  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-4 py-10 max-w-6xl mx-auto  mt-4 bg-white shadow-md  mb-5  rounded-2xl">
        <div className="md:w-[68%] lg:w-[50%]   ">
          <img src="img/fpass.jpg" className=" object-cover w-full"></img>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%]  bg-white h-fit  px-5 mb-2">
          <form>
            <h1 className="text-center font-semibold text-3xl mt-3 mb-3 text-orange-500 ">
              Forgot Password
            </h1>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              placeholder="Enter your mail"
              className=" w-full px-4 py-2  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
            />
            <div className="relative mt-6 mb-6" />

            <div className="flex justify-between whitespace-nowrap text-sm">
              <p className="mb-6">
                Don't have account ?
                <Link
                  to="/Sign-Up"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                >
                  Register
                </Link>
              </p>
              <p className="text-red-500 hover:text-red-800 transition duration-200 ease-in-out ">
                <Link to="/Sign-In">Sign in</Link>
              </p>
            </div>
          </form>
          <button
            className="w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700 "
            type="submit"
          >
            Send Reset Password
          </button>
          <div className=" flex items-center my-4 before:border-t  before:flex-1  before:border-gray-500  after:border-t  after:flex-1  after:border-gray-500">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
};

export default Fpass;
