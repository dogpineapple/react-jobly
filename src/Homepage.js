import React from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage({ isLoggedIn }) {
  return (
    <div className="Homepage">
      <h1 className="Homepage-title">Jobly</h1>
      <p className="Homepage-description">All the jobs in one, convenient place.</p>
      {isLoggedIn ? <p>Welcome back!</p> : <Link to="/login"><button>Login</button></Link>}
    </div>
  );
}

export default Homepage;