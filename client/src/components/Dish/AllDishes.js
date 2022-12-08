import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Loading from "../UI/Loading";
import { getDishes } from "../../services/dish.service";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import DishItem from "./DishItem";
import Button from "../UI/Button";

const AllDishes = (props) => {
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
  
  const onAddHandler = (event) => {

  };

  return (
    <Card>
      <h1>Dishes</h1>
      <div
        style={{
          position: "absolute",
          margin: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={onAddHandler}>Add new dish</Button>
      </div>
      {isLoading && <Loading />}
      {!isLoading && !error &&
        dishes?.map((dish) => {
          return (
            <DishItem
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

export default AllDishes;
