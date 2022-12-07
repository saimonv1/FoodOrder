import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import Card from "../UI/Card";

const Panel = (props) => {
    const navigate = useNavigate();

    const onAllLocationsHandler = (event) => {
        navigate("/locations");
    };

  return (
    <Card>
      <h1>Admin panel</h1>
      <Button onClick={onAllLocationsHandler}>All locations</Button>
    </Card>
  );
};

export default Panel;
