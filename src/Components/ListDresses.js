import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { db, storage } from "../config/firebase";
import { Card } from "./Card";
import classes from "./ListDresses.module.css";

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
        category: doc.data().category
      };
    });
    const dresses = await Promise.all(dressPromises);
    console.log("Non filtered :")
    console.log(dresses);
    const filteredDresses=dresses.filter( (ele) => {
      console.log(ele)
      console.log(ele.category + " === "+props.id + (parseInt(ele.category) === props.id) )
      return parseInt(ele.category) === props.id
    })
    setSampleDressList(filteredDresses);
    console.log("Filtered  ")
    console.log(filteredDresses);
  };

  displayFireBase()

  return (
    <div className={classes.container}>
      {sampleDressList.map((ele, index) => (
        <Card
          key={index}
          imgSrc={ele.imgSrc}
          imgAlt={ele.title}
          title={ele.title}
          description={ele.description}
          buttonText="More Info"
          link="ottostore.com"
        />
      ))}
    </div>
  );
};

export default ListDresses;
