import classes from './UserItem.module.css';

import Button from '../UI/Button';

const UserItem = (props) => {
    const onChangeRoleHandler = (event) => {
        props.onChangeRole(props.id, props.email);
    };

    return (
        <div className={classes.useritem} >
            <h2>{props.email}</h2>
            <h2>{props.userName}</h2>
            <h3>Role: {props.role}</h3>
            <br />
            <b>Join date:</b><p>{new Date(props.joinDate).toUTCString()}</p>
            <b>Last join date:</b><p>{new Date(props.lastJoinDate).toUTCString()}</p>
            <p></p>
            <Button onClick={onChangeRoleHandler}>Change role</Button>
        </div>
    );
};

export default UserItem;