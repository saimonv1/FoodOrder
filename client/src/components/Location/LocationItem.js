import classes from './LocationItem.module.css';

import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const LocationItem = (props) => {
    var navigate = useNavigate();

    const onEditHandler = (event) => {
        navigate(`/editLocation/${props.id}`);
    };

    const onDeleteHandler = (event) => {
        props.onDelete(props.id);
    };

    const onMenuHandler = (event) => {
        navigate(`/locations/${props.id}/menus`);
    };

    return (
        <div className={classes.locationitem} >
            <h2>{props.country}</h2>
            <h3>{props.city}</h3>
            <b>{props.address}</b>
            <p></p>
            <Button onClick={onEditHandler}>Edit</Button>
            <br />
            <Button onClick={onDeleteHandler}>Delete</Button>
            <br />
            <Button onClick={onMenuHandler}>Check menus</Button>
        </div>
    );
};

export default LocationItem;