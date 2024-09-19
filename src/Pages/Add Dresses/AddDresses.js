import React, { useRef, useState } from "react";
import classes from "./AddDresses.module.css";

function AddDresses() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleAddDress = () => {};

  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    // when user cancels file uplaod
    if (file == null) return;
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
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
              <input type="text" />
            </div>

            <div className={classes.inputField}>
              <label>Description</label>
              <input type="text" />
            </div>

            <div className={classes.inputField}>
              <label>Category</label>
            </div>

            <div className={classes.inputField}>
              <label>SubCategory</label>
              <input type="text" />
            </div>
            <div className={classes.inputField}>
              <label>Size</label>
              <input type="number" />
            </div>
            <div className={classes.inputField}>
              <label>Material</label>
              <input type="text" />
            </div>
            <div className={classes.inputField}>
              <label>Color</label>
              <input type="text" />
            </div>
            <div className={classes.inputField}>
              <label>Price</label>
              <input type="number" />
            </div>
            <div className={classes.inputField}>
              <label>Purchase Date</label>
              <input type="date" />
            </div>
            <div className={classes.inputField}>
              <label>Purchased from</label>
              <input type="text" />
            </div>
            {/* <div className={classes.inputField}>
              <button onClick={handleAddDress}>Add dress</button>
            </div> */}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AddDresses;
