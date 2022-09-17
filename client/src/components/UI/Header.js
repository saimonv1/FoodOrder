import React from "react";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>No Hunger</div>
      <button>one</button>
      <button>two</button>
      <button>Login</button>
      <p></p>
    </header>
  );
};

export default Header;
