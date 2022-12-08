import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import Button from "../UI/Button";
import Card from "../UI/Card";

const Panel = (props) => {
  const navigate = useNavigate();

  const onAllLocationsHandler = (event) => {
    navigate("/locations");
  };

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <Card>
      <h1>Admin panel</h1>
      <div
        style={{
          position: "absolute",
          margin: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={onAllLocationsHandler}>All locations</Button>
      </div>
    </Card>
  );
};

export default Panel;
