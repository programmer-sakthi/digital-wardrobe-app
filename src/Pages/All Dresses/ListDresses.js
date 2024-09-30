import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import { Card } from "./Card";
import classes from "./ListDresses.module.css";
import matchers from "@testing-library/jest-dom/matchers";





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
        imgSrc: imageSrc,
        title: doc.data().title,
        description: doc.data().description,
        category: doc.data().category,
        subCategory : doc.data().subCategory,
        size: doc.data().size,
        material: doc.data().material,
        color: doc.data().color,
        price: doc.data().price,
        purchaseDate: doc.data().purchaseDate,
        purchasedFrom: doc.data().purchasedFrom,
        uid: doc.data().uid
      };
    });

    const dresses = await Promise.all(dressPromises);
    if (props.id === 0) {
      const filteredDresses = dresses.filter((ele) => {
        return ele.uid === auth.currentUser.uid;
      });
      setDressList(filteredDresses);
    } else {
      const filteredDresses = dresses.filter((ele) => {
        return (
          parseInt(ele.category) === props.id &&
          ele.uid === auth.currentUser.uid
        );
      });

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
            dressList={ele}
          />
        ))
      )}
    </div>
  );
};

export default ListDresses;
