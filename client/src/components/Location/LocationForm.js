import { useRef } from "react";
import { useDispatch } from "react-redux";

import Dropdown from "../UI/Dropdown";

import { cartActions } from "../../store/cart-slice";

import { useNavigate } from "react-router-dom";

import classes from "./LocationForm.module.css";

const DUMMY_CITIES = [
  {
    id: "c1",
    country: "Lietuva",
    city: "Kaunas",
    address: "First st. 32",
  },
  {
    id: "c2",
    country: "Lietuva",
    city: "Vilnius",
    address: "Second st. 39",
  },
  {
    id: "c3",
    country: "Lietuva",
    city: "Klaipeda",
    address: "First st. 31",
  },
];

const LocationForm = (props) => {
  const dispatch = useDispatch();
  const selectRef = useRef();
  var navigate = useNavigate();

  const onChangeHandler = () => {
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
      <Dropdown selectRef={selectRef} label="Restaurants" data={DUMMY_CITIES} />
      <div className={classes.actions}>
        <button onClick={onChangeHandler} type="submit">
          Select restaurant
        </button>
      </div>
    </section>
  );
};

export default LocationForm;