import React from 'react';
import classes from './OutfitCard.module.css'; // Import the CSS for styling

const OutfitCard = ({ outfit, onClose, onDelete }) => {
  return (
    <div className={classes.outfitCard}>
      <h2>{outfit.name}</h2>
      {outfit.imageURL && <img src={outfit.imageURL} alt={outfit.name} className={classes.outfitImage} />}
      <h3>Dresses:</h3>
      <ul>
        {outfit.dresses?.map((dress, index) => (
          <li key={index} className={classes.dressItem}>
            <img src={dress.data.imgSrc} alt={dress.data.title || "Unnamed Dress"} className={classes.dressImage} />
            {dress.data.title || "Unnamed Dress"}
          </li>
        ))}
      </ul>
      <div className={classes.buttonContainer}>
        <button className={classes.closeButton} onClick={onClose}>Close</button>
        <button className={classes.deleteButton} onClick={() => onDelete(outfit.id)}>Delete</button>
      </div>
    </div>
  );
};

export default OutfitCard;
