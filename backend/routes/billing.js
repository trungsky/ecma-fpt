import express from "express";
const router = express.Router();
// import { requireSignin, isAuth, isAdmin } from "../controllers/auth";
// import { userById } from "../controllers/user";

import { lists, create, findById, editById } from "../controllers/billing";

router.get("/billing", lists);
router.get("/billing/:id", findById);

router.post("/billing", create);
router.patch("/billing/:id", editById);
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
