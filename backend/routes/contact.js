import express from "express";
const router = express.Router();
// import { requireSignin, isAuth, isAdmin } from "../controllers/auth";
// import { userById } from "../controllers/user";

import {
  lists,
  create,
  getById,
  editById,
  remove,
} from "../controllers/contact";

router.get("/contact", lists);

// router.get("/banner/:id", getById);

router.post("/contact", create);
// router.patch("/banner/:id", editById);

router.delete("/contact/:id", remove);
// router.patch(
//   "/products/:productId/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   updateById
// );

// router.param("productId", productByID);
// router.param("userId", userById);

module.exports = router;
