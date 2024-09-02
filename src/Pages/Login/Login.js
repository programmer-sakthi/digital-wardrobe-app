import React from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();
  return (
    <div className={classes.container}>
      <div className={classes.login}>
        <h1>Login</h1>
        <div className={classes.loginDiv}>
          <label className={classes.loginLabel}>UserName</label>
          <input
            id="uname"
            type="text"
            placeholder="username"
            className={classes.loginInput}
          />
        </div>
        <div className={classes.loginDiv}>
          <label className={classes.loginLabel}>Password</label>
          <input
            id="uname"
            type="text"
            placeholder="password"
            className={classes.loginInput}
          />
        </div>
        <div className={classes.forgotPassword}>
          forget your password ?
           <span onClick={ () => {
            navigate("/reset-password");
           }}>Reset password</span>
        </div>
        <button className={classes.loginButton}>Login</button>
        <div className={classes.signup}>
            Not an user ? 
            <span onClick={ () => {
              navigate("/signup")
            }}>Sign up</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
