import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import { cartActions } from "../../store/cart-slice";
import Button from "../UI/Button";
import classes from "./DishItem.module.css";

const DishItem = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activated, setActivated] = useState(false);

  const user = getUserData();

  const { locationId, menuId } = useParams();

  const onOrderHandler = (event) => {
    dispatch(
      cartActions.addDish({
        dish: props.dish,
      })
    );
      setActivated(true);
      setTimeout(() => {
        setActivated(false);
      }, 250);
  };

  const onEditHandler = (event) => {
    navigate(`/locations/${locationId}/menus/${menuId}/editDish/${props.id}`);
  };

  const onDeleteHandler = (event) => {
    props.onDelete(props.id, props.name);
  };

  return (
    <div className={classes.dishitem}>
      <h3>{props.name}</h3>
      <img src={props.image} alt={props.name} />
      <p>{props.description}</p>
      <p>{props.price}€</p>
      <p></p>
      {user && <React.Fragment><Button activated={activated} onClick={onOrderHandler}>Order</Button><br /></React.Fragment>}
      {user?.role === "Admin" && (
        <React.Fragment>
          <Button onClick={onEditHandler}>Edit</Button>
          <br />
          <Button onClick={onDeleteHandler}>Delete</Button>
          <br />
        </React.Fragment>
      )}
    </div>
  );
};

export default DishItem;
