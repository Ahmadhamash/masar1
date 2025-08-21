const express = require('express');
const packageController = require('../controllers/packageController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', packageController.getAllPackages);
router.get('/:id', packageController.getPackageById);
router.post('/', auth, admin, packageController.createPackage);
router.put('/:id', auth, admin, packageController.updatePackage);
router.delete('/:id', auth, admin, packageController.deletePackage);

module.exports = router;