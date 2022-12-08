import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import Button from "../UI/Button";
import classes from "./DishItem.module.css";

const DishItem = (props) => {
  const navigate = useNavigate();

  const user = getUserData();

  const { locationId, menuId } = useParams();

  const onOrderHandler = (event) => {

  };

  const onEditHandler = (event) => {
    navigate(`/locations/${locationId}/menus/${menuId}/editDish/${props.id}`);
  };

  const onDeleteHandler = (event) => {
    props.onDelete(props.id);
  };

  return (
    <div className={classes.dishitem}>
      <h3>{props.name}</h3>
      <img src={props.image} alt={props.name} />
      <p>{props.description}</p>
      <p>${props.price}</p>
      <p></p>
      {user && <React.Fragment><Button onClick={onOrderHandler}>Order</Button><br /></React.Fragment>}
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
