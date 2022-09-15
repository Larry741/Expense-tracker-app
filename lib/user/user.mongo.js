const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  expenses: [
    {
      subId: {
        type: String,
        required: true,
        trim: true,
      },
      date: {
        type: Date,
        required: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.user || mongoose.model("user", userSchema);
