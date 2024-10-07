import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import classes from "./Card.module.css";

export const Card = ({ dressList }) => {
  const [showModal, setShowModal] = useState(false);
  console.log(dressList)
  const toggleModal = () => {
    console.log(dressList);

    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {

  };

  const Modal = () => {
    return (
      <div
        className={`${classes.ModalContainer} ${showModal ? classes.show : ""}`}
        onClick={closeModal}
      >
        <div className={classes.Modal} onClick={(e) => e.stopPropagation()}>
          <div className={classes.ModalHeader}>
            <button onClick={handleDelete}>
              <MdDelete size={"30px"} />
            </button>
            <button>
              <MdEdit size={"30px"} />
            </button>
            <button onClick={closeModal}>
              <IoMdClose size={"30px"} />
            </button>
          </div>
          <div className={classes.modalContent}>
            <img
              height="100px"
              width="100px"
              src={dressList.imgSrc}
              alt="dress img"
            />
            <h4>{dressList.title}</h4>
            <table>
              <tr>
                <td>
                  <h5>Description : </h5>
                </td>
                <td>
                  <h5>{dressList.description}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Category : </h5>
                </td>
                <td>
                  <h5>{dressList.category}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>subCategory : </h5>
                </td>
                <td>
                  <h5>{dressList.subCategory}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Size : </h5>
                </td>
                <td>
                  <h5>{dressList.size}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Material : </h5>
                </td>
                <td>
                  <h5>{dressList.material}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Color : </h5>
                </td>
                <td>
                  <h5>{dressList.color}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Price : </h5>
                </td>
                <td>
                  <h5>{dressList.price}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Purchase date :</h5>
                </td>
                <td>
                  <h5>{dressList.purchaseDate}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Purchased from :</h5>
                </td>
                <td>
                  <h5>{dressList.purchasedFrom}</h5>
                </td>
              </tr>
            </table>
          </div>
          <div className={classes.modalFooter}></div>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.cardContainer} onClick={toggleModal}>
      {showModal && <Modal />}
      <img
        src={dressList.imgSrc}
        alt={dressList.imgSrc}
        className={classes.cardImg}
      />
    </div>
  );
};
