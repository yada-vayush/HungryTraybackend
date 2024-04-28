const express = require("express");
const UserController = require("../../../controllers/user-controller");
const { AuthRequestValidators } = require("../../../middlewares/index");
const restaurant = require("./restaurant/index.js");
const search = require("./search/index.js");
const router = express.Router();

router.get("/getByToken", UserController.getByToken);
router.post(
  "/signup",
  AuthRequestValidators.validateUserSignUp,
  UserController.create
);
router.post(
  "/signin",
  AuthRequestValidators.validateSignIn,
  UserController.signIn
);

router.put("/update", UserController.update);
router.get("/isAuthenticated", UserController.isAuthenticated);
router.use("/restaurant", restaurant);
router.use("/search", search);
module.exports = router;
