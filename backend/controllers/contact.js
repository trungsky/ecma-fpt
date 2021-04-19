import Contact from "../models/contact";

export const create = (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: `Không thêm được contact ${err}`,
      });
    }
    res.json({ data });
  });
};

export const lists = (req, res) => {
  Contact.find((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: "Contact không tồn tại",
      });
    }
    res.json(contact);
  });
};

export const remove = async (req, res) => {
  Contact.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.json(`Xóa ô kê`);
    })
    .catch((err) => {
      err;
    });
};


// export const categoryById = (req, res, next, id) => {
//   Category.findById(id).exec((err, category) => {
//     if (err || !category) {
//       res.status(400).json({
//         error: "Không tìm thấy danh mục",
//       });
//     }
//     req.category = category;
//     next();
//   });
// };

// export const read = (req, res) => {
//   return res.json(req.category);
// };

// export const remove = (req, res) => {
//   let category = req.category;
//   category.remove((err, deleteCategory) => {
//     if (err) {
//       res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({
//       deleteCategory,
//       message: "Xóa danh mục thành công",
//     });
//   });
// };

// export const update = (req, res) => {
//   const category = req.category;
//   category.name = req.body.name;
//   category.save((err, data) => {
//     if (err || !category) {
//       res.status(400).json({
//         error: "Danh mục không tồn tại",
//       });
//     }
//     res.json({ data });
//   });
// };
