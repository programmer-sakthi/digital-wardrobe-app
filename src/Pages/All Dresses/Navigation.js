import React, { useState } from "react";
import { FaShirt } from "react-icons/fa6";
import { GiRunningShoe, GiUnderwearShorts } from "react-icons/gi";
import { PiDresserFill } from "react-icons/pi";
import classes from "./Navigation.module.css";
import { MdWatch } from "react-icons/md";
import { TbHanger } from "react-icons/tb";


function Navigation(props) {
  return (
    <div>
      <nav className={classes.navigation}>
        <ul >
          <li onClick={ () => props.onClick(0)} className={props.currentSection === 0 ? classes.current : ''}>
            <PiDresserFill /> All
          </li>
          <li onClick={ () => props.onClick(1)} className={props.currentSection === 1 ? classes.current : ''}>
            <FaShirt /> Tops
          </li>
          <li onClick={ () => props.onClick(2)} className={props.currentSection === 2 ? classes.current : ''}>
            <GiUnderwearShorts /> Bottoms
          </li>
          <li onClick={ () => props.onClick(3)} className={props.currentSection === 3 ? classes.current : ''}>
            <GiRunningShoe />
            Shoes
          </li>
          <li onClick={ () => props.onClick(4)} className={props.currentSection === 4 ? classes.current : ''}><MdWatch />Accessories</li>
          <li onClick={ () => props.onClick(5)} className={props.currentSection === 5 ? classes.current : ''}><TbHanger /> Others</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
