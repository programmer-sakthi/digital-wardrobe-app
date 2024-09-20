import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import classes from "./Signup.module.css";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleSignUp = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        async (userCred) => {
          const user = userCred.user;
          setUser(user); // store the user to check verification later
          await sendEmailVerification(user);
          toast.info("Verification email sent. Please verify your email.");
        }
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (user) {
        await user.reload(); // Refresh the user object
        if (user.emailVerified) {
          clearInterval(interval); // Stop polling
          toast.success("Email verified successfully!");
          navigate("/"); // Navigate once email is verified
        }
      }
    }, 3000); // Polling every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [user, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.signup}>
        <h1>Signup</h1>
        <div className={classes.div}>
          <label className={classes.label}>Name</label>
          <input
            type="text"
            placeholder="username"
            className={classes.input}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>UserName</label>
          <input
            type="text"
            placeholder="username"
            className={classes.input}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Email</label>
          <input
            type="email"
            placeholder="username"
            className={classes.input}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Password</label>
          <input
            type="password"
            placeholder="username"
            className={classes.input}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={classes.button} onClick={handleSignUp}>
          SignUp
        </button>
      </div>
    </div>
  );
}

export default Signup;
