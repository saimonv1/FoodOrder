import RegisterForm from "../../components/Authenticate/RegisterForm";

const Register = (props) => {
    const submitHandler = (event) => {
        event.preventDefault();

    }

    return (
        <RegisterForm onSubmit={submitHandler} />
    );
}

export default Register;