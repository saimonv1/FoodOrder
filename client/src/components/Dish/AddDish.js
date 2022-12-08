import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addDish } from "../../services/dish.service";
import { getUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./AddDish.module.css";

const AddDish = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { locationId, menuId } = useParams();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const description = event.target.description.value;

    addDish(locationId, menuId, name, image, description)
      .then((res) => {
        console.log(res);
        setError(null);
        navigate(`/locations/${locationId}/menus`, { replace: true });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <section className={classes.dish}>
      <h1>Add menu</h1>
      <h4>You can add menu here.</h4>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image (url)</label>
          <input type="text" id="image" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <input type="text" id="description" required />
        </div>
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Add menu</button>
        </div>
      </form>
    </section>
  );
};

export default AddDish;
