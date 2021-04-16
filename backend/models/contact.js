import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      maxLength: 12,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    message: {
      type: String,
      trim: true,
      required: true,
      maxLength: 2000,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Contact", contactSchema);
