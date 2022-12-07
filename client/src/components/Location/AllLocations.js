import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import { deleteLocation, getLocations } from "../../services/location.service";
import LocationItem from "./LocationItem";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";

const AllLocations = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState();
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
    deleteLocation(deleteId)
      .then((res) => {
        console.log(res);
        setOpenModal(false);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      });
  };

  const onAddHandler = () => {
    navigate("/addLocation");
  };

  useEffect(() => {
    getLocations()
      .then((res) => {
        setLocations(res);
        setError(null);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        setError(e?.response?.data?.message || "Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [openModal]);

  return (
    <Card>
      <h1>Locations</h1>
      <br />
      <div
        style={{
          position: "absolute",
          margin: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={onAddHandler}>Add new location</Button>
      </div>
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        locations?.map((location) => {
          return (
            <LocationItem
              id={location._id}
              key={location._id}
              country={location.country}
              city={location.city}
              address={location.address}
              onDelete={openModalHandler}
            />
          );
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Do you want to delete?</p>
          <Button onClick={onDeleteHandler}>Delete</Button>
        </Modal>
      )}
    </Card>
  );
};

export default AllLocations;
