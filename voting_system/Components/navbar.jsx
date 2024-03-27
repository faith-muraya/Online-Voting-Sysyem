import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

function navbar() {
  return (
    <div className="containern">
      <div className="logo">
        <h1>Ku Voting Application</h1>
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to="/">Home</Link>
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
        </ul>
      </div>
    </div>
  );
}

export default navbar;
