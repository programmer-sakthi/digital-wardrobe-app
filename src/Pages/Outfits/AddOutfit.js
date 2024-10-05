import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import classes from "./AddOutfit.module.css";
import { Card } from "./Card";
import { v4 } from "uuid";

const AddOutfit = (props) => {
  const [category, setCategory] = useState("");
  const [dressList, setDressList] = useState([]);
  const [selectedDressList, setSelectedDressList] = useState([]);
  const [outfitName, setOutfitName] = useState("");
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    fetchFireBase();
  }, [category]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageUpload = async () => {
    const user = auth.currentUser;
    const imgURL = `outfits/${user.uid}/${image.name}_${v4()}`;
    const imageRef = ref(storage, imgURL);
    await uploadBytes(imageRef, image);
    const downloadURL = await getDownloadURL(imageRef); // Get the download URL
    return downloadURL; 
  };

  const fetchFireBase = async () => {
    const dressCollectionRef = collection(db, "DressCollection");
    const arr = await getDocs(dressCollectionRef);
    const dressPromises = arr.docs.map(async (doc) => {
      const imageURL = doc.data().imageURL;
      const imageRef = ref(storage, imageURL);
      const imageSrc = await getDownloadURL(imageRef);
      return { id: doc.id, data: { ...doc.data(), imgSrc: imageSrc } };
    });
    const dresses = (await Promise.all(dressPromises)).filter(
      (ele) => ele.data.uid === auth.currentUser.uid && ele.data.category === category
    );
    setDressList(dresses);
  };

  const handleDressClick = (dress) => {
    setSelectedDressList((prevList) => {
      const isSelected = prevList.some(selectedDress => selectedDress.id === dress.id);
      return isSelected ? prevList.filter(selectedDress => selectedDress.id !== dress.id) : [...prevList, dress];
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(file);
  };

  const availableDresses = dressList.filter(dress => !selectedDressList.some(selectedDress => selectedDress.id === dress.id));

  return (
    <div className={classes.AddOutfit}>
      <div className={classes.modalContent}>
        <h1>Add an Outfit</h1>
        <div className={classes.inputField}>
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="default">Select a category</option>
            <option value="1">Top</option>
            <option value="2">Bottom</option>
            <option value="3">Shoes</option>
            <option value="4">Accessories</option>
            <option value="5">Others</option>
          </select>
        </div>

        <div>
          <h6>Available Dresses</h6>
          <div className={classes.dressCardContainer}>
            {availableDresses.map((d) => (
              <div key={d.id} onClick={() => handleDressClick(d)}>
                <Card dressList={d.data} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h6>Selected Dresses</h6>
          <div className={classes.dressCardContainer}>
            {selectedDressList.map((d) => (
              <div key={d.id} onClick={() => handleDressClick(d)}>
                <Card dressList={d.data} />
              </div>
            ))}
          </div>
        </div>

        <div className={classes.AddOutfitFooter}>
          <h3 style={{ color: "black", cursor: "pointer" }}>
            Outfit name:{" "}
            <input type="text" onChange={(e) => setOutfitName(e.target.value)} />
          </h3>

          <h3 style={{ color: "black", cursor: "pointer" }}>Outfit image: </h3>
          <input type="file" onChange={handleImageChange} ref={hiddenFileInput} />
          {image ? image.name : "Choose an Image"}
          <div onClick={handleClick}>
            {image ? (
              <img src={URL.createObjectURL(image)} alt="upload" />
            ) : (
              <img src={require("./photo.png")} alt="uploaded" />
            )}
          </div>
          <button
            onClick={async () => {
              const imageUrl = await handleImageUpload(); // Upload image and get URL
              const outfit = {
                name: outfitName,
                dresses: selectedDressList,
                image: imageUrl, 
                uid : auth.currentUser.uid
              };
              props.handleAdd(outfit);
            }}
          >
            Add
          </button>
          <button onClick={props.closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddOutfit;
