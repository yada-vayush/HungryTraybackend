const User = require("../models/user");
const CrudRepository = require("./crud-repository");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getByEmail(email) {
    try {
      const response = await User.findOne({ email });
      return response;
    } catch (error) {
      console.log("====================================");
      console.log("Errro occured in user repository");
      console.log("====================================");
      throw error;
    }
  }
  async update(id, data) {
    try {
      const response = await User.findByIdAndUpdate(id, data, { new: true });

      return response;
    } catch (error) {
      console.log("====================================");
      console.log("Errro occured in user repository");
      console.log("====================================");
      throw error;
    }
  }
}
module.exports = UserRepository;
