import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import classes from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        if (userCredential.user.emailVerified) {
          navigate("/all-dresses");
          toast.success("User logged in succesfully");
        } else {
          toast.error("Email not verified");
          toast.info("check your mail for verification link");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.loaderDiv}>
          <span className={classes.loader}></span>
          <h3>Logging in .... </h3>
        </div>
      ) : (
        <div className={classes.login}>
          <h1>Login</h1>
          <div className={classes.loginDiv}>
            <label className={classes.loginLabel}>Email</label>
            <input
              id="mail"
              type="email"
              placeholder="Email"
              className={classes.loginInput}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.loginDiv}>
            <label className={classes.loginLabel}>Password</label>
            <input
              id="uname"
              type="password"
              placeholder="password"
              className={classes.loginInput}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={classes.forgotPassword}>
            forget your password ?
            <span onClick={(e) => navigate("/reset-password")}>
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
      )}
    </div>
  );
}

export default Login;
