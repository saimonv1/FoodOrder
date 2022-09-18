import Dropdown from "../UI/Dropdown";
import classes from "./CityForm.module.css";

const DUMMY_CITIES = [
  {
    id: "c1",
    name: "Kaunas",
    country: "Lietuva",
  },
  {
    id: "c2",
    name: "Vilnius",
    country: "Lietuva",
  },
  {
    id: "c3",
    name: "Klaipeda",
    country: "Lietuva",
  },
];

const CityForm = (props) => {
  const onChangeHandler = (event) => {};

  return (
    <section className={classes.city}>
      <h1>City</h1>
      <h4>Choose your location.</h4>
      <br />
      <Dropdown label="Cities" onChange={onChangeHandler} data={DUMMY_CITIES} />
      <div className={classes.actions}>
        <button type="submit">Change city</button>
      </div>
    </section>
  );
};

export default CityForm;
