import classes from './Button.module.css';

const Button = (props) => {
    console.log(props.activated);
    return (
        <button className={`${classes.button} ${props.activated ? classes.activated : ""}`} onClick={props.onClick}>{props.children}</button>
    );
};

export default Button;