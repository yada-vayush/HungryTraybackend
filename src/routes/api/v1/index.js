const express = require("express");
const UserController = require("../../../controllers/user-controller");
const { AuthRequestValidators } = require("../../../middlewares/index");
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
module.exports = router;
