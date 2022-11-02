const express = require("express");
const router = express.Router();
const Location = require("../models/Location");
const Menu = require("../models/Menu");

const authorization = require("../middleware/authorization");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (err) {
    res.status(404).json({ message: err });
  }
});

router.post("/", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.country) {
    return res.status(400).json({ message: "Field country is required!" });
  }

  if (!req.body.city) {
    return res.status(400).json({ message: "Field city is required!" });
  }

  if (!req.body.address) {
    return res.status(400).json({ message: "Field address is required!" });
  }

  const location = new Location({
    country: req.body.country,
    city: req.body.city,
    address: req.body.address,
  });

  try {
    const savedLocation = await location.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/:locationId", async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location)
      return res
        .status(404)
        .json({ message: "Location with this ID doesn't exist!" });
        
    res.status(200).json(location);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/:locationId", authorization.authenticateTokenAdmin, async (req, res) => {
  try {
    const location = await Location.findById(req.params.locationId);
    if (!location)
      return res
        .status(404)
        .json({ message: "Location with this ID doesn't exist!" });

    const removedLocation = await Location.deleteOne({
      _id: req.params.locationId,
    });
    res.status(200).json(removedLocation);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.patch("/:locationId", authorization.authenticateTokenAdmin, async (req, res) => {
  if (!req.body.country) {
    return res.status(400).json({ message: "Field country is required!" });
  }

  if (!req.body.city) {
    return res.status(400).json({ message: "Field city is required!" });
  }

  if (!req.body.address) {
    return res.status(400).json({ message: "Field address is required!" });
  }

  try {
    const location = await Location.findById(req.params.locationId);
    if (!location)
      return res
        .status(404)
        .json({ message: "Location with this ID doesn't exist!" });

    const updatedLocation = await Location.findByIdAndUpdate(req.params.locationId, {
      country: req.body.country,
      city: req.body.city,
      address: req.body.address,
    });
    res.status(200).json(updatedLocation);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
