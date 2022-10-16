const express = require('express');
const { createUserToken } = require('../controllers/userController');

const router = express.Router();

router.post('/login', createUserToken);

module.exports = router;
