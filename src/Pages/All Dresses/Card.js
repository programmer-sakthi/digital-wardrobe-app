import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { db } from "../../config/firebase";
import classes from "./Card.module.css";

export const Card = ({ dressList, fetchFireBase }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const formRef = useRef({
    title: dressList.title,
    description: dressList.description,
    category: dressList.category,
    subCategory: dressList.subCategory,
    size: dressList.size,
    material: dressList.material,
    color: dressList.color,
    price: dressList.price,
    purchaseDate: dressList.purchaseDate,
    purchasedFrom: dressList.purchasedFrom,
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "DressCollection", dressList.id);

      // Delete the document from Firestore
      await deleteDoc(docRef);

      // Delete the image from Firebase Storage
      const storage = getStorage();
      const imageRef = ref(storage, dressList.imgSrc);
      await deleteObject(imageRef);

      // Refresh the data
      fetchFireBase();
    } catch (error) {
      console.error("Error deleting document or image: ", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "DressCollection", dressList.id);

      // Get the updated form data from refs
      const updatedData = {
        title: formRef.current.title.value,
        description: formRef.current.description.value,
        category: formRef.current.category.value,
        subCategory: formRef.current.subCategory.value,
        size: formRef.current.size.value,
        material: formRef.current.material.value,
        color: formRef.current.color.value,
        price: Number(formRef.current.price.value), // Ensure price is a number
        purchaseDate: formRef.current.purchaseDate.value,
        purchasedFrom: formRef.current.purchasedFrom.value,
      };

      await updateDoc(docRef, updatedData);
      fetchFireBase();
      closeModal();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const Modal = () => (
    <div
      className={`${classes.ModalContainer} ${showModal ? classes.show : ""}`}
      onClick={closeModal}
    >
      <div className={classes.Modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.ModalHeader}>
          <button onClick={handleDelete}>
            <MdDelete size={"30px"} />
          </button>
          <button onClick={() => setShowEditModal(true)}>
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
            <tbody>
              <tr>
                <td>
                  <h5>Description:</h5>
                </td>
                <td>
                  <h5>{dressList.description}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Category:</h5>
                </td>
                <td>
                  <h5>{dressList.category}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>SubCategory:</h5>
                </td>
                <td>
                  <h5>{dressList.subCategory}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Size:</h5>
                </td>
                <td>
                  <h5>{dressList.size}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Material:</h5>
                </td>
                <td>
                  <h5>{dressList.material}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Color:</h5>
                </td>
                <td>
                  <h5>{dressList.color}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Price:</h5>
                </td>
                <td>
                  <h5>{dressList.price}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Purchase Date:</h5>
                </td>
                <td>
                  <h5>{dressList.purchaseDate}</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Purchased From:</h5>
                </td>
                <td>
                  <h5>{dressList.purchasedFrom}</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {showEditModal && <EditModal />}

        <div className={classes.modalFooter}></div>
      </div>
    </div>
  );

  const EditModal = () => {
    return (
      <div
        className={`${classes.ModalContainer} ${
          showEditModal ? classes.show : ""
        }`}
        onClick={closeModal}
      >
        <div className={classes.Modal} onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleEditSubmit} ref={formRef}>
            <h4>Edit Dress Details</h4>

            <input
              type="text"
              name="title"
              defaultValue={dressList.title}
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              defaultValue={dressList.description}
              placeholder="Description"
              required
            />
            <input
              type="text"
              name="category"
              defaultValue={dressList.category}
              placeholder="Category"
              required
            />
            <input
              type="text"
              name="subCategory"
              defaultValue={dressList.subCategory}
              placeholder="SubCategory"
              required
            />
            <input
              type="text"
              name="size"
              defaultValue={dressList.size}
              placeholder="Size"
              required
            />
            <input
              type="text"
              name="material"
              defaultValue={dressList.material}
              placeholder="Material"
              required
            />
            <input
              type="text"
              name="color"
              defaultValue={dressList.color}
              placeholder="Color"
              required
            />
            <input
              type="number"
              name="price"
              defaultValue={dressList.price}
              placeholder="Price"
              required
            />
            <input
              type="date"
              name="purchaseDate"
              defaultValue={dressList.purchaseDate.split("T")[0]}
              required
            />
            <input
              type="text"
              name="purchasedFrom"
              defaultValue={dressList.purchasedFrom}
              placeholder="Purchased From"
              required
            />

            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={classes.cardContainer} onClick={toggleModal}>
      {showModal && <Modal />}
      <img
        src={dressList.imgSrc}
        alt={dressList.title}
        className={classes.cardImg}
      />
    </div>
  );
};
