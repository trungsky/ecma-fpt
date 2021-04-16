import Billing from "../models/billing";

export const lists = (req, res) => {
  Billing.find((err, billing) => {
    if (err) {
      return res.status(400).json({
        error: "Billing không tồn tại",
      });
    }
    res.json(billing);
  });
};

export const create = (req, res) => {
  const billing = new Billing(req.body);
  billing.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Không thêm được bill ${err}`,
      });
    }
    res.json({ data });
  });
};

export const findById = async (req, res) => {
  const bill = await Billing.findById(req.params.id);
  res.json(bill);
};

export const editById = async (req, res) => {
  const bill = await Billing.findOneAndUpdate({ _id: req.params.id }, req.body);
  res.json(bill);
};
