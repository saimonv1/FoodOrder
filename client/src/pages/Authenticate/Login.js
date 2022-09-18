import LoginForm from "../../components/Authenticate/LoginForm";

const Login = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <LoginForm submitHandler={submitHandler} />
  );
};

export default Login;
