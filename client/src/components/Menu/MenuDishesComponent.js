import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "../UI/Loading";
import MenuDishesItemComponent from "./MenuDishesItemComponent";
import { getDishes } from "../../services/dish.service";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";

const MenuDishesComponent = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dishes, setDishes] = useState();
  const [error, setError] = useState(null);

  const params = useParams();
  const { locationId, menuId } = params;

  useEffect(() => {
    if (locationId && menuId) {
      getDishes(locationId, menuId)
      .then((res) => {
        setDishes(res);
        setError(null);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    }
  }, [locationId, menuId]);
  
  return (
    <Card>
      <h1>Menu</h1>
      {isLoading && <Loading />}
      {!isLoading && !error &&
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
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default MenuDishesComponent;
