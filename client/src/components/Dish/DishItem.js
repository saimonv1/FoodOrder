import classes from "./DishItem.module.css";

const DishItem = (props) => {
  return (
    <div className={classes.dishitem}>
      <h3>{props.name}</h3>
      <img src={props.image} alt={props.name} />
      <p>{props.description}</p>
      <p>${props.price}</p>
      <p></p>
    </div>
  );
};

export default DishItem;
