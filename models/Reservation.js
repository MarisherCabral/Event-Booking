const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  seatsBooked: Number,
  bookingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reservation", ReservationSchema);
