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

  const [isMobile, setIsMobile] = useState(false);

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
    dispatch(
      authActions.changeUser({
        user: getUserData(),
      })
    );
  }, [dispatch]);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/">No Hunger</NavLink>
      </div>
      {isMobile && <br />}
      <div
        onClick={() => setIsMobile(false)}
        className={isMobile ? classes.navigationMobile : classes.navigation}
      >
        {user && user.role === "Admin" && (
          <NavLink className={classes.button} to="/admin">
            Admin
          </NavLink>
        )}
        {user && (
          <NavLink className={classes.button} to="/orders">
            Orders
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
          <a className={classes.button} onClick={openModalHandler}>
            Logout
          </a>
        )}
      </div>
      <button
        onClick={() => setIsMobile((state) => !state)}
        className={classes.mobileMenuIcon}
      >
        {isMobile ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        )}
      </button>
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
