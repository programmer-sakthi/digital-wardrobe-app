import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase"; // Firebase Firestore configuration
import AddOutfit from "./AddOutfit"; // Component for adding outfits
import OutfitCard from "./OutfitCard"; // Component for displaying outfit details
import classes from './Outfit.module.css'; // Import the CSS for styling

const Outfit = () => {
  const [outfits, setOutfits] = useState([]); // State to hold the list of outfits
  const [showAddOutfit, setShowAddOutfit] = useState(false); // State to control the add outfit modal
  const [selectedOutfit, setSelectedOutfit] = useState(null); // State for the selected outfit

  // Function to create a new outfit
  const createOutfit = async (outfit) => {
    setShowAddOutfit(false);
    const outfitCollectionRef = collection(db, "OutfitCollection");

    try {
      const newOutfit = {
        name: outfit.name,
        dresses: outfit.dresses,
        imageURL: outfit.image ,
        uid : outfit.uid
      };
      setOutfits([...outfits, newOutfit]); 
      await addDoc(outfitCollectionRef, newOutfit); 
      toast.success("Outfit added successfully!");
    } catch (error) {
      toast.error(`Error adding outfit: ${error.message}`);
    }
  };

  // Effect to fetch outfits from Firestore
  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const outfitCollectionRef = collection(db, "OutfitCollection");
        const outfitDocs = await getDocs(outfitCollectionRef);
        const fetchedOutfits = outfitDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedOutfits);
        setOutfits(fetchedOutfits)
        setOutfits(fetchedOutfits.filter( (ele) => {
          return ele.uid===auth.currentUser.uid
        })); 
      } catch (error) {
        toast.error(`Error fetching outfits: ${error.message}`);
      }
    };

    fetchOutfits(); // Fetch outfits when component mounts
  }, []);

  // Function to handle showing the add outfit modal
  const handleAddOutfit = () => {
    setShowAddOutfit(true);
  };

  // Function to close the add outfit modal
  const closeModal = () => {
    setShowAddOutfit(false);
  };

  // Function to open the OutfitCard modal for a selected outfit
  const openOutfitCard = (outfit) => {
    setSelectedOutfit(outfit);
  };

  // Function to close the OutfitCard modal
  const closeOutfitCard = () => {
    setSelectedOutfit(null);
  };

  return (
    <div className={classes.container}>
      {showAddOutfit && (
        <AddOutfit handleAdd={createOutfit} closeModal={closeModal} />
      )}
      <div className={classes.buttonContainer}>
        <button className={classes.button} onClick={handleAddOutfit}>
          Add Outfit
        </button>
      </div>
      <h1 className={classes.title}>Your Outfits:</h1>
      <div className={classes.outfitGrid}>
        {outfits.map((outfit) => (
          <div key={outfit.id} onClick={() => openOutfitCard(outfit)} className={classes.outfitItem}>
            {outfit.imageURL ? (
              <img src={outfit.imageURL} alt={outfit.name} className={classes.outfitImage} />
            ) : (
              <h1 className={classes.outfitName}>{outfit.name}</h1>
            )}
            <h2 className={classes.outfitName}>{outfit.name}</h2>
          </div>
        ))}
      </div>
      {selectedOutfit && (
        <>
          <div className={classes.overlay} onClick={closeOutfitCard}></div>
          <OutfitCard outfit={selectedOutfit} onClose={closeOutfitCard} />
        </>
      )}
    </div>
  );
};

export default Outfit;
