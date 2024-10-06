import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db, storage } from "../../config/firebase";
import classes from "./AddLaundryModal.module.css";

const AddLaundryModal = ({ onClose, handleAddLaundryClick }) => {
  const [laundryType, setLaundryType] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleLaundrySubmit = (dresses) => {
    if (!date || laundryType === "default" || !description) {
      toast.error("Please fill all the fields");
      return;
    }

    handleAddLaundryClick({
      dresses: dresses,
      description: description,
      type: laundryType,
      uid: auth.currentUser.uid,
      date: date,
    });
  };

  return (
    <div className={classes.ModalOverlay}>
      <div className={classes.AddLaundryModal}>
        <h2>Add Laundry</h2>
        <button className={classes.CloseButton} onClick={onClose}>
          X
        </button>
        <label>Date</label>
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Type</label>
        <br />
        <select
          value={laundryType}
          onChange={(e) => setLaundryType(e.target.value)}
        >
          <option value="default">Select a laundry type</option>
          <option value="Dry Cleaning">Dry Cleaning</option>
          <option value="Wash and Fold">Wash and Fold</option>
          <option value="Ironing and Pressing">Ironing and Pressing</option>
        </select>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DressSelection handleLaundrySubmit={handleLaundrySubmit} />
      </div>
    </div>
  );
};

const DressSelection = ({ handleLaundrySubmit }) => {
  const [category, setCategory] = useState("");
  const [dressList, setDressList] = useState([]);
  const [selectedDressList, setSelectedDressList] = useState([]);

  const handleDressClick = (dress) => {
    setSelectedDressList((prevList) => {
      const isSelected = prevList.some(
        (selectedDress) => selectedDress.id === dress.id
      );
      return isSelected
        ? prevList.filter((selectedDress) => selectedDress.id !== dress.id)
        : [...prevList, dress];
    });
  };

  const fetchFireBase = async () => {
    try {
      const dressCollectionRef = collection(db, "DressCollection");
      const arr = await getDocs(dressCollectionRef);
      const dressPromises = arr.docs.map(async (doc) => {
        const imageURL = doc.data().imageURL;
        const imageRef = ref(storage, imageURL);
        const imageSrc = await getDownloadURL(imageRef);
        return { id: doc.id, data: { ...doc.data(), imgSrc: imageSrc } };
      });
      const dresses = (await Promise.all(dressPromises)).filter(
        (ele) =>
          ele.data.uid === auth.currentUser.uid &&
          ele.data.category === category
      );
      setDressList(dresses);
    } catch (error) {
      toast.error("Failed to fetch dresses.");
    }
  };

  useEffect(() => {
    if (category) fetchFireBase();
  }, [category]);

  const availableDresses = dressList.filter(
    (dress) =>
      !selectedDressList.some((selectedDress) => selectedDress.id === dress.id)
  );

  return (
    <div>
      <label>Category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="default">Select a category</option>
        <option value="1">Top</option>
        <option value="2">Bottom</option>
        <option value="3">Shoes</option>
        <option value="4">Accessories</option>
        <option value="5">Others</option>
      </select>
      <div>
        <h6>Available Dresses</h6>
        {availableDresses.length === 0 ? (
          <p>No dresses available</p>
        ) : (
          <div className={classes.DressGrid}>
            {availableDresses.map((d) => (
              <img
                key={d.id}
                src={d.data.imgSrc}
                alt={d.data.title}
                onClick={() => handleDressClick(d)}
                className={classes.DressImage}
                style={{ height: "100px", width: "100px" }}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <h6>Selected Dresses</h6>
        {selectedDressList.length === 0 ? (
          <p>No dresses selected</p>
        ) : (
          <div className={classes.DressGrid}>
            {selectedDressList.map((d) => (
              <img
                key={d.id}
                src={d.data.imgSrc}
                alt={d.data.title}
                onClick={() => handleDressClick(d)}
                className={classes.DressImage}
                style={{ height: "100px", width: "100px" }}
              />
            ))}
          </div>
        )}
      </div>
      <button onClick={() => handleLaundrySubmit(selectedDressList)}>
        Add Laundry
      </button>
    </div>
  );
};

export default AddLaundryModal;
