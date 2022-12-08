import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import { authActions } from "../../store/auth-slice";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  //const user = getUserData();
  const user = useSelector((state) => state.auth.user);
  //console.log(user);
  //console.log(user["role"]);
  useEffect(() => {
    dispatch(authActions.changeUser({
      user: getUserData(),
    }));
  }, [dispatch]);

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
