import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../services/auth.service";
import { setUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./AuthForm.module.css";

const RegisterForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target["current-password"].value;

    register(email, password)
      .then((res) => {
        setUserData(res.accessToken, res.refreshToken, dispatch);
        setError(null);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Register</h1>
      <h4>You can create a new account here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            min="3"
            autoComplete="on"
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">Password</label>
          <input
            type="password"
            id="new-password"
            min="6"
            autoComplete="on"
            required
          />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Register</button>
          <NavLink className={classes.button} to="/login">
            Login
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
