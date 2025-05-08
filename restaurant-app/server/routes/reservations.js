const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { 
  createReservation, 
  getReservations, 
  getReservation, 
  updateReservation, 
  deleteReservation 
} = require('../controllers/reservationController');
const { protect } = require('../middleware/auth');

// Public route - Create reservation
router.post(
  '/', 
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').not().isEmpty(),
    check('time', 'Reservation time is required').not().isEmpty()
  ],
  createReservation
);

// Protected routes - Admin access only
router.get('/', protect, getReservations);
router.get('/:id', protect, getReservation);
router.put('/:id', protect, updateReservation);
router.delete('/:id', protect, deleteReservation);

module.exports = router;