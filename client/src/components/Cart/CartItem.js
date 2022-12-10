import classes from "./CartItem.module.css";

import Button from "../UI/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartItem = (props) => {
    const dispatch = useDispatch();

  const onRemoveHandler = (event) => {
    dispatch(
        cartActions.removeDish({
          dish: props.dish,
        })
      );
  };

  return (
    <div className={classes.cartitem}>
      <h3>{props.name}</h3>
      <img src={props.image} alt={props.name} />
      <p>{props.description}</p>
      <p>{props.price}€</p>
      <p></p>
      <Button onClick={onRemoveHandler}>Remove</Button>
    </div>
  );
};

export default CartItem;
