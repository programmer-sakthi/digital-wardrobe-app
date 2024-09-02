import React from "react";
import classes from "./Login.module.css";

function Login() {
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
          {"   "}
           <a href="#">Reset password</a>
        </div>
        <button className={classes.loginButton}>Login</button>
        <div className={classes.signup}>
            Not an user ? 
            < a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
