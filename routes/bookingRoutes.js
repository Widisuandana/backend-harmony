const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateToken } = require('../middleware/auth');

router.post('/', authenticateToken, bookingController.createBooking);
router.get('/user', authenticateToken, bookingController.getUserBookings);
router.get('/:id', authenticateToken, bookingController.getBookingById);
router.put('/:id/cancel', authenticateToken, bookingController.cancelBooking);

module.exports = router;