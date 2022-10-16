const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// @desc    Create user token
// @route   POST /user/login
// @access  Public
const createUserToken = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    res.status(400);
    throw new Error('Add all required fields');
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(201);

    return res.json({
      token: jwt.sign({ id: userExists.id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
    });
  }

  const newUser = await User.create({
    name,
    email,
    role,
  });
  res.status(201);

  return res.json({
    token: jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
  });
});

module.exports = { createUserToken };
