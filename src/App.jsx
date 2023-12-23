import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import Fpass from "./Pages/Fpass";
import Offer from "./Pages/Offer";
import Nav from "./Com/Nav.jsx";

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Sign-In" element={<Signin />} />
          <Route path="/Sign-Up" element={<Signup />} />
          <Route path="/F-pass" element={<Fpass />} />
          <Route path="/Offer" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
