import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../../config/firebase"; // Remove storage
import AddOutfit from "./AddOutfit";
import { v4 } from "uuid";

const Outfit = () => {
  const [outfits, setOutfits] = useState([]);
  const [showAddOutfit, setShowAddOutfit] = useState(false);

  const createOutfit = async (outfit) => {
    setShowAddOutfit(false);
    const outfitCollectionRef = collection(db, "OutfitCollection");

    try {
      const newOutfit = {
        name: outfit.name,
        dresses: outfit.dresses,
        imageURL: outfit.image // Directly use the image URL passed from AddOutfit
      };
      setOutfits([...outfits, newOutfit]);
      await addDoc(outfitCollectionRef, newOutfit);
      toast.success("Outfit added successfully!");
    } catch (error) {
      toast.error(`Error adding outfit: ${error.message}`);
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
        }));
        setOutfits(fetchedOutfits); // Update state with fetched outfits
      } catch (error) {
        toast.error(`Error fetching outfits: ${error.message}`);
      }
    };

    fetchOutfits(); // Fetch outfits when component mounts
  }, []);

  const handleAddOutfit = () => {
    setShowAddOutfit(true); // Show modal to add outfit
  };

  const closeModal = () => {
    setShowAddOutfit(false); // Close modal
  };

  return (
    <div>
      {showAddOutfit && (
        <AddOutfit handleAdd={createOutfit} closeModal={closeModal} />
      )}
      <div>
        <button onClick={handleAddOutfit}>Add Outfit</button>
      </div>
      <div style={{ color: "white" }}>
        <h1>Your Outfits:</h1>
        <div>
          {outfits.map((outfit) => (
            <div key={outfit.id}>
              {outfit.imageURL ? (
                <img src={outfit.imageURL} alt={outfit.name} style={{ width: '100px', height: '100px' }} />
              ) : (
                <h1>{outfit.name}</h1>
              )}
              <ul>
                {(outfit.dresses?.length > 0 ? outfit.dresses : []).map(
                  (dress, index) => (
                    <li key={index}>{dress.data.title || "Unnamed Dress"}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Outfit;
