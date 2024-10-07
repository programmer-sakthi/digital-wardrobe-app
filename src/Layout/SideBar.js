import { deleteUser, signOut } from "firebase/auth";
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import classes from "./SideBar.module.css";

export function SideBar() {
  const navigate = useNavigate();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState(false);

  const handleLogOut = async () => {
    await signOut(auth);
    toast.info("User logged out successfully!");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    setShowDeleteConfirmationModal(true);
  };

  const DeleteConfirmationModal = () => {
    const user = auth.currentUser;
    return (
      <div className={classes.DeleteModal}>
        <h3>Are you sure you want to delete your account?</h3>
        <div>
          <button
            onClick={async () => {
              try {
                await deleteUser(user);
                toast.info("User deleted successfully");
                navigate("/");
              } catch (error) {
                toast.error("Error deleting user: " + error.message);
              }
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
            About the creator
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDeleteAccount}>
            Delete account
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <div className={classes.sideBarContainer}>
      {showDeleteConfirmationModal ? (
        <DeleteConfirmationModal />
      ) : (
        <DropDownMenu />
      )}
    </div>
  );
}