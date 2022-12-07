import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import Dropdown from "../UI/Dropdown";

import { cartActions } from "../../store/cart-slice";

import { useNavigate } from "react-router-dom";

import classes from "./LocationForm.module.css";
import Loading from "../UI/Loading";
import { getLocations } from "../../services/location.service";
import ErrorMessage from "../UI/ErrorMessage";

const LocationForm = () => {
  const dispatch = useDispatch();
  const selectRef = useRef();
  var navigate = useNavigate();

  const [locations, setLocations] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res);
        setError(null);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onChangeHandler = () => {
    //console.log(selectRef.current.value);
    dispatch(
      cartActions.changeLocation({
        location: selectRef.current.value,
      })
    );
    navigate("/", { replace: true });
  };

  return (
    <section className={classes.location}>
      <h1>Restaurant</h1>
      <h4>Choose your location.</h4>

      <br />
      {isLoading && <Loading />}
      {!isLoading && !error && (
        <Dropdown selectRef={selectRef} label="Restaurants" data={locations} />
      )}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      <div className={classes.actions}>
        <button onClick={onChangeHandler} type="submit">
          Select restaurant
        </button>
      </div>
    </section>
  );
};

export default LocationForm;
