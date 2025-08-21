const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/learning-path', aiController.generateLearningPath);

module.exports = router;