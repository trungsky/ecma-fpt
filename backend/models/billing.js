const mongoose = require("mongoose");
const billingSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    street: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    postcode: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    total: {
      type: Number,
      trim: true,
      required: true,
    },
    user: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      default: "Đặt hàng",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    item: Array,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Billing", billingSchema);
