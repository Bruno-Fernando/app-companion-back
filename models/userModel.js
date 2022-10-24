const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Add a name'],
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'Add a email'],
      unique: true,
    },
    role: {
      type: String,
      trim: true,
      lowercase: true,
      enum: {
        values: ['admin', 'professor', 'monitor', 'student'],
        message: 'Provide a valid role',
      },
      required: [true, 'Add a role'],
    },
    questions: {
      type: String,
      required: [false, 'Add questions'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
