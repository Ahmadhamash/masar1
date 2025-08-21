const express = require('express');
const hollandController = require('../controllers/hollandController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/questions', hollandController.getQuestions);
router.post('/submit', auth, hollandController.submitAssessment);

module.exports = router;