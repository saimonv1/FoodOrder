import { useNavigate } from "react-router-dom";
import classes from "./BackButton.module.css";

const BackButton = (props) => {
  const navigate = useNavigate();

  const onClickHandler = (event) => {
    navigate(-1);
  };

  return (
    <button className={classes.button} onClick={onClickHandler}>
      ◄
    </button>
  );
};

export default BackButton;
