// imports
const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

// CRUD Routes
router.get('/', bookingsController.getAllBookings);
router.post('/', bookingsController.createBooking);
router.put('/:id', bookingsController.updateBooking);

// export
module.exports = router;