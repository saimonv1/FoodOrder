import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { getUserData } from "../../storage/auth.storage";
import { authActions } from "../../store/auth-slice";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.auth.user);
  
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = (id) => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const onLogoutHandler = async () => {
    logout(user.refreshToken, dispatch)
      .then((res) => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      })
      .finally(() => {
        setOpenModal(false);
        navigate("/", { replace: true });
      });
  };

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
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a className={classes.button} onClick={openModalHandler}>Logout</a>
        )}
      </div>
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Are you sure you want to logout?</p>
          <Button onClick={onLogoutHandler}>Logout</Button>
        </Modal>
      )}
    </header>
  );
};

export default Header;
