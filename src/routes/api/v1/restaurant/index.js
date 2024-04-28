const express = require("express");
const multer = require("multer");
const router = express.Router();
const RestaurantController = require("../../../../controllers/restaurant-controller");
const UserController = require("../../../../controllers/user-controller");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,

  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  UserController.AuthenticatedMiddleware,

  upload.single("imageFile"),

  RestaurantController.create
);
router.get(
  "/",
  UserController.AuthenticatedMiddleware,
  RestaurantController.get
);
router.put(
  "/",
  UserController.AuthenticatedMiddleware,
  upload.single("imageFile"),
  RestaurantController.update
);
module.exports = router;
