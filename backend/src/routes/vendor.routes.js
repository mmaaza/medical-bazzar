const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth.middleware');
const { 
  createVendor, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword, 
  getAllVendors,
  adminLoginAsVendor,
  updateVendorById,
  getVendorById
} = require('../controllers/vendor.controller');

// Public routes
router.post('/login', login);

// Admin only routes
router.use('/admin-login', protect, authorize('admin'));
router.post('/admin-login', adminLoginAsVendor);

router.use('/', protect, authorize('admin'));
router.post('/', createVendor);
router.get('/', getAllVendors);
router.get('/:id', getVendorById);
router.put('/:id', updateVendorById);

// Vendor only routes
router.use('/profile', protect, authorize('vendor'));
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/change-password', changePassword);

module.exports = router;