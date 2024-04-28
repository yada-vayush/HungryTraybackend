const express = require("express");
const routeValidator = require("express-route-validator");
const SearchController = require("../../../../controllers/search-controller");
const router = express.Router();

router.get(
  "/:city",
  routeValidator.validate({
    params: {
      city: {
        isRequired: true,
        isString: true,
        message: "City is requried",
      },
    },
  }),
  SearchController.search
);
module.exports = router;
