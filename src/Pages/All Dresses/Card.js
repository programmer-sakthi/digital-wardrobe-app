import React, { useState } from "react";
import "./Card.css";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const Modal = () => {
    return (
      <div className="Modal-container" onClick={closeModal}>
        <div className="Modal" onClick={(e) => e.stopPropagation()}>
          <div className="Modal-header">
            <p className="close" onClick={closeModal} >&times;</p>
          </div>
          <div className="modal-content">
            <h1>This is the modal title</h1>
            <p>{description}</p>
          </div>
          <div className="modal-footer">
            <button className="button button-submit">Submit</button>
            <button className="button button-cancel" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card-container" onClick={toggleModal}>
      {showModal && <Modal />}
      <img src={imgSrc} alt={imgAlt} className="card-img" />
    </div>
  );
};
