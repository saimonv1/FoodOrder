import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMenu } from "../../services/menu.service";
import { getUserData } from "../../storage/auth.storage";
import BackButton from "../UI/BackButton";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import classes from "./AddMenu.module.css";

const AddMenu = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const { locationId } = useParams();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const description = event.target.description.value;

    addMenu(locationId, name, image, description)
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
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <section className={classes.menu}>
      <BackButton />
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

export default AddMenu;
