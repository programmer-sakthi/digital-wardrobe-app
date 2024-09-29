import React from "react";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import { SideBar } from "./SideBar";

function Header() {

  return (
    <div className={classes.header}>
      <div className={classes.headerDiv}>
        <h1>Digi Wardrobe</h1>
      </div>
      <nav style={{ color: "white" }}>
        <ul>
          <Link to="/all-dresses">
            <li>All Dresses</li>
          </Link>
          <Link to="/outfits" className={classes.link}>
            <li>Outfits</li>
          </Link>
          <Link to="/laundry">
            <li>Laundry</li>
          </Link>
          <Link to="/add-dresses">
            <li>Add Dresses</li>
          </Link>
          <li>
            <SideBar />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;

