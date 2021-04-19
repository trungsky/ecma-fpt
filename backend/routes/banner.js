import express from "express";
const router = express.Router();
import { requireSignin, isAuth, isAdmin } from "../controllers/auth";
import { userById } from "../controllers/user";

import { lists, create, getById, editById } from "../controllers/banner";

router.get("/banner", lists);
router.get("/banner/:id", getById);

router.post("/banner", create);
router.patch("/banner/:id", editById);
// router.delete(
//   "/products/:productId/:userId",
//   requireSignin,
//   isAuth,
//   isAdmin,
//   remove
// );
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
