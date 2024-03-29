import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Fpass from "./Pages/Fpass";
import Offer from "./Pages/Offer";
import Nav from "./Com/Nav.jsx";
import Privateroute from "./Com/Privateroute.jsx";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./Pages/CreateListing.jsx";
import Upload from "./Pages/Upload.jsx";

import EditListing from "./Pages/EditListing.jsx";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Privateroute />}>
            <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/Sign-In" element={<Signin />} />
          <Route path="/Sign-Up" element={<Signup />} />
          <Route path="/F-pass" element={<Fpass />} />
          <Route path="/Offer" element={<Offer />} />
          <Route path="/Create-list" element={<Privateroute />}>
            <Route path="/Create-list" element={<CreateListing />} />
          </Route>
          <Route path="edit-listing" element={<Privateroute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          <Route path="/Upload" element={<Upload />} />
          <Route path="/Slider" element={<Slide />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
