import classes from './MenuDishesItemComponent.module.css';

const MenuDishesItemComponent = (props) => {
    return (
        <div className={classes.menuitem} >
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} />
            <p>{props.description}</p>
            <p>${props.price}</p>
            <p></p>
        </div>
    );
};

export default MenuDishesItemComponent;