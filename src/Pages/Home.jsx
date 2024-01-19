// eslint-disable-next-line no-unused-vars
import React from "react";
// import Slider from "../Com/Slider";

const Home = () => {
  return (
    <>
      {/* home images 1*/}
      <div className="relative h-screen">
        <img
          src="/img/home.jpeg"
          alt="Image with Text"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/4 -translate-y-1/4 text-white">
          <h1 className="text-4xl font-bold ">Find the perfect home</h1>
          <p className="mt-2">We provide service where you rent or sell </p>
        </div>
      </div>
      {/* slider 3 */}
      {/* <div>
        <Slider />
      </div> */}
    </>
  );
};

export default Home;
