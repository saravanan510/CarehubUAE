const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bloodTestSchema = new Schema(
  {
    orderId: String,
    fullName: String,
    email: String,
    phoneNumber: Number,
    date: String,
    time: String,
    status: String,
    tests: Array,
    amount: String,
  },
  { timestamps: true }
);

const BloodTests = model("bloodTest", bloodTestSchema);
module.exports = BloodTests;
