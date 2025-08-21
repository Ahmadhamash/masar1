const express = require('express');
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Public routes
router.post('/', orderController.createOrder);

// Admin routes
router.get('/', auth, admin, orderController.getAllOrders);
router.get('/stats', auth, admin, orderController.getOrderStats);
router.get('/:id', auth, admin, orderController.getOrderById);
router.put('/:id/status', auth, admin, orderController.updateOrderStatus);

module.exports = router;