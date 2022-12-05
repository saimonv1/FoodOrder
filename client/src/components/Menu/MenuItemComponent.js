import classes from './MenuItemComponent.module.css';

import Button from '../UI/Button';
import { useNavigate, useParams } from 'react-router-dom';

const MenuItemComponent = (props) => {
    var navigate = useNavigate();
    const params = useParams();

    const { locationId } = params;

    const onClickHandler = (event) => {
        navigate("/location/" + locationId + "/menu/" + props.id + "/dish/", { replace: true });
    };

    return (
        <div className={classes.menuitem} >
            <h3>{props.name}</h3>
            <img src={props.image} alt={props.name} />
            <p>{props.description}</p>
            <p></p>
            <Button onClick={onClickHandler}>Check it out!</Button>
        </div>
    );
};

export default MenuItemComponent;