import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, storage } from "../../config/firebase";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // For upload loading state
  const [imageLoading, setImageLoading] = useState(false); // For image loading state

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

    setLoading(true); // Set loading state for upload
    setImageLoading(true); // Set loading state for image display

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
      
      // Set image loading to true to show placeholder until loaded
      setImageLoading(true);

      // Load the new image to ensure it is ready before displaying
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        setImageLoading(false); // Image has loaded
        setLoading(false); // Upload is complete
      };
      
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
      console.log(error);
      setLoading(false); // Reset loading state on error
    }
  };

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profilePicContainer}>
        {imageLoading && <div className={classes.loadingOverlay}>Loading...</div>} {/* Loading overlay */}
        <img src={user.photoURL} alt="Profile pic" style={{ display: imageLoading ? 'none' : 'block' }} />
        <input type="file" onChange={handleImageChange} disabled={loading} />
        {loading && <p style={{ color: "white" }}>Uploading...</p>} {/* Display upload message */}
      </div>
      <h5>Name: {user.displayName}</h5>
      <h5>Email: {user.email}</h5>
      <h5>User Created on: {user.metadata.creationTime}</h5>
    </div>
  );
};

export default Profile;