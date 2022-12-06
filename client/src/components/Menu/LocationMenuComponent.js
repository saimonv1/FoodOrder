import { useEffect, useState } from "react";
import classes from "./LocationMenuComponent.module.css";
import MenuItemComponent from "./MenuItemComponent";
import Loading from "../UI/Loading";
import { useParams } from "react-router-dom";
import { getMenus } from "../../utils/api";
import ErrorMessage from "../UI/ErrorMessage";

const LocationMenuComponent = () => {
  const [menus, setMenus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const { locationId } = params;

  useEffect(() => {
    if(locationId) {
      getMenus(locationId)
      .then((res) => {
        setMenus(res);
        setError(null);
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [locationId]);

  return (
    <div className={classes.location}>
      <h1>Menus</h1>
      {isLoading && <Loading />}
      {!isLoading && !error &&
      menus?.map((menu) => {
        return (
          <MenuItemComponent id={menu._id} key={menu._id} name={menu.name} description={menu.description} />
        );
      })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default LocationMenuComponent;
