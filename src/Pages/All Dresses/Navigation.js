import React from "react";
import { FaShirt } from "react-icons/fa6";
import { GiRunningShoe, GiUnderwearShorts } from "react-icons/gi";
import { PiDresserFill } from "react-icons/pi";
import classes from "./Navigation.module.css";
import { MdWatch } from "react-icons/md";
import { TbHanger } from "react-icons/tb";

function Navigation() {
  return (
    <div>
      <nav>
        <ul className={classes.navigation}>
          <li>
            <PiDresserFill /> All
          </li>
          <li>
            <FaShirt /> Tops
          </li>
          <li>
            <GiUnderwearShorts /> Bottoms
          </li>
          <li>
            <GiRunningShoe />
            Shoes
          </li>
          <li><MdWatch />Accessories</li>
          <li><TbHanger /> Others</li>
        </ul>
      </nav>
    </div>
  );
}

export default Navigation;
