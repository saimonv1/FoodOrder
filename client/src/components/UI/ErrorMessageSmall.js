import classes from './ErrorMessageSmall.module.css';

const ErrorMessageSmall = (props) => {
    return <p className={classes.error}>{props.children}</p>
};

export default ErrorMessageSmall;