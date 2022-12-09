import classes from './OrderItem.module.css';

import Button from '../UI/Button';
import React from 'react';

const OrderItem = (props) => {
    const onClickHandler = (event) => {
        
    };

    return (
        <div className={classes.orderitem} >
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} />
            <p>{props.description}</p>
            <p></p>
            {props.order?.dishes?.map((dish) => <OrderItem id={dish._id} key={dish._id} name={dish.name}/>)}
            <Button onClick={onClickHandler}>Check dishes</Button>
        </div>
    );
};

export default OrderItem;