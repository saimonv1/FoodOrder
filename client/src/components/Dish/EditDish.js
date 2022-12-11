import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDish, updateDish } from "../../services/dish.service";
import { getUserData } from "../../storage/auth.storage";
import BackButton from "../UI/BackButton";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import Loading from "../UI/Loading";
import classes from "./EditDish.module.css";

const EditDish = (props) => {
  const { locationId, menuId, dishId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/", { replace: true });
    }

    getDish(locationId, menuId, dishId)
      .then((res) => {
        nameRef.current.value = res.name;
        imageRef.current.value = res.image;
        descriptionRef.current.value = res.description;
        priceRef.current.value = res.price["$numberDecimal"];
        setError(null);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
        navigate("/", { replace: true });
      })
      .finally(() => setIsLoading(false));
  }, [locationId, menuId, dishId, navigate]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const description = event.target.description.value;
    const price = event.target.price.value;

    updateDish(locationId, menuId, dishId, name, image, description, price)
      .then((res) => {
        setError(null);
        navigate(`/locations/${locationId}/menus/${menuId}/dishes`, { replace: true });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  return (
    <section className={classes.dishes}>
      <BackButton />
      <h1>Edit dish</h1>
      <h4>You can edit dish here.</h4>
      <br />
      {isLoading && <Loading />}
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input ref={nameRef} type="text" id="name" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image (url)</label>
          <input ref={imageRef} type="text" id="image" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input ref={descriptionRef} type="text" id="description" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="price">Price</label>
          <input ref={priceRef} type="number" step="0.01" min="0" id="price" required />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Edit dish</button>
        </div>
      </form>
    </section>
  );
};

export default EditDish;
