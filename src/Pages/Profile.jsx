import React, { useState } from "react";
import {getAuth} from "firebase/auth"
import { useNavigate } from "react-router";

const Profile = () => {
  const auth=getAuth()
  const Navigate=useNavigate()
  const [FormData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = FormData;
  function onLogout(){
    auth.signOut()
    Navigate("/")
  }
  return (
    <>
      <section className="max-w-xl mx-auto flex justify-center items-center flex-col bg-white mt-10  rounded-2xl border  border-gray-100 shadow-md ">
        {/* <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1> */}

        <div className="bg-white mb-6 w-full rounded rounded-2xl relative h-62  ">
          <div className="shadow-md rounded-2xl">
            <img
              src="/img/profile.jpg"
              className=' className="absolute inset-0 w-full h-full rounded-2xl object-cover "'
            ></img>
          </div>
          {/* dp */}
          <div className="relative flex-none w-1/4 -top-3.5 ">
            <div className="h-24 w-24 overflow-hidden rounded-full mx-auto -mt-8">
              <img
                src="/img/dp.jpg"
                alt="Profile"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
          {/* dp end */}
        </div>

        <div className="w-full  mt-10 px-3">
          <form>
            {/* name inpute */}
            <input
              type="text"
              id="name"
              value={FormData.name}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6"
            />
            {/* email input */}
            <input
              type="emial"
              id="email"
              value={FormData.email}
              disabled
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 "
            />
            <div className=" flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 ">
              <p className="flex items-center ">
                Do you want to change your name ?
                <span className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer ">
                  Edit
                </span>
              </p>
              <p onClick={onLogout} className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer">
                Sign Out
              </p>
            </div>
            <button
              className="w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700 mb-6 "
              type="submit"
            >
              Send Reset Password
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;
