import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import classes from "./SideBar.module.css";

function SideBar() {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    toast.info("User logged out successfully !");
    navigate("/");
  };

  return (
    <div className={classes.sideBar}>
      <button onClick={handleLogOut}>Log out</button>
      <button>Profile</button>
    </div>
  );
}

export default SideBar;
