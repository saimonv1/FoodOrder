import classes from "./AuthForm.module.css";

const LoginForm = (props) => {
  return (
    <section className={classes.auth}>
        <h1>Login</h1>
        <h4>You can login to your account here.</h4>
        <br />
        <form onSubmit={props.submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">E-Mail</label>
            <input type="email" id="email" />
          </div>
          <div className={classes.control}>
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" min="6" />
          </div>
          <div className={classes.actions}>
            <button type="submit">Login</button>
          </div>
        </form>
    </section>
  );
};

export default LoginForm;
