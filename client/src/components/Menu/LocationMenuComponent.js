import { useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import Loading from "../UI/Loading";
import { useParams } from "react-router-dom";
import { getMenus } from "../../services/menu.service";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";

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
    <Card>
      <h1>Menus</h1>
      {isLoading && <Loading />}
      {!isLoading && !error &&
      menus?.map((menu) => {
        return (
          <MenuItem id={menu._id} key={menu._id} name={menu.name} description={menu.description} />
        );
      })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default LocationMenuComponent;
