import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateLocation, getLocation } from "../../services/location.service";
import { getUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./EditLocation.module.css";

const EditLocation = (props) => {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const countryRef = useRef();
  const cityRef = useRef();
  const addressRef = useRef();

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/");
    }

    getLocation(locationId)
      .then((res) => {
        countryRef.current.value = res.country;
        cityRef.current.value = res.city;
        addressRef.current.value = res.address;
        setError(null);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
        navigate("/");
      });
  }, [locationId, navigate]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const country = event.target.country.value;
    const city = event.target.city.value;
    const address = event.target.address.value;

    updateLocation(locationId, country, city, address)
      .then((res) => {
        setError(null);
        navigate("/locations");
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  return (
    <section className={classes.locations}>
      <h1>Edit location</h1>
      <h4>You can edit location here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="country">Country</label>
          <input ref={countryRef} type="text" id="country" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input ref={cityRef} type="text" id="city" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input ref={addressRef} type="text" id="address" required />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Edit location</button>
        </div>
      </form>
    </section>
  );
};

export default EditLocation;
