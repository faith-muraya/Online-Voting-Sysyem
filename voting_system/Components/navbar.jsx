import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="logo">
        <h1>Ku Voting Application</h1>
      </div>
      <div className="links">
        <ul>
          {isAuthenticated ? (
            <div>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/">Application</Link>
              </li>
              <li>
                <Link to="/">Manifesto</Link>
              </li>
              <li>
                <Link to="/">Voting</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
