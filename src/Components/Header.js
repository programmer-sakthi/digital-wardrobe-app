
import React from "react";
import { CgDetailsMore } from "react-icons/cg";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      
      <div>
        <CgDetailsMore className="icon" color="purple" size={30} />
        <h1>Digi Wardrobe</h1>
      </div>
      <nav style={{ color: "white" }}>
        <ul>
          <li>All Dresses</li>
          <li>Outfits</li>
          <li>Laundry</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
