import { useEffect, useState } from "react";
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

  const [menus, setMenus] = useState();
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
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/");
    }

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
      <br />
      <div
        style={{
          position: "absolute",
          margin: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={onAddHandler}>Add new menu</Button>
      </div>
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
          <p>Do you want to delete menu ({deleteId})?</p>
          <Button onClick={onDeleteHandler}>Delete</Button>
        </Modal>
      )}
    </Card>
  );
};

export default AllMenus;
