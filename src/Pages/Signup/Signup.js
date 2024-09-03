import React from "react";
import classes from "./Signup.module.css";

function Signup() {
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
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>UserName</label>
          <input
            type="text"
            placeholder="username"
            className={classes.input}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Email</label>
          <input
            type="email"
            placeholder="username"
            className={classes.input}
          />
        </div>
        <div className={classes.div}>
          <label className={classes.label}>Password</label>
          <input
            type="password"
            placeholder="username"
            className={classes.input}
          />
        </div>
        <button className={classes.button}>SignUp</button>
      </div>
    </div>
  );
}

export default Signup;
