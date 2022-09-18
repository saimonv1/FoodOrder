import classes from './Dropdown.module.css';

const Dropdown = (props) => {
    return (
        <div className={classes.control}>
            <label htmlFor='dropdown'>{props.label}</label>
            <select id='dropdown' value={props.value} onChange={props.onChange}>
                {props.data.map((option) => <option key={option.id} value={option.name}>{option.name}</option>)}
            </select>
        </div>
    );
};

export default Dropdown;