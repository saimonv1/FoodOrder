const express = require("express");
const Order = require("../models/Order");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({ message: "Field user is required!" });
  }

  if (!req.body.dishes) {
    return res.status(400).json({ message: "Field dishes is required!" });
  }

  const order = new Order({
    user: req.body.user,
    dishes: req.body.dishes
  });

  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order)
      return res
        .status(404)
        .json({ message: "Order with this ID doesn't exist!" });

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order)
      return res
        .status(404)
        .json({ message: "Order with this ID doesn't exist!" });

    const removedOrder = await Order.deleteOne({
      _id: req.params.orderId,
    });
    res.status(200).json(removedOrder);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:orderId", async (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({ message: "Field user is required!" });
  }

  if (!req.body.dishes) {
    return res.status(400).json({ message: "Field dishes is required!" });
  }

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order)
      return res
        .status(404)
        .json({ message: "Order with this ID doesn't exist!" });

    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {
      user: req.body.user,
      dishes: req.body.dishes
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
