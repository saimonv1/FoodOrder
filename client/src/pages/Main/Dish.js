import { useParams } from "react-router-dom";
import DishComponent from "../../components/Dish/DishComponent";

const Dish = (props) => {
  const params = useParams();
  const { dishId } = params;
  return <DishComponent id={dishId} />;
};

export default Dish;
