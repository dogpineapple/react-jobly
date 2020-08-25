import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ isLoggedIn, logOutUser }) {
  // we can use a <ul> instead of <span> and wrap <navlink> with a <li>
  const loggedInNavBar = (
    <span>
      <NavLink exact to="/companies">Companies</NavLink>
      <NavLink exact to="/jobs">Jobs</NavLink>
      <NavLink exact to="/profile">Profile</NavLink>
      <NavLink exact to="/" onClick={logOutUser}>Logout</NavLink>
    </span>
  );

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Jobly</NavLink>
      <div className="NavBar-right">
        {isLoggedIn ? loggedInNavBar : <NavLink exact to="/login" >Login</NavLink>}
      </div>
    </nav>
  );
}

export default NavBar;