import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import classes from "./Header.module.css";

const Header = (props) => {
  const user = getUserData();
  console.log(user);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">No Hunger</NavLink>
      </div>
      <div className={classes.navigation}>
        {user && user.role === "Admin" && (
          <NavLink className={classes.button} to="/admin">
            Admin
          </NavLink>
        )}
        <NavLink className={classes.button} to="/location">
          Location
        </NavLink>
        {!user && (
          <NavLink className={classes.button} to="/login">
            Login
          </NavLink>
        )}
        {user && (
          <NavLink className={classes.button} to="/logout">
            Logout
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
