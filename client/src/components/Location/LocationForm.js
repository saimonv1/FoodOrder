import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Dropdown from "../UI/Dropdown";

import { cartActions } from "../../store/cart-slice";

import { useNavigate } from "react-router-dom";

import classes from "./LocationForm.module.css";
import Loading from "../UI/Loading";

const LocationForm = () => {
  const dispatch = useDispatch();
  const selectRef = useRef();
  var navigate = useNavigate();

  const [locations, setLocations] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const api = useSelector(state => state.app.url);

  useEffect(() => {
    fetch(api + "/locations/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLocations(res);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [api]);

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
      {!isLoading && <Dropdown selectRef={selectRef} label="Restaurants" data={locations} />}
      <div className={classes.actions}>
        <button onClick={onChangeHandler} type="submit">
          Select restaurant
        </button>
      </div>
    </section>
  );
};

export default LocationForm;
