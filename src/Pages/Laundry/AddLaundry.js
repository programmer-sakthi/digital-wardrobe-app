import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import AddLaundryModal from "./AddLaundryModal";

const AddLaundry = ({ onLaundryUpdate }) => {
  const [showAddLaundryModal, setShowAddLaundryModal] = useState(false);

  const handleAddLaundry = async (laundry) => {
    console.log(laundry);
    const laundryCollectionRef = collection(db, "LaundryCollection");

    try {
      await addDoc(laundryCollectionRef, laundry);
      toast.success("Laundry added successfully");
      onLaundryUpdate(); // Call this to update the laundry list after adding
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {showAddLaundryModal && (
        <AddLaundryModal
          onClose={() => setShowAddLaundryModal(false)}
          handleAddLaundryClick={handleAddLaundry}
        />
      )}
      <button onClick={() => setShowAddLaundryModal(!showAddLaundryModal)}>
        Add Laundry
      </button>
    </div>
  );
};

export default AddLaundry;
