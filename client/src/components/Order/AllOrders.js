import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import { deleteOrder, getOrders } from "../../services/order.service";
import { getUserId } from "../../services/auth.service";
import OrderItem from "./OrderItem";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const AllOrders = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const openModalHandler = (id) => {
    setOpenModal(true);
    setDeleteId(id);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setDeleteId();
  };

  const onDeleteHandler = () => {
    const user = getUserData();

    getUserId(user.username)
      .then((res) => {
        deleteOrder(res, deleteId)
          .then((res2) => {
            console.log(res2);
            setOpenModal(false);
          })
          .catch((e) => {
            console.log(e?.response?.data?.message);
          });
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      });
  };

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
  }, [navigate, openModal]);

  return (
    <Card>
      <h1>Orders</h1>
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        orders?.map((order) => {
          return (
            <OrderItem
              id={order._id}
              key={order._id}
              order={order}
              onDelete={openModalHandler}
            />
          );
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Are you sure you want to delete order ({deleteId})?</p>
          <Button onClick={onDeleteHandler}>Delete</Button>
        </Modal>
      )}
    </Card>
  );
};

export default AllOrders;
