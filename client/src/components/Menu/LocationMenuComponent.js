import { useEffect, useState } from "react";
import classes from "./LocationMenuComponent.module.css";
import MenuItemComponent from "./MenuItemComponent";
import { useSelector } from "react-redux";
import Loading from "../UI/Loading";
import { useParams } from "react-router-dom";

const LocationMenuComponent = () => {
  const [menus, setMenus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //const location = useSelector((state) => state.cart.location);
  const api = useSelector((state) => state.app.url);

  const params = useParams();
  const { locationId } = params;
  const location = locationId;

  let url;
  if (location) {
    url = api + "/locations/" + location + "/menus";
  }

  useEffect(() => {
    if (url) {
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setMenus(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [url]);

  return (
    <div className={classes.location}>
      <h1>Menus</h1>
      {isLoading && <Loading />}
      {!isLoading && 
      menus?.map((menu) => {
        return (
          <MenuItemComponent id={menu._id} key={menu._id} name={menu.name} description={menu.description} />
        );
      })}
    </div>
  );
};

export default LocationMenuComponent;
