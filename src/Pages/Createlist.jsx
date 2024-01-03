import React, { useState } from "react";

const Createlist = () => {
  const [FormData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: "true",
    regularprice: "0",
    discountprice: "0",
  });
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularprice,
    discountprice,
  } = FormData;
  function onChange() {}
  return (
    <>
      <h1 className="text-3xl text-orange-600  text-center mt-6 font-bold ">
        Create your own list
      </h1>

      <main className="max-w-full pr-20 pl-20 mx-auto ">
        <from>
          <p className="text-lg mt-6 font-semibold"> Sell /Rent</p>
          {/* rent and sell */}
          <div className="flex ">
            {/* sell  */}
            <button
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
              className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "rent"
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              Sell
            </button>
            {/* rent */}
            <button
              type="button"
              id="type"
              value="sale"
              onClick={onChange}
              className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                type === "sale"
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              rent
            </button>
          </div>
          <p className="text-lg mt-6 font-semibold">Name</p>
          {/* name */}
          <input
            type="text"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Name"
            maxLength="32"
            minLength="5"
            required
            className="w-full px-4 py-2 text-xl  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 mb-6 "
          ></input>
          {/* beds and baths */}
          <div className="flex space-x-7 mb-6">
            {/* bed */}
            <div>
              <p className="text-lg mt-6 font-semibold">Beds</p>
              <input
                type="number"
                id="bedrooms"
                value={FormData.bedrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className=" w-full px-4 py-2 text-xl text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
            {/* bath */}
            <div>
              <p className="text-lg mt-6 font-semibold">Baths</p>
              <input
                type="number"
                id="bathrooms"
                value={FormData.bathrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className=" w-full px-4 py-2 text-xl text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
            </div>
          </div>
          {/* parking  */}
          <p className="text-lg mt-6 font-semibold"> Parking Shot</p>
          <div className="flex ">
            {/* yes  */}
            <button
              type="button"
              id="parking"
              value={false}
              onClick={onChange}
              className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !parking
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              yes
            </button>
            {/* no */}
            <button
              type="button"
              id="parking"
              value={true}
              onClick={onChange}
              className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                parking
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              no
            </button>
          </div>
          {/* furnished */}
          <p className="text-lg mt-6 font-semibold"> Parking Shot</p>
          <div className="flex ">
            {/* yes  */}
            <button
              type="button"
              id="furnished"
              value={false}
              onClick={onChange}
              className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !furnished
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              yes
            </button>
            {/* no */}
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                furnished
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              no
            </button>
          </div>
          {/* address */}
          <p className="text-lg mt-6 font-semibold">Address</p>
          <textarea
            type="text"
            id="address"
            value={address}
            onChange={onChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 text-xl  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 mb-6 "
          ></textarea>
          {/* Description */}
          <p className="text-lg font-semibold">Description</p>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={onChange}
            placeholder="Description"
            required
            className="w-full px-4 py-2 text-xl  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 mb-6 "
          ></textarea>

          {/* offer */}
          <p className="text-lg font-semibold">Offer</p>
          <div className="flex ">
            {/* yes  */}
            <button
              type="button"
              id="Offer"
              value={true}
              onClick={onChange}
              className={` mr-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !offer
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              yes
            </button>
            {/* no */}
            <button
              type="button"
              id="offer"
              value={false}
              onClick={onChange}
              className={` ml-3 px-7 py-3 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                offer
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              no
            </button>
          </div>

          {/* price */}
          <div className="flex space-x-7 mb-6">
            {/* regular price */}
            <div>
              <p className="text-lg mt-6 font-semibold">Regular Price</p>
              <div className="flex justify-center items-center space-x-3 ">
                <input
                  type="number"
                  id="regularprice"
                  value={FormData.regularprice}
                  onChange={onChange}
                  required
                  className=" w-full px-4 py-2 text-xl text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      {" "}
                      ₹ /Month
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* discount */}
            {offer && (
              <div>
                <p className="text-lg mt-6 font-semibold">Discount Price</p>
                <div className="flex justify-center items-center space-x-3 ">
                  <input
                    type="number"
                    id="discountprice"
                    value={FormData.discountprice}
                    onChange={onChange}
                    required
                    className=" w-full px-4 py-2 text-xl text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                  />
                  {type === "rent" && (
                    <div className="">
                      <p className="text-md w-full whitespace-nowrap">
                        {" "}
                        ₹ /Month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* image uploading */}
          <div className="mb-6">
            <p className="text-lg mt-6 font-semibold">Images</p>
            <p className="text-gray-500">You can uploading upto 6 images</p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full mt-1 px-3 py-3 text-orange-500  bg-white border border-gray-300 rounded transition duration-150 ease-in-out  hover:shadow-lg focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
            />
          </div>

          {/* button */}
          <button
            className=" mb-6 w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700  "
            type="submit"
           
          >Submit your list
          </button>
        </from>
      </main>
    </>
  );
};

export default Createlist;
