import classes from "./AuthForm.module.css";

const RegisterForm = (props) => {
  return (
    <section className={classes.auth}>
      <h1>Register</h1>
      <h4>You can create a new account here.</h4>
      <br />
      <form onSubmit={props.submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">E-Mail</label>
          <input type="email" id="email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="current-password">Password</label>
          <input type="password" id="current-password" min="6" />
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
