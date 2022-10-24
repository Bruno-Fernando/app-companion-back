const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Verify if user is authorided
// @route   GET /user/verify
// @access  Private
const verifyUser = (req, res) => {
  return res.json({
    message: 'ok',
    user: req.user,
  });
};

// @desc    Register allowed users
// @route   POST /user/verify
// @access  Private
const registerUsers = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Forbidden');
  }

  const { users } = req.body;
  try {
    const inserted = await User.insertMany(users, { ordered: false });
    return res.json({
      message: 'Ok',
      result: inserted,
    });
  } catch (error) {
    res.status = 500;
    return res.json({
      message: 'Server error',
      error,
    });
  }
});

module.exports = { verifyUser, registerUsers };
