import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import "./Card.css";

export const Card = ({ dressList }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log(dressList);

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
            <button>
              <MdDelete size={"30px"} />
            </button>
            <button>
              <MdEdit size={"30px"} />
            </button>
            <button onClick={closeModal}>
              <IoMdClose size={"30px"} />
            </button>
          </div>
          <div className="modal-content">
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
          <div className="modal-footer"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="card-container" onClick={toggleModal}>
      {showModal && <Modal />}
      <img src={dressList.imgSrc} alt={dressList.imgSrc} className="card-img" />
    </div>
  );
};
