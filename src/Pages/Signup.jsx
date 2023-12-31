import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import { VscEye } from "react-icons/vsc";
import { Link } from "react-router-dom";
import OAuth from "../Com/OAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../FireBase";
// import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const collectionRef = collection(db, "users");
  const [ShowPass, setShowPass] = useState(false);
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = FormData;
  const navigate = useNavigate();

  function onchange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit(e) {
    e.preventDefault();
    console.log(name);
    console.log(email);
    // console.log(password);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //updateProfile(auth.currentUser, { displayName: name });
      const user = userCredential.user;
      console.log(user);
      await addDoc(collectionRef, {
        name: FormData.name,
        email: FormData.email,
      });
      // await addDoc(collectionRef, {
      //   name: "Khushi",
      // });
      // console.log("Test");
      // toast.success("Sign Up was done successfully");
      navigate("/");
      // console.log(...FormData);
    } catch (error) {
      toast.error("Something is wrong with Registration");
    }
  }

  return (
    <section>
      <div className="flex justify-center flex-wrap items-center px-4 py-10 max-w-6xl mx-auto  mt-4 bg-white shadow-lg   rounded-2xl">
        <div className="md:w-[68%] lg:w-[52%] ">
          <img src="img/signup.jpg" className=" object-cover w-full"></img>
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%]  bg-white h-fit  px-5 mb-2">
          <form>
            <h1 className="text-center font-semibold text-3xl mt-3 mb-4 text-orange-500 ">
              Sign Up
            </h1>
            <input
              type="text"
              id="name"
              value={FormData.name}
              onChange={onchange}
              placeholder="Enter your name"
              className=" w-full px-4 py-2  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
            />
            <div className="relative mt-6 mb-6"></div>
            <input
              type="email"
              id="email"
              value={FormData.email}
              onChange={onchange}
              placeholder="Enter your mail"
              className=" w-full px-4 py-2  text-gray-700 bg-white border-gray-300 rounded transition ease-in-out "
            />
            <div className="relative mt-6 mb-6">
              <input
                type={ShowPass ? "text" : "password"}
                id="password"
                value={FormData.password}
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
                have an account ?
                <Link
                  to="/Sign-In"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                >
                  Sign In
                </Link>
              </p>
              <p className="text-red-500 hover:text-red-800 transition duration-200 ease-in-out ">
                <Link to="/F-pass">Forgot Password?</Link>
              </p>
            </div>
            <button
              className="w-full bg-orange-500 px-7 py-3 text-white text-sm font-medium uppercase rounded shadow-md hover:bg-orange-600 transition duration-150 ease-in-out hover:shadow-lg active:bg-orange-700 "
              type="submit"
              onClick={onSubmit}
            >
              Sign Up
            </button>
          </form>
          <div className=" flex items-center my-4 before:border-t  before:flex-1  before:border-gray-500  after:border-t  after:flex-1  after:border-gray-500">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </div>
      </div>
    </section>
  );
};

export default Signup;
