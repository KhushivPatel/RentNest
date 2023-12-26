import React from "react";
import { FcGoogle } from "react-icons/fc";
const OAuth = () => {
  return (
    <div>
      <button
        className="border border-solid border-gray-300 p-2 flex items-center justify-center w-full  bg-white px-7 py-3 text-black text-sm font-medium uppercase rounded shadow-md hover:bg-gray-300 transition duration-150 ease-in-out hover:shadow-lg active:bg-gray-400 mb-5"
        type="submit"
      >
        <FcGoogle className="text-xl bg-white  rounded-full mr-2" />
        continue with google
      </button>
    </div>
  );
};

export default OAuth;

