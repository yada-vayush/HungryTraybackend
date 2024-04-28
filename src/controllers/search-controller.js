const RestaurantService = require("../services/restaurant-service");

const restaurantService = new RestaurantService();
const search = async (req, res) => {
  try {
    const city = req.params.city;
    const searchQuery = req.query.searchQuery || "";
    const selectedCuisines = req.query.selectedCuisines || "";
    const sortOption = req.query.sortOption || "lastUpdated";
    const page = parseInt(req.query.page) || 1;
    const response = await restaurantService.search({
      city,
      searchQuery,
      selectedCuisines,
      sortOption,
      page,
    });
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to search the restaurant",
      err: error,
    });
  }
};

module.exports = {
  search,
};
