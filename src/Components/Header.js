// import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import SideBar from "./SideBar";

function Header() {

  const [showSideBar,setShowSidebar] = useState(false);

  return (
    <div className={classes.header}>
      <div className={classes.headerDiv}>
        <button style={{ background: "transparent", borderStyle: "solid" }} onClick={ 
          (e) => setShowSidebar(!showSideBar)
        }>
          <CgDetailsMore className="icon" color="purple" size={30} />
        
        </button>
        {showSideBar && 
          <SideBar />
        }
        <h1>Digi Wardrobe</h1>
      </div>
      <nav style={{ color: "white" }}>
        <ul>
          <Link to="/all-dresses">
            <li>All Dresses</li>
          </Link>
          <Link to="/outfits" className={classes.link}><li>Outfits</li></Link>
          <Link to="/laundry"><li>Laundry</li></Link>
          <Link to="/add-dresses"><li>Add Dresses</li></Link>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
