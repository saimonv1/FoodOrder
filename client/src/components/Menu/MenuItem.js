import classes from './MenuItem.module.css';

import Button from '../UI/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../storage/auth.storage';
import React from 'react';

const MenuItem = (props) => {
    var navigate = useNavigate();
    const params = useParams();

    const user = getUserData();

    const { locationId } = params;

    const onClickHandler = (event) => {
        navigate(`/locations/${locationId}/menus/${props.id}/dishes`, { replace: true });
    };

    const onEditHandler = (event) => {
        navigate(`/locations/${locationId}/editMenu/${props.id}`, { replace: true });
    };

    const onDeleteHandler = (event) => {
        props.onDelete(props.id);
    };

    return (
        <div className={classes.menuitem} >
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} />
            <p>{props.description}</p>
            <p></p>
            {user?.role === "Admin" && (
                <React.Fragment>
                <Button onClick={onEditHandler}>Edit</Button>
                <br />
                <Button onClick={onDeleteHandler}>Delete</Button>
                <br />
                </React.Fragment>
            )}
            
            <Button onClick={onClickHandler}>Check dishes</Button>
        </div>
    );
};

export default MenuItem;