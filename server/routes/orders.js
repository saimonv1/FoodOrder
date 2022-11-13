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
  if (!req.body.dishes) {
    return res.status(400).json({ message: "Field dishes is required!" });
  }

  const order = new Order({
    user: req.params.userId,
    dishes: req.body.dishes,
    paid: false,
    completed: false,
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
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("dishes");
    if (!order)
      return res
        .status(404)
        .json({ message: "Order with this ID doesn't exist!" });

    if (order.user.id != req.params.userId) {
      return res.status(403).json("Forbidden");
    }
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

    if (order.user.id != req.params.userId) {
      return res.status(403).json("Forbidden");
    }
    const removedOrder = await Order.deleteOne({
      _id: req.params.orderId,
    });
    res.status(200).json(removedOrder);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:orderId", async (req, res) => {
  if (!req.body.dishes) {
    return res.status(400).json({ message: "Field dishes is required!" });
  }

  if (!req.body.paid) {
    return res.status(400).json({ message: "Field paid is required!" });
  }

  if (!req.body.completed) {
    return res.status(400).json({ message: "Field completed is required!" });
  }

  try {
    const order = await Order.findById(req.params.orderId);
    if (order.user.id != req.params.userId) {
      return res.status(403).json("Forbidden");
    }
    if (!order)
      return res
        .status(404)
        .json({ message: "Order with this ID doesn't exist!" });

    const updatedOrder = await Order.findByIdAndUpdate(req.params.orderId, {
      user: req.params.userId,
      dishes: req.body.dishes,
    });
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

module.exports = router;
