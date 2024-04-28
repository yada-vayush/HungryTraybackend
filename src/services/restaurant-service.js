const RestaurantRepository = require("../repository/restaurant-repository");
const mongoose = require("mongoose");
class RestaurantService {
  constructor() {
    this.restaurantrepository = new RestaurantRepository();
  }
  async create(data, id) {
    try {
      data = {
        ...data,
        lastUpdated: new Date(),
        user: id,
      };

      const restaurant = await this.restaurantrepository.create(data);
      return restaurant;
    } catch (error) {
      console.log("Error occured in restaurant service layer");
      throw error;
    }
  }
  async get(id) {
    try {
      const restaurant = await this.restaurantrepository.get(id);
      return restaurant;
    } catch (error) {
      console.log("Error occured in restaurant service layer");
      throw error;
    }
  }
  async update(data, id) {
    try {
      const restaurant = await this.restaurantrepository.update(id, {
        user: id,
        restaurantName: data.restaurantName,
        city: data.city,
        country: data.country,
        deliveryPrice: data.deliveryPrice,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        cuisines: data.cuisines,
        imageUrl: data.imageUrl,
        lastUpdated: new Date(),
      });
      return restaurant;
    } catch (error) {
      console.log("Error occured in restaurant service layer");
      throw error;
    }
  }
  async search(data) {
    try {
      const response = await this.restaurantrepository.search(data);
      return response;
    } catch (error) {
      console.log("Error occured in restaurant service layer");
      throw error;
    }
  }
}
module.exports = RestaurantService;
