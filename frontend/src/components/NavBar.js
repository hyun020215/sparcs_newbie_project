import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () =>
  <div className="navbar">
    <Link to="/">
      Home
    </Link>
    <Link to="/MyPage">
      MyPage
    </Link>
  </div>

export default NavBar;
