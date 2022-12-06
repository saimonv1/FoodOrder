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
          <label htmlFor="username">Username</label>
          <input type="text" id="username" min="3" autoComplete="on" />
        </div>
        <div className={classes.control}>
          <label htmlFor="new-password">Password</label>
          <input type="password" id="new-password" min="6" autoComplete="on" />
        </div>
        <div className={classes.actions}>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
