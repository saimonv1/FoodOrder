import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../storage/auth.storage";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import Button from "../UI/Button";
import { getUserId } from "../../services/auth.service";
import { addOrder } from "../../services/order.service";
import Loading from "../UI/Loading";
import ErrorMessage from "../UI/ErrorMessage";
import { cartActions } from "../../store/cart-slice";
import Modal from "../UI/Modal";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);


  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartPrice = useSelector((state) => state.cart.totalPrice);

  const openModalHandler = (message) => {
    setOpenModal(true);
    setModalMessage(message);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
    setModalMessage(null);
  };

  const onSaveHandler = (event) => {
    setIsLoading(true);
    const user = getUserData();
    getUserId(user.username)
    .then((res) => {
        addOrder(res, cartItems)
        .then((res2) => {
            dispatch(cartActions.clearCart());
            openModalHandler('Order was created from cart items');
            navigate('/orders');
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
    .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const user = getUserData();
    if (!user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <Card>
      <h1>Cart</h1>
      {cartItems?.map((dish) => {
          return (
            <CartItem
              id={dish._id}
              key={dish._id}
              name={dish.name}
              image={dish.image}
              description={dish.description}
              price={dish.price["$numberDecimal"]}
              dish={dish}
            />
          );
        })}
        {cartPrice > 0 && <p>{cartPrice}€</p>}
        {cartItems.length === 0 && "Cart is empty!"}
      {cartItems.length > 0 && <Button onClick={onSaveHandler}>Order</Button>}
      {isLoading && <Loading />}
      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {openModal && (
        <Modal onClose={closeModalHandler}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </Card>
  );
};

export default Cart;
