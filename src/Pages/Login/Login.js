import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import classes from "./Login.module.css";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        navigate("./all-dresses");
        toast.success("User logged in succesfully")
      })
      .catch((error) => {
        toast.error(error.message)
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <h1>Login</h1>
        <div className={classes.loginDiv}>
          <label className={classes.loginLabel}>UserName</label>
          <input
            id="uname"
            type="email"
            placeholder="username"
            className={classes.loginInput}
            onChange={ (e) => setUserName(e.target.value) }
            />
        </div>
        <div className={classes.loginDiv}>
          <label className={classes.loginLabel}>Password</label>
          <input
            id="uname"
            type="text"
            placeholder="password"
            className={classes.loginInput}
            onChange={ (e) => setPassword(e.target.value) }
          />
        </div>
        <div className={classes.forgotPassword}>
          forget your password ?
          <span
            onClick={() => {
              navigate("/reset-password");
            }}
          >
            Reset password
          </span>
        </div>
        <button className={classes.loginButton} onClick={handleLogin}>
          Login
        </button>
        <div className={classes.signup}>
          Not an user ?
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
