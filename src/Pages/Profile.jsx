import React, { useEffect, useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";
import ListingItem from "../Com/ListingItem";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetail, setchangeDetail] = useState(false);
  const [FormData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = FormData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  // useEffect(() => {
  //   console.log(listings);
  // }, [listings]);
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // update name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // update name in firestore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Profile is updated");
    } catch (error) {
      toast.error("could not update the profile details");
    }
  }
  useEffect(() => {
    async function fetchUserListings() {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    }
    fetchUserListings();
  }, [auth.currentUser.uid]);
  // delete
  async function onDelete(listingID) {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingID));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingID
      );
      setListings(updatedListings);
      toast.success("Successfully deleted the listing");
    }
  }
  // edit
  function onEdit(listingID) {
    navigate(`/edit-listing/${listingID}`);
  }

  return (
    <>
      <section className="mb-6 max-w-xl mx-auto flex justify-center items-center flex-col bg-white mt-10  rounded-2xl border  border-gray-100 shadow-md ">
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

        <div className="w-full  mt-6 px-3">
          <form>
            {/* name inpute */}
            <div className="flex items-center">
              <span className="mr-2 text-lg text-orange-600 h-12 font-bold">
                Name:
              </span>
              <input
                type="text"
                id="name"
                value={FormData.name}
                disabled={!changeDetail}
                onChange={onChange}
                className={`w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 ${
                  changeDetail && "bg-orange-200 focus:bg-orange-200 "
                }`}
              />
            </div>
            {/* email input */}
            <div className="flex items-center">
              <span className="mr-2 text-lg text-orange-600 h-12 font-bold">
                Email:
              </span>
              <input
                type="emial"
                id="email"
                value={FormData.email}
                disabled
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out mb-6 "
              />
            </div>
            <div className=" flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6 ">
              <p className="flex items-center ">
                Do you want to change your name ?
                <span
                  onClick={() => {
                    changeDetail && onSubmit();
                    setchangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-500 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer "
                >
                  {changeDetail ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
            <button
              className="w-full bg-gray-100 px-7 py-3 text-orange-600 font-bold text-sm uppercase rounded shadow-md hover:bg-gray-300 transition duration-150 ease-in-out hover:shadow-lg active:bg-gray-300 mb-6 "
              type="submit"
            >
              <Link
                to="/Create-list"
                className="flex justify-center items-center"
              >
                <FcHome className="mr-2 text-2xl " />
                Sell or Rent your home
              </Link>
            </button>
          </form>
        </div>
      </section>
      {/* my list  */}
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6 text-blue-600">
              My Listings
            </h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
