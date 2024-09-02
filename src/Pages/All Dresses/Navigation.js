import React, { useState } from "react";
import { FaShirt } from "react-icons/fa6";
import { GiRunningShoe, GiUnderwearShorts } from "react-icons/gi";
import { PiDresserFill } from "react-icons/pi";
import classes from "./Navigation.module.css";
import { MdWatch } from "react-icons/md";
import { TbHanger } from "react-icons/tb";


function Navigation(props) {
  // const [currentSection,setCurrentSection] = useState(0);
  return (
    <div>
      {/* <h1 style={{color:"white"}}>Current Section : {currentSection}</h1> */}
      <nav className={classes.navigation}>
        <ul >
          <li onClick={ () => props.onClick(0)}>
            <PiDresserFill /> All
          </li>
          <li onClick={ () => props.onClick(1)}>
            <FaShirt /> Tops
          </li>
          <li onClick={ () => props.onClick(2)}>
            <GiUnderwearShorts /> Bottoms
          </li>
          <li onClick={ () => props.onClick(3)}>
            <GiRunningShoe />
            Shoes
          </li>
          <li onClick={ () => props.onClick(4)}><MdWatch />Accessories</li>
          <li onClick={ () => props.onClick(5)}><TbHanger /> Others</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
