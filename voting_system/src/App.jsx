import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/home";
import Navbar from "../Components/navbar";
import Login from "../Pages/login";
import Signup from "../Pages/signup";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
