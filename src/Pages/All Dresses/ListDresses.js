import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Card } from "./Card";
import { db, storage } from "../../config/firebase";
import classes from "./ListDresses.module.css";

const ListDresses = (props) => {
  const [dressList, setDressList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFireBase = async () => {
    setLoading(true);
    const dressDataRef = collection(db, "DressCollection");
    const arr = await getDocs(dressDataRef);
    const dressPromises = arr.docs.map(async (doc) => {
      const imageURL = doc.data().imageURL;
      const imageRef = ref(storage, imageURL);
      const imageSrc = await getDownloadURL(imageRef);
      return {
        title: doc.data().title,
        imgSrc: imageSrc,
        category: doc.data().category,
      };
    });

    const dresses = await Promise.all(dressPromises);
    if (props.id === 0) setDressList(dresses);
    else {
      const filteredDresses = dresses.filter(
        (ele) => parseInt(ele.category) === props.id
      );
      setDressList(filteredDresses);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFireBase();
  }, [props.id]);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loaderDiv}>
          <span className={classes.loader}></span>
        </div>
      ) : (
        dressList.map((ele, index) => (
          <Card
            key={index}
            imgSrc={ele.imgSrc}
            imgAlt={ele.title}
            title={ele.title}
            description={ele.description}
            buttonText="More Info"
            link="ottostore.com"
          />
        ))
      )}
    </div>
  );
};

export default ListDresses;
