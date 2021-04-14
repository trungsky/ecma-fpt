import mongoose from "mongoose";

const bannerSchema = mongoose.Schema(
  {
    img: {
      type: String,
      trim: true,
    },
    hero_text: {
      type: String,
      trim: true,
    },
    hero_title: {
      type: String,
      trim: true,
    },
    hero_desc: {
      type: String,
      trim: true,
    },
    btn_title: {
      type: String,
      trim: true,
    },
    btn_url: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Banner", bannerSchema);
