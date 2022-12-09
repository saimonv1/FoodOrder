import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import { getOrders } from "../../services/order.service";
import { getUserId } from "../../services/auth.service";
import OrderItem from "./OrderItem";

const AllOrders = () => {
  const navigate = useNavigate();

  const user = getUserData();

  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const onDeleteHandler = () => {};

  const onAddHandler = () => {};

  useEffect(() => {
    const user = getUserData();
    if (!user) {
      navigate("/", { replace: true });
    }

    getUserId(user.username)
      .then((res) => {
        const userId = res;
        getOrders(userId)
          .then((res2) => {
            setOrders(res2);
            console.log(res2);
            setError(null);
          })
          .catch((e) => {
            console.log(e?.response?.data?.message);
            setError(e?.response?.data?.message || "Error");
          });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Card>
      <h1>Orders</h1>
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        orders?.map((order) => {
          return <OrderItem id={order._id} key={order._id} order={order} />;
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
    </Card>
  );
};

export default AllOrders;
