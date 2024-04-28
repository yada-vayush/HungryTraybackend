const Restaurant = require("../models/restaurant");
const CrudRepository = require("./crud-repository");
const mongoose = require("mongoose");
class RestaurantRepository extends CrudRepository {
  constructor() {
    super(Restaurant);
  }

  async get(id) {
    try {
      const result = await this.model.findOne({ user: id });

      return result;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in crud repository");
      console.log("====================================");
      throw error;
    }
  }
  async update(id, data) {
    try {
      const restaurant = await this.model.findOne({ user: id });

      if (!restaurant) {
        throw new Error("No restaurant exist for the given user");
      }
      const response = await this.model.findOneAndUpdate({ user: id }, data, {
        new: true,
      });

      return response;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in restaurant repository");
      console.log("====================================");
      throw error;
    }
  }
  async search(data) {
    try {
      let query = {};

      query["city"] = new RegExp(data.city, "i");

      const cityCheck = await this.model.countDocuments(query);

      if (cityCheck === 0) {
        return [];
      }

      if (data.selectedCuisines) {
        const cuisinesArr = data.selectedCuisines
          .split(",")
          .map((cuisine) => new RegExp(cuisine, "i"));
        query["cuisines"] = { $all: cuisinesArr };
      }
      if (data.searchQuery) {
        //searchQuery Pasta
        const searchRegExp = new RegExp(data.searchQuery, "i");

        query["$or"] = [
          { restaurantName: searchRegExp, cuisines: { $in: [searchRegExp] } },
        ];
      }
      const pageSize = 10;
      const skip = (data.page - 1) * pageSize;
      const total = await this.model.countDocuments(query);

      const restaurant = await this.model
        .find(query)
        .sort({ [data.sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean();

      const response = {
        data: restaurant,
        pagination: {
          total: total,
          page: data.page,
          pages: Math.ceil(total / pageSize),
        },
      };

      return response;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in restaurant repository");
      console.log("====================================");
      throw error;
    }
  }
}

module.exports = RestaurantRepository;
