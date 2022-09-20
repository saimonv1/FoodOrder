import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  return (
    <div className={classes.control}>
      <label htmlFor="dropdown">{props.label}</label>
      <select
        ref={props.selectRef}
        id="dropdown"
        value={props.value}
        onChange={props.onChange}
      >
        {props.data.map((option) => {
          const locationValue =
            option.address + ", " + option.city + ", " + option.country;
          return (
            <option itemID={option.id} key={option.id} value={locationValue}>
              {locationValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
