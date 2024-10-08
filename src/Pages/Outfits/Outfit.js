import { addDoc, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase";
import AddOutfit from "./AddOutfit";
import OutfitCard from "./OutfitCard";
import classes from './Outfit.module.css';

const Outfit = () => {
  const [outfits, setOutfits] = useState([]);
  const [showAddOutfit, setShowAddOutfit] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const createOutfit = async (outfit) => {
    setShowAddOutfit(false);
    const outfitCollectionRef = collection(db, "OutfitCollection");

    try {
      const newOutfit = {
        name: outfit.name,
        dresses: outfit.dresses,
        imageURL: outfit.image,
        uid: outfit.uid,
      };
      setOutfits([...outfits, newOutfit]); 
      await addDoc(outfitCollectionRef, newOutfit); 
      toast.success("Outfit added successfully!");
    } catch (error) {
      toast.error(`Error adding outfit: ${error.message}`);
    }
  };

  const deleteOutfit = async (id) => {
    const outfitDocRef = doc(db, "OutfitCollection", id);
    try {
      await deleteDoc(outfitDocRef);
      setOutfits(outfits.filter((outfit) => outfit.id !== id));
      toast.success("Outfit deleted successfully!");
      closeOutfitCard(); // Close the outfit card if the deleted outfit was selected
    } catch (error) {
      toast.error(`Error deleting outfit: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const outfitCollectionRef = collection(db, "OutfitCollection");
        const outfitDocs = await getDocs(outfitCollectionRef);
        const fetchedOutfits = outfitDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).filter((ele) => ele.uid === auth.currentUser.uid); 
        
        setOutfits(fetchedOutfits);
      } catch (error) {
        toast.error(`Error fetching outfits: ${error.message}`);
      }
    };

    fetchOutfits(); // Fetch outfits when component mounts
  }, []);

  const handleAddOutfit = () => {
    setShowAddOutfit(true);
  };

  const closeModal = () => {
    setShowAddOutfit(false);
  };

  const openOutfitCard = (outfit) => {
    setSelectedOutfit(outfit);
  };

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
          <OutfitCard outfit={selectedOutfit} onClose={closeOutfitCard} onDelete={deleteOutfit} />
        </>
      )}
    </div>
  );
};

export default Outfit;
