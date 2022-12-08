import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenu, updateMenu } from "../../services/menu.service";
import { getUserData } from "../../storage/auth.storage";
import ErrorMessageSmall from "../UI/ErrorMessageSmall";
import Loading from "../UI/Loading";
import classes from "./EditMenu.module.css";

const EditMenu = (props) => {
  const { locationId, menuId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const nameRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/", { replace: true });
    }

    getMenu(locationId, menuId)
      .then((res) => {
        nameRef.current.value = res.name;
        imageRef.current.value = res.image;
        descriptionRef.current.value = res.description;
        setError(null);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
        navigate("/", { replace: true });
      })
      .finally(() => setIsLoading(false));
  }, [locationId, menuId, navigate]);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const image = event.target.image.value;
    const description = event.target.description.value;

    updateMenu(locationId, menuId, name, image, description)
      .then((res) => {
        setError(null);
        navigate(`/locations/${locationId}/menus`, { replace: true });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      });
  };

  return (
    <section className={classes.menus}>
      <h1>Edit menu</h1>
      <h4>You can edit menu here.</h4>
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
        {error && <ErrorMessageSmall>{error}</ErrorMessageSmall>}
        <div className={classes.actions}>
          <button type="submit">Edit menu</button>
        </div>
      </form>
    </section>
  );
};

export default EditMenu;
