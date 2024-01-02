import spiner from "../assets/svg/spiner.svg";
import React from "react";

const Spinner = () => {
  return (
    <div className=" bg-orange-200 bg-opacity-40 flex items-center justify-center fixed left-0 right-0 bottom-0 top-0 z-50 ">
      <div>
        <img src={spiner} alt="Loading..." className="h-16"></img>
      </div>
    </div>
  );
};

export default Spinner;
