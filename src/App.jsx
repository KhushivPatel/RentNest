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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createlist from "./Pages/Createlist.jsx";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Privateroute/>}>
            <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/Sign-In" element={<Signin />} />
          <Route path="/Sign-Up" element={<Signup />} />
          <Route path="/F-pass" element={<Fpass />} />
          <Route path="/Offer" element={<Offer />} />
          <Route path="/Create-list" element={<Createlist/>} />
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
