const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [
      function () {
        return this.verify === false;
      },
      "Verify token is required",
    ],
  },

  // 🔽 Câmpuri pentru profilul nutrițional:
  height: {
    type: Number,
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  currentWeight: {
    type: Number,
    default: null,
  },
  desiredWeight: {
    type: Number,
    default: null,
  },
  blood: {
    type: String,
    enum: ["1", "2", "3", "4"],
    default: null,
  },
  dailyRate: {
    type: Number,
    default: null,
  },
});

module.exports = model("user", userSchema);
