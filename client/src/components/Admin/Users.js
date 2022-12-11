import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { getUserData } from "../../storage/auth.storage";
import Modal from "../UI/Modal";
import { getUsers, setUserRole } from "../../services/admin.service";
import UserItem from "./UserItem";

import classes from "./Users.module.css";

const Users = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);

  const selectRef = useRef();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState();
  const [editEmail, setEditEmail] = useState();

  useEffect(() => {
    const user = getUserData();
    if (!user || user?.role !== "Admin") {
      navigate("/", { replace: true });
    }
    getUsers()
      .then((res) => {
        setUsers(res);
        setError(null);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [openModal, navigate]);

  const openModalHandler = (id, email) => {
    setOpenModal(true);
    setEditId(id);
    setEditEmail(email);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setEditId();
    setEditEmail();
  };

  const onChangeRoleHandler = () => {
    setUserRole(editId, selectRef.current.value)
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });
  };

  return (
    <Card>
      <h1>Users</h1>
      {isLoading && <Loading />}
      {!isLoading &&
        !error &&
        users?.map((singleUser) => {
          return (
            <UserItem
              id={singleUser._id}
              key={singleUser._id}
              email={singleUser.email}
              userName={singleUser.username}
              role={singleUser.role}
              joinDate={singleUser.joinDate}
              lastJoinDate={singleUser.lastJoinDate}
              onChangeRole={openModalHandler}
            />
          );
        })}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Change user {editEmail} role:</p>
          <div className={classes.control}>
            <label htmlFor="dropdown">Roles</label>
            <select ref={selectRef} id="dropdown">
              {["User", "Admin"].map((option) => {
                return (
                  <option
                    itemID={option}
                    key={option}
                    label={option}
                    value={option}
                  />
                );
              })}
            </select>
          </div>
          <Button onClick={onChangeRoleHandler}>Change role</Button>
        </Modal>
      )}
    </Card>
  );
};

export default Users;
