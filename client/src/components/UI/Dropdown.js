import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  return (
    <div className={classes.control}>
      <label htmlFor="dropdown">{props.label}</label>
      <select
        ref={props.selectRef}
        id="dropdown"
      >
        {props.data?.map((option) => {
          const locationValue =
            option.address + ", " + option.city + ", " + option.country;
          return (
            <option itemID={option._id} key={option._id} label={locationValue} value={option._id} />
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
