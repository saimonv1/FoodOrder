import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Loading from "../UI/Loading";
import { deleteDish, getDishes } from "../../services/dish.service";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import DishItem from "./DishItem";
import Button from "../UI/Button";
import { getUserData } from "../../storage/auth.storage";
import Modal from "../UI/Modal";

const AllDishes = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dishes, setDishes] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  const user = getUserData();

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
  }, [openModal, locationId, menuId]);

  const onAddHandler = (event) => {
    navigate(`/locations/${locationId}/menus/${menuId}/addDish`);
  };

  const openModalHandler = (id, name) => {
    setOpenModal(true);
    setDeleteId(id);
    setDeleteItem(name);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setDeleteId();
    setDeleteItem();
  };

  const onDeleteHandler = () => {
    deleteDish(locationId, menuId, deleteId)
      .then((res) => {
        console.log(res);
        setOpenModal(false);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      });
  };

  return (
    <Card>
      <h1>Dishes</h1>
      {user?.role === "Admin" && (
        <React.Fragment>
          <br />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Button onClick={onAddHandler}>Add new dish</Button>
          </div>
        </React.Fragment>
      )}
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        dishes?.map((dish) => {
          return (
            <DishItem
              id={dish._id}
              key={dish._id}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              price={dish.price["$numberDecimal"]}
              dish={dish}
              onDelete={openModalHandler}
            />
          );
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Do you want to delete dish "{deleteItem}"?</p>
          <Button onClick={onDeleteHandler}>Delete</Button>
        </Modal>
      )}
    </Card>
  );
};

export default AllDishes;
