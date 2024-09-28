import React from "react";

import "./Card.css";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
}) => {
  console.log(imgSrc);
  return (
    <div className="card-container">
      <img src={imgSrc} alt={imgSrc} className="card-img" />

      {title && <h1 className="card-title">{title}</h1>}
      {description && <p className="card-description">{description}</p>}

      <button className="card-btn">
        {buttonText}
      </button>
    </div>
  );
};
