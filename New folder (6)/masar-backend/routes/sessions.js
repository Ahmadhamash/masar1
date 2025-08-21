const express = require('express');
const sessionController = require('../controllers/sessionController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Admin routes
router.get('/', auth, admin, sessionController.getAllSessions);
router.post('/', auth, admin, sessionController.createSession);
router.get('/:id', auth, sessionController.getSessionById);
router.put('/:id/status', auth, sessionController.updateSessionStatus);
router.post('/:id/feedback', auth, sessionController.submitFeedback);

module.exports = router;