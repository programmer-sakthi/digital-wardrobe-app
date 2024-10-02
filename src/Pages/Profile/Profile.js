import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, storage } from "../../config/firebase";
import classes from "./Profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);

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
    const idToken = await auth.currentUser.getIdToken();

    const imageURL = `profilePics/${user.uid}/profilepic`;
    const imageRef = ref(storage, imageURL);

    try {
      await uploadBytes(imageRef, file);
      toast.success("Image has been successfully uploaded");

      const imageSrc = await getDownloadURL(imageRef);

      await updateProfile(user, {
        photoURL: imageSrc,
        idToken: idToken
      });

      //

      const updatedUser = { ...user, photoURL: imageSrc };
      setUser(updatedUser);
    } catch (error) {
      toast.error("Error uploading image: " + error.message);
      console.log(error);
    }
  };

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profilePicContainer}>
        <img src={user.photoURL} alt="Profile pic" />
        <input type="file" onChange={handleImageChange} />
      </div>
      <h5>Name: {user.displayName}</h5>
      <h5>Email: {user.email}</h5>
      <h5>User Created on: {user.metadata.creationTime}</h5>
    </div>
  );
};

export default Profile;
