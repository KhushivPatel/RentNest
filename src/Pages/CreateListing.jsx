// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Spinner from "../Com/Spinner";
import { toast } from "react-toastify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Createlist = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setloading] = useState(false);
  // const [geolocationEnabled, setgeolocationEnabled] = useState(true);
  const [FormData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: "false",
    regularprice: "0",
    discountprice: "0",
    // latitude: 0,
    // longitude: 0,
    // location,
    images: {},
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
    // location,
    // latitude,
    // longitude,
    images,
  } = FormData;

  // function
  function onChange(e) {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }
  async function onSubmit(e) {
    e.preventDefault();
    setloading(true);
    if (discountprice >= regularprice) {
      setloading(false);
      toast.error("Discounted Price Need to me less than regular parice ");
      return;
    }
    if (images.length >= 6) {
      setloading(false);
      toast.error("max 6 images allow");
      return;
    }
    // read
    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setloading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formDataCopy = {
      ...FormData,
      imgUrls,

      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };
    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    const docRef = await addDoc(collection(db, "listings"), formDataCopy);
    setloading(false);
    toast.success("Listing created");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <main className="    mx-auto  justify-center items-center flex  bg-orange-50  ">
        {/* <h1 className="text-3xl gap-4 col-span-2 ... text-orange-600  text-center mt-1.5  font-bold  ">
          Create your own list
        </h1> */}
        <from className="bg-gray-300 mb-4  mt-4 bg-opacity-50 grid grid-cols-3 gap-4 backdrop-filter backdrop-blur-md backdrop-blur-lg px-5  rounded">
          {/* rent and sell */}
          <p className="text-sm col-span-2  mt-6 font-semibold ">
            {" "}
            Sell /Rent
            <div className="flex w-full  ">
              {/* sell  */}
              <button
                type="button"
                id="type"
                value="sale"
                onClick={onChange}
                className={` mr-3 p-2 font-sm text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
                value="rent"
                onClick={onChange}
                className={` ml-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  type === "sale"
                    ? "bg-gray-100 text-orange-600"
                    : "bg-orange-500 text-white"
                } `}
              >
                rent
              </button>
            </div>
          </p>
          {/* name */}
          <p className="text-sm mt-4 font-semibold">
            Name
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Name"
              maxLength="32"
              minLength="5"
              required
              className=" w-full required p-2 text-sm  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200  "
            ></input>
          </p>
          {/* beds and baths */}
          {/* parking  */}
          <p className="text-sm mt-4 font-semibold">
            {" "}
            Parking Shot
            <div className="flex col-span-2  ">
              {/* yes  */}
              <button
                type="button"
                id="parking"
                value={true}
                onClick={onChange}
                className={` mr-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
                value={false}
                onClick={onChange}
                className={` ml-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  parking
                    ? "bg-gray-100 text-orange-600"
                    : "bg-orange-500 text-white"
                } `}
              >
                no
              </button>
            </div>{" "}
          </p>
          <div className="flex space-x-7 mb-6">
            <p className="text-sm mt-4 font-semibold">
              {" "}
              Beds
              {/* bed */}
              <div>
                <input
                  type="number"
                  id="bedrooms"
                  value={bedrooms}
                  onChange={onChange}
                  min="1"
                  max="50"
                  required
                  className=" w-full p-2 text-sm text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
                />
              </div>
            </p>

            {/* bath */}
            <div>
              <p className="text-sm mt-4 font-semibold">Baths </p>
              <input
                type="number"
                id="bathrooms"
                value={bathrooms}
                onChange={onChange}
                min="1"
                max="50"
                required
                className=" w-full p-2 text-sm text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
              />
            </div>
          </div>
          {/* furnished */}
          <div className="flex col-span-3 ">
            <p className="text-sm mt-4 font-semibold"> Furnished Shot</p>
            {/* yes  */}
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={` mr-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
              value={false}
              onClick={onChange}
              className={` ml-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                furnished
                  ? "bg-gray-100 text-orange-600"
                  : "bg-orange-500 text-white"
              } `}
            >
              no
            </button>
          </div>
          {/* address */}
          <p className="text-sm mt-4 col-span-2 font-semibold">
            Address
            <textarea
              type="text"
              id="address"
              value={address}
              onChange={onChange}
              placeholder="Address"
              required
              className="w-full p-2 text-sm  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 mb-6 "
            ></textarea>
            {/* offer */}
            <p className="text-sm  font-semibold"> Offer</p>
            <div className="flex ">
              {/* yes  */}
              <button
                type="button"
                id="offer"
                value={true}
                onClick={onChange}
                className={` mr-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
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
                className={` ml-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                  offer
                    ? "bg-gray-100 text-orange-600"
                    : "bg-orange-500 text-white"
                } `}
              >
                no
              </button>
            </div>
          </p>
          {/* logitutte */}
          {/* {!geolocationEnabled && (
            <div className="flex space-x-6">
              <div>
                <p className="text-sm  font-semibold ">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onChange}
                  required
                  min="-90"
                  max="90"
                  className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
                />
              </div>
              <div>
                <p className="text-sm  font-semibold ">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onChange}
                  required
                  min="-180"
                  max="180"
                  className="w-full p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
                />
              </div>
            </div>
          )} */}
          {/* Description */}
          <p className="text-sm mt-4 font-semibold">
            Description
            <textarea
              type="text"
              id="description"
              value={description}
              onChange={onChange}
              placeholder="Description"
              required
              className="w-full p-2 text-sm  text-gray-500 bg-white border border-gray-300 rounded transition duration-150 ease-in-out  focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200 mb-4 "
            ></textarea>
          </p>

          {/* price */}
          <div className="flex col-span-2  mb-4">
            {/* regular price */}
            <div>
              <p className="text-sm mt-4 font-semibold">Regular Price</p>
              <div className="flex justify-center items-center  ">
                <input
                  type="number"
                  id="regularprice"
                  value={regularprice}
                  onChange={onChange}
                  required
                  className=" w-full p-2 text-sm text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-sm w-full whitespace-nowrap">
                      {" "}
                      ₹ /Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* discount */}
          {offer && (
            <div className="flex  mb-4">
              <div>
                <p className="text-sm  font-semibold">Discount Price</p>
                <div className="flex justify-center items-center  ">
                  <input
                    type="number"
                    id="discountprice"
                    value={discountprice}
                    onChange={onChange}
                    required
                    className=" w-full p-2 text-sm text-gray-700 bg-white  border border-gray-400 rounded transition duration-150 ease-in-out focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
                  />
                  {type === "rent" && (
                    <div className="">
                      <p className="text-sm w-full whitespace-nowrap">
                        {" "}
                        ₹ /Month
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* image uploading */}
          <div className="mb-4 col-span-3">
            <p className="text-sm mt-4 font-semibold">Images</p>
            <p className="text-gray-500">You can uploading upto 6 images</p>
            <input
              type="file"
              id="images"
              onChange={onChange}
              accept=".jpg,.png,.jpeg"
              multiple
              required
              className="w-full mt-1 p-2 text-orange-500  bg-white border border-gray-300 rounded transition duration-150 ease-in-out  hover:shadow-lg focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
            />
          </div>
          {/* button */}
          <button
            className="  col-span-3 mb-6 w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700  "
            type="submit"
            onClick={onSubmit}
          >
            submit
          </button>
        </from>
      </main>
    </>
  );
};

export default Createlist;
