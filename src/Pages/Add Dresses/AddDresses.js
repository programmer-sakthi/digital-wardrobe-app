import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import { auth, db, storage } from "../../config/firebase";
import classes from "./AddDresses.module.css";
import { toast } from "react-toastify";

function AddDresses() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchasedFrom, setPurchasedFrom] = useState("");

  const handleAddDress = async () => {
    const user = auth.currentUser;
    const imageURL = `users/${user.uid}/${image.name + v4()}`;
    const formData = {
      imageURL,
      title,
      description,
      category,
      subCategory,
      size,
      material,
      color,
      price,
      purchaseDate,
      purchasedFrom,
      uid : user.uid,
      dress_id: v4()
    };
    const imageRef = ref(storage, imageURL);
    uploadBytes(imageRef, image).then(() => {
      console.log("Image Uploaded");
    });
    const dressDataRef = collection(db, "DressCollection");
    await addDoc(dressDataRef, formData);
    toast.success("Dress added successfully")
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file == null) return;

    setImage(file);
  };

  return (
    <form className={classes.form}>
      <div>
        <div>
          <h2>Add a dress</h2>

          <div className={classes.imageUploadDiv}>
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              className={classes.imageUploadInput}
              style={{ display: "none" }}
            />
            {image ? image.name : "Choose an Image"}
            <div onClick={handleClick}>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="upload"
                  className={classes.imageUpload}
                />
              ) : (
                <img
                  src={require("./photo.png")}
                  alt="uploaded"
                  className={classes.imageUpload}
                />
              )}
            </div>
          </div>

          <div className={classes.inputs}>
            <div className={classes.inputField}>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="">Select a category</option>
                <option value="1">Top</option>
                <option value="2">Bottom</option>
                <option value="3">Shoes</option>
                <option value="4">Accessories</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className={classes.inputField}>
              <label>SubCategory</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Size</label>
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Material</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Purchase Date</label>
              <input
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>

            <div className={classes.inputField}>
              <label>Purchased from</label>
              <input
                type="text"
                value={purchasedFrom}
                onChange={(e) => setPurchasedFrom(e.target.value)}
              />
            </div>
          </div>
          <div className={classes.inputField}>
            <button type="button" onClick={handleAddDress}>
              Add dress
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddDresses;
