import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./MenuDishesComponent.module.css";

import Loading from "../UI/Loading";
import MenuDishesItemComponent from "./MenuDishesItemComponent";

const MenuDishesComponent = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dishes, setDishes] = useState();

  const api = useSelector((state) => state.app.url);

  const params = useParams();
  const { locationId, menuId } = params;

  let url;
  if (locationId) {
    url = api + "/locations/" + locationId + "/menus/" + menuId + "/dishes/";
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
          setDishes(res);
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [url]);
  return (
    <div className={classes.menu}>
      <h1>Menu</h1>
      {isLoading && <Loading />}
      {!isLoading &&
        dishes?.map((dish) => {
          return (
            <MenuDishesItemComponent
              key={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price["$numberDecimal"]}
            />
          );
        })}
    </div>
  );
};

export default MenuDishesComponent;
