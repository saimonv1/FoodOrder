import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";
import { getUserData } from "../../storage/auth.storage";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Modal from "../UI/Modal";

const Logout = (props) => {
  const dispatch = useDispatch();

  const user = getUserData();

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = (id) => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const onLogoutHandler = async () => {
    logout(user.refreshToken, dispatch)
      .then((res) => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
      })
      .finally(() => {
        setOpenModal(false);
        navigate("/", { replace: true });
      });
  };

  return (
    <Card>
      <h1>Do you want to log out?</h1>
      <br />
      <div
        style={{
          position: "absolute",
          margin: "0",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button onClick={openModalHandler}>Logout</Button>
      </div>
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>Are you sure you want to logout?</p>
          <Button onClick={onLogoutHandler}>Logout</Button>
        </Modal>
      )}
    </Card>
  );
};

export default Logout;
