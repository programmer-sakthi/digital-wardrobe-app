import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import classes from "./ResetPassword.module.css";
const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Password reset message sent to the entered email");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + " : " + errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.resetPassword}>
        <h1>Reset Password</h1>
        <div className={classes.resetPasswordDiv}>
          <label className={classes.resetPasswordLabel}>Email</label>
          <input
            type="email"
            placeholder="Email"
            className={classes.resetPasswordInput}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className={classes.resetPasswordButton} onClick={handleResetPassword}>
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
