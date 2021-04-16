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

export const create = (req, res) => {
  const banner = new Banner(req.body);
  banner.save((err, banner) => {
    if (err) {
      return res.status(400).json({
        error: `Banner error ${err}`,
      });
    }
    res.json(banner);
  });
};

export const getById = async (req, res) => {
  const banner = await Banner.findOne({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send("Không có nhé");
    });
};

export const editById = async (req, res) => {
  const banner = await Banner.findOneAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(banner)
  //   .then((data) => {
  //     res.json(data);
  //   })
  //   .catch((err) => {
  //     res.send("Không có nhé");
  //   });
  // res.json(req.body);

  // const banner = req.body;
  // banner.save((err, data) => {
  //   if (err) {
  //     res.status(400).json({
  //       error: err,
  //     });
  //   }
  //   res.json({ data });
  // });
};
