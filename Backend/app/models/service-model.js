const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const serviceSchema = new Schema(
  {
    OrderId: String,
    fullName: String,
    email: String,
    phoneNumber: Number,
    date: String,
    service: String,
    status: String,
  },
  { timestamps: true }
);
const Services = model("Services", serviceSchema);

module.exports = Services;
