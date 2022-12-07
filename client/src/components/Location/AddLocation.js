import { useNavigate } from "react-router-dom";
import { addLocation } from "../../services/location.service";
import classes from "./AddLocation.module.css";

const AddLocation = (props) => {
    const navigate = useNavigate();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const country = event.target.country.value;
        const city = event.target.city.value;
        const address = event.target.address.value;

        addLocation(country, city, address)
        .then((res) => {
            console.log(res);
            navigate("/");
        })
        .catch((e) => {
            console.log(e);
        });
    };

  return (
    <section className={classes.auth}>
      <h1>Add location</h1>
      <h4>You can add location here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
          />
        </div>
        <div className={classes.actions}>
          <button type="submit">Add location</button>
        </div>
      </form>
    </section>
  );
};

export default AddLocation;
