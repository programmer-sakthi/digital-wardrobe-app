import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, storage } from "../../config/firebase";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for image upload

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <div style={{ color: "White" }}>Loading .....</div>;
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    // Check if the user is authenticated
    const currentUser = auth.currentUser;
    if (!currentUser) {
      toast.error("User is not authenticated.");
      return;
    }

    const imageURL = `profilePics/${currentUser.uid}/profilepic`;
    const imageRef = ref(storage, imageURL);

    setLoading(true); // Set loading state to true

    try {
      // Upload the image
      await uploadBytes(imageRef, file);
      toast.success("Image has been successfully uploaded");

      // Get the download URL
      const imageSrc = await getDownloadURL(imageRef);

      // Update user profile with new photo URL
      await updateProfile(currentUser, { photoURL: imageSrc });

      // Update local user state
      const updatedUser = { ...currentUser, photoURL: imageSrc };
      setUser(updatedUser);
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profilePicContainer}>
        <img src={user.photoURL} alt="Profile pic" />
        <input type="file" onChange={handleImageChange} disabled={loading} />
        {loading && <p style={{ color: "white" }}>Uploading...</p>}{" "}
        {/* Display loading message */}
      </div>
      <h5>Name: {user.displayName}</h5>
      <h5>Email: {user.email}</h5>
      <h5>User Created on: {user.metadata.creationTime}</h5>
    </div>
  );
};

export default Profile;
