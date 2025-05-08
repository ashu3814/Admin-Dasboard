const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { getReservations } = require('../controllers/reservationController');

// Only super-admin can access this route
router.get('/dashboard', protect, authorize('super-admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin dashboard access granted'
  });
});

// Get all reservations for admin view
router.get('/reservations', protect, getReservations);

module.exports = router;