const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");
const Event = require("../models/Event");
const mongoose = require("mongoose");

// POST /api/reservations - book seats
router.post("/", async (req, res) => {
  try {
    const { eventId, userId, seats } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId))
      return res.status(400).json({ message: "Invalid event ID" });

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.seats < seats) {
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Reduce available seats
    event.seats -= seats;
    await event.save();

    // Create reservation
    const reservation = new Reservation({
      event: eventId,
      user: userId || null, // can later link real user
      seats
    });

    const savedReservation = await reservation.save();
    res.status(201).json(savedReservation);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
