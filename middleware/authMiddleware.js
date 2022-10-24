/* eslint-disable import/no-unresolved */
const asyncHandler = require('express-async-handler');
const { getAuth } = require('firebase-admin/auth');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const reqToken = req.headers.authorization;

  let decoded;

  if (reqToken && reqToken.startsWith('Bearer')) {
    try {
      const token = reqToken.split(' ')[1];
      decoded = await getAuth().verifyIdToken(token);
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized');
    }

    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } else {
    res.status(401);
    throw new Error('No authToken');
  }
});

module.exports = { protect };
