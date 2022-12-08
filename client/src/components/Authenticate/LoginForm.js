import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import { setUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./AuthForm.module.css";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target["current-password"].value;

    login(email, password)
      .then((res) => {
        setUserData(res.accessToken, res.refreshToken, dispatch);
        //console.log('set works');
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
      <h1>Login</h1>
      <h4>You can login to your account here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="current-password">Password</label>
          <input
            type="password"
            id="current-password"
            min="6"
            autoComplete="on"
            required
          />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <NavLink className={classes.button} to="/register">
            Register
          </NavLink>
        </div>
      </form>
    </section>
  );
};

export default LoginForm;
