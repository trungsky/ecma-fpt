import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    img: {
      type: String,
      trim: true,
      required: true,
    },
    hero_text: {
      type: String,
      trim: true,
      required: true,
    },
    hero_title: {
      type: String,
      trim: true,
      required: true,
    },
    hero_desc: {
      type: String,
      trim: true,
      required: true,
    },
    btn_title: {
      type: String,
      trim: true,
      required: true,
    },
    btn_url: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("Banner", bannerSchema);
