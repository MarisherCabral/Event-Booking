const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

// Get all events
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// Get single event
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// Add new event
router.post("/", async (req, res) => {
  const { title, description, date, location, totalSeats } = req.body;
  const event = new Event({
    title,
    description,
    date,
    location,
    totalSeats,
    availableSeats: totalSeats
  });
  await event.save();
  res.json(event);
});

module.exports = router;
