const express = require('express');
const { verifyUser, registerUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/verify').get(protect, verifyUser);
router.route('/register-users').post(protect, registerUsers);

module.exports = router;
