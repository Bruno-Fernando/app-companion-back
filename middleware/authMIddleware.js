const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const reqToken = req.headers.authorization;

  if (reqToken && reqToken.startsWith('Bearer')) {
    try {
      const token = reqToken.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }
  } else {
    res.status(401);

    throw new Error('Not authorized');
  }
});

module.exports = { protect };