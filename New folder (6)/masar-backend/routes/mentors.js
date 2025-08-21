const express = require('express');
const mentorController = require('../controllers/mentorController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { mentorValidation } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getMentorById);
router.get('/:id/stats', mentorController.getMentorStats);

// Admin routes
router.post('/', auth, admin, mentorValidation, mentorController.createMentor);
router.put('/:id', auth, admin, mentorValidation, mentorController.updateMentor);
router.delete('/:id', auth, admin, mentorController.deleteMentor);

module.exports = router;