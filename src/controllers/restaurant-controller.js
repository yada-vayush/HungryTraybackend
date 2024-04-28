const RestaurantService = require("../services/restaurant-service");
const restaurantService = new RestaurantService();
const cloudinary = require("cloudinary");
const create = async (req, res) => {
  try {
    const existingRestaurant = await restaurantService.get(req.id);
    if (existingRestaurant)
      return res.status(409).json({
        success: false,
        data: [],
        message: "User restaurant already exists",
      });
    console.log(req.file);
    const image = req.file;
    const base64image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64image}`;

    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    data = { ...req.body, imageUrl: uploadResponse.url };
    const response = await restaurantService.create(data, req.id);
    return res.status(201).json({
      success: true,
      message: "New restaurant created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to create the restaurant",
      err: error,
    });
  }
};
const get = async (req, res) => {
  try {
    const response = await restaurantService.get(req.id);
    if (!response)
      return res.status(404).json({
        success: false,
        message: "restautant not found",
        data: [],
        err: "Restaurant not found",
      });
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to fetch  the restaurant",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    if (req.file) {
      const image = req.file;
      const base64image = Buffer.from(image.buffer).toString("base64");
      const dataURI = `data:${image.mimetype};base64,${base64image}`;

      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
      req.body = { ...req.body, imageUrl: uploadResponse.url };
    }
    data = { ...req.body };
    const response = await restaurantService.update(data, req.id);
    return res.status(201).json({
      success: true,
      message: "New restaurant created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: [],
      message: "Not able to update the restaurant",
      err: error,
    });
  }
};
module.exports = {
  create,
  get,
  update,
};
