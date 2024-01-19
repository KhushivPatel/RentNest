// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react"; 
// eslint-disable-next-line no-unused-vars
import { Link, useParams } from "react-router-dom";
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
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const EditListing = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);
   const [listing, setListing] = useState(null);
  // const [geolocationEnabled, setgeolocationEnabled] = useState(true);
  const [FormData, setFormData] = useState({
    type: "rent", //or sell
    name: "",
    bedrooms: 0,
    bathrooms: 0,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularprice: "0",
    discountprice: "0",
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
  
  const params = useParams();

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);

  useEffect(() => {
    setLoading(true);
    async function fetchListing() {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef); 
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    }
    fetchListing();
  }, [navigate, params.listingId]);



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
    setLoading(true);
    if (discountprice >= regularprice) {
      setLoading(false);
      toast.error("Discounted Price Need to me less than regular parice ");
      return;
    }
    if (images.length >= 6) {
      setLoading(false);
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
      setLoading(false);
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
    const docRef= doc(db, "listings",params.listingId) ;
     await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("List Updated");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <main
        className="    mx-auto w-full justify-center items-center flex   "
        //style={{ backgroundImage: 'url("/img/02.jpg")' }}
      >
        <form className=" mb-4 w-[60%] bg-gray-100 mt-4  bg-opacity-50  gap-4 backdrop-filter backdrop-blur-md backdrop-blur-lg px-5  rounded">
          <h1 className="text-3xl gap-4 col-span-2 ... text-orange-600  text-center mt-1.5  font-bold  ">
            Edit Listing
          </h1>
          {/* rent and sell */}
          <p className="text-sm col-span-2 mt-6 font-semibold">
            {" "}
            Type
            <div className="flex w-full">
              {/* Dropdown */}
              <select
                id="type"
                onChange={onChange}
                className={`p-2 font-sm text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200  ${
                  type === "rent"
                    ? "bg-gray-100 text-orange-600"
                    : "bg-gray-100 text-orange-600"
                }`}
              >
                {/* Sell option */}
                <option value="sale" selected={type === "sale"}>
                  Sell
                </option>
                {/* Rent option */}
                <option value="rent" selected={type === "rent"}>
                  Rent
                </option>
              </select>
            </div>
          </p>

          {/* name */}
          <p className="text-sm mt-4 font-semibold">
            Name
            <input
              type="text"
              id="name"
              autoComplete="off"
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
                    ? "bg-white text-orange-600 border border-orange-600"
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
                    ? "bg-white text-orange-600 border border-orange-600"
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
          <p className="text-sm mt-4 font-semibold"> Furnished Shot</p>
          <div className="flex col-span-5 ">
            {/* yes  */}
            <button
              type="button"
              id="furnished"
              value={true}
              onClick={onChange}
              className={` mr-3 p-2 font-medium text-sm uppercase shadow-medium rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
                !furnished
                  ? "bg-white text-orange-600 border border-orange-600"
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
                  ? "bg-white text-orange-600 border border-orange-600"
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
                    ? "bg-white text-orange-600 border border-orange-600"
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
                    ? "bg-white text-orange-600 border border-orange-600"
                    : "bg-orange-500 text-white"
                } `}
              >
                no
              </button>
            </div>
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
          Edit
          </button>
        </form>
      </main>
    </>
  );
};

export default EditListing;
