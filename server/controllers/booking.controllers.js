const BookingModel = require("../models/Booking");

const getBookings = async (req, res) => {
  const { id } = req.userData;

  try {
    const bookings = await BookingModel.find({ user: id }).populate("place");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const newBooking = async (req, res) => {
  const { id } = req.userData;
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;

  try {
    
    const booking = await BookingModel.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: id,
    });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getBookings, newBooking };   