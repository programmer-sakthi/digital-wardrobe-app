import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import classes from "./SideBar.module.css";
import { Dropdown } from "react-bootstrap";

export function SideBar() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    toast.info("User logged out successfully !");
    navigate("/");
  };

  return (
    <Dropdown>
        <Dropdown.Toggle className={classes.dropdownButton}>
          More
        </Dropdown.Toggle>
        <Dropdown.Menu  className={classes.dropdown}>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
          <Dropdown.Item>About the creater</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
  );
}

