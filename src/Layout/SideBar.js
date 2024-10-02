import { deleteUser, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import classes from "./SideBar.module.css";

export function SideBar() {
  const navigate = useNavigate();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const handleLogOut = async () => {
    await signOut(auth);
    toast.info("User logged out successfully !");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    setShowDeleteConfirmationModal(true);
  };

  const DeleteConfirmationModal = () => {
    const user = auth.currentUser;
    return (
      <div className={classes.DeleteModal}>
        <h3>Are you sure want to delete your account ? </h3>
        <div>
          <button
            onClick={async () => {
              await deleteUser(user).then(() => {
                toast.info("User deleted successfully");
                navigate("/");
              });
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              setShowDeleteConfirmationModal(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  const DropDownMenu = () => {
    return (
      <Dropdown>
        <Dropdown.Toggle className={classes.dropdownButton}>
          More
        </Dropdown.Toggle>
        <Dropdown.Menu className={classes.dropdown}>
          <Dropdown.Item onClick={() => navigate("/profile")}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              window.open("https://www.github.com/programmer-sakthi", "_blank");
            }}
          >
            About the creater
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteAccount}>
            Delete account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div>
      {showDeleteConfirmationModal ? (
        <DeleteConfirmationModal />
      ) : (
        <DropDownMenu />
      )}
    </div>
  );
}
