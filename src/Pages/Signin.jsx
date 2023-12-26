import React, { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { Link } from "react-router-dom";
import OAuth from "../Com/OAuth";

const Signin = () => {
  const [ShowPass, setShowPass] = useState(false);
  const [FormData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = FormData;
  function onchange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-4 py-10 max-w-6xl mx-auto  mt-4 bg-white shadow-lg active:bg-orange-300 mb-5  rounded-2xl">
        <div className="md:w-[68%] lg:w-[54%]   ">
          <img src="img/signin1.jpg" className=" object-cover w-full"></img>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%]  bg-orange-50 h-fit  px-5 mb-2">
          <form>
            <h1 className="text-center font-semibold text-3xl mt-3 mb-4 text-orange-500 ">
              Sign In
            </h1>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              placeholder="Enter your mail"
              className=" w-full px-4 py-2  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
            />
            <div className="relative mt-6 mb-6">
              <input
                type={ShowPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={onchange}
                placeholder="Enter your Password"
                className="w-full px-4 py-2  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
              />
              {ShowPass ? (
                <VscEyeClosed
                  className="absolute right-3 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPass((prevState) => !prevState)}
                />
              ) : (
                <VscEye
                  className="absolute right-3 top-4 text-xl cursor-pointer"
                  onClick={() => setShowPass((prevState) => !prevState)}
                />
              )}
            </div>
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
                <Link to="/F-pass">Forgot Password?</Link>
              </p>
            </div>
          </form>
          <button
            className="w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700 "
            type="submit"
          >
            Sign In
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

export default Signin;
