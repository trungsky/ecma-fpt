import Banner from "../models/banner";

export const lists = (req, res) => {
  Banner.find((err, banner) => {
    if (err) {
      return res.status(400).json({
        error: "Banner không tồn tại",
      });
    }
    res.json(banner);
  });
};
