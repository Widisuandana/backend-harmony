const Booking = require('../models/Booking');
const Villa = require('../models/Villa');
const moment = require('moment');

exports.createBooking = async (req, res) => {
  try {
    const { villaId, startDate, endDate } = req.body;
    const villa = await Villa.findById(villaId);
    if (!villa) return res.status(404).json({ message: 'Villa not found' });

    // Check if the villa is available for the given dates
    const conflictingBooking = await Booking.findOne({
      villa: villaId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        {
          $and: [
            { startDate: { $lte: new Date(startDate) } },
            { endDate: { $gte: new Date(endDate) } }
          ]
        }
      ]
    });

    if (conflictingBooking) {
      return res.status(400).json({ message: 'Villa is not available for the selected dates' });
    }

    const numberOfDays = moment(endDate).diff(moment(startDate), 'days');
    const totalPrice = villa.price * numberOfDays;

    const booking = new Booking({
      user: req.user.id,
      villa: villaId,
      startDate,
      endDate,
      totalPrice
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error creating booking', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('villa');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.id) return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    
    booking.status = 'cancelled';
    await booking.save();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('villa');
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};