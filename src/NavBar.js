import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ isLoggedIn, logOutUser }) {
  const loggedInNavBar = (
    <>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink exact to="/" onClick={logOutUser}>Logout</NavLink>
    </>
  );

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Job.ly</NavLink>
      <div className="NavBar-right">
        {isLoggedIn ? loggedInNavBar : <NavLink exact to="/login" >Login</NavLink>}
      </div>
    </nav>
  );
}

export default NavBar;