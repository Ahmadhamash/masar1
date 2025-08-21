const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { userValidation } = require('../middleware/validation');

const router = express.Router();

// Admin routes
router.get('/', auth, admin, userController.getAllUsers);
router.get('/stats', auth, admin, userController.getUserStats);
router.get('/:id', auth, admin, userController.getUserById);
router.post('/', auth, admin, userValidation, userController.createUser);
router.put('/:id', auth, admin, userController.updateUser);
router.delete('/:id', auth, admin, userController.deleteUser);

module.exports = router;