import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">No Hunger</NavLink>
      </div>
      <div className={classes.navigation}>
        <NavLink className={classes.button} to="/location">Location</NavLink>
        <NavLink className={classes.button} to="/login">Login</NavLink>
        <NavLink className={classes.button} to="/register">Register</NavLink>
      </div>
    </header>
  );
};

export default Header;
