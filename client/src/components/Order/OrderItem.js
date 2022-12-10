import classes from './OrderItem.module.css';

import Button from '../UI/Button';
import React from 'react';
import OrderDish from './OrderDish';

const OrderItem = (props) => {
    const onClickHandler = (event) => {
        props.onDelete(props.id);
    };

    return (
        <div className={classes.orderitem} >
            <b>Completed: </b><span>{props.order.completed ? "Yes" : "No"}</span><br />
            <b>Paid: </b><span>{props.order.paid ? "Yes" : "No"}</span><br />
            {props.order?.dishes?.map((dish) => <OrderDish id={dish._id} key={dish._id} name={dish.name}/>)}
            <Button onClick={onClickHandler}>Remove order</Button>
        </div>
    );
};

export default OrderItem;