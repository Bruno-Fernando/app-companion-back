const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Add a name'],
    },
    email: {
      type: String,
      required: [true, 'Add a email'],
      unique: true,
    },
    role: {
      type: String,
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
