import React from 'react'
import classes from './SideBar.module.css';

function SideBar() {
  return (
    <div className={classes.sideBar}>
        <button>Log out</button>
        <button>Profile</button>
    </div>
  )
}

export default SideBar