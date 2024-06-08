const express = require("express");
const bookingRouter = express.Router();
const BookingModel = require("../models/Booking.js");
const { authenticateUser } = require("../middlewares/auth.middleware");
const {
  newBooking,
  getBookings,
} = require("../controllers/booking.controllers.js");

bookingRouter.post("/bookings", authenticateUser, newBooking);

bookingRouter.get("/bookings", authenticateUser, getBookings);

module.exports = bookingRouter;
