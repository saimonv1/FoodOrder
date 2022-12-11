import React, { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useNavigate, useParams } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import MenuItem from "./MenuItem";
import { deleteMenu, getMenus } from "../../services/menu.service";

const AllMenus = () => {
  const navigate = useNavigate();

  const { locationId } = useParams();

  const user = getUserData();

  const [menus, setMenus] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

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
    deleteMenu(locationId, deleteId)
      .then((res) => {
        console.log(res);
        setOpenModal(false);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      });
  };

  const onAddHandler = () => {
    navigate(`/locations/${locationId}/addMenu`);
  };

  useEffect(() => {
    getMenus(locationId)
      .then((res) => {
        setMenus(res);
        setError(null);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [openModal, navigate, locationId]);

  return (
    <Card>
      <h1>Menus</h1>
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
            <Button onClick={onAddHandler}>Add new menu</Button>
          </div>
        </React.Fragment>
      )}
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        menus?.map((menu) => {
          return (
            <MenuItem
              id={menu._id}
              key={menu._id}
              name={menu.name}
              image={menu.image}
              description={menu.description}
              onDelete={openModalHandler}
            />
          );
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Do you want to delete menu "{deleteItem}"?</p>
          <Button onClick={onDeleteHandler}>Delete</Button>
        </Modal>
      )}
    </Card>
  );
};

export default AllMenus;
