import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import classes from "./ListDresses.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const ListDresses = (props) => {
  const [sampleDressList, setSampleDressList] = useState([]);

  const displayFireBase = async () => {
    const dressDataRef = collection(db, "DressCollection");
    const arr = await getDocs(dressDataRef);
    const dressPromises = arr.docs.map(async (doc) => {
      const imageURL = doc.data().imageURL;
      const imageRef = ref(storage, imageURL);
      const imageSrc = await getDownloadURL(imageRef);
      return {
        title: doc.data().title,
        imgSrc: imageSrc,
      };
    });
    const dresses = await Promise.all(dressPromises);
    setSampleDressList(dresses);
  };

  useEffect(() => {
    displayFireBase();
  }, []);

  return (
    <div className={classes.container}>
      {sampleDressList.map((ele, index) => (
        <Card
          key={index}
          imgSrc={ele.imgSrc}
          imgAlt={ele.title} // or another appropriate alt text
          title={ele.title}
          description={ele.description} // Make sure you add description in the fetched data
          buttonText="More Info"
          link="ottostore.com" // Update as needed
        />
      ))}
    </div>
  );
};

export default ListDresses;
