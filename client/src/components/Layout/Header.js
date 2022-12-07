import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { getUserData } from "../../storage/auth.storage";
import classes from "./Header.module.css";

const Header = (props) => {
  const user = getUserData();
  const navigate = useNavigate();

  const onLogout = (event) => {
    logout();
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">No Hunger</NavLink>
      </div>
      <div className={classes.navigation}>
        <NavLink className={classes.button} to="/location">Location</NavLink>
        {!user && <NavLink className={classes.button} to="/login">Login</NavLink>}
        {user && <button className={classes.button} onClick={onLogout}>Logout</button>}
      </div>
    </header>
  );
};

export default Header;
