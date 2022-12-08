import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addLocation } from "../../services/location.service";
import { getUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./AddLocation.module.css";

const AddLocation = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const country = event.target.country.value;
    const city = event.target.city.value;
    const address = event.target.address.value;

    addLocation(country, city, address)
      .then((res) => {
        console.log(res);
        setError(null);
        navigate("/locations", { replace: true });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <section className={classes.location}>
      <h1>Add location</h1>
      <h4>You can add location here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="country">Country</label>
          <input type="text" id="country" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" id="address" required />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Add location</button>
        </div>
      </form>
    </section>
  );
};

export default AddLocation;
