class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in crud repository");
      console.log("====================================");
      throw error;
    }
  }
  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return true;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in crud repository");
      console.log("====================================");
      throw error;
    }
  }
  async get(id) {
    try {
      const result = await this.model
        .findById(id)
        .select("firstName lastName country city email phoneNumber address");

      return result;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in crud repository");
      console.log("====================================");
      throw error;
    }
  }
  async getAll() {
    try {
      const result = await this.model.find();
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
      console.log(id);
      console.log(data);
      const result = await this.model.findOne({ id });
      console.log(result);
      return result;
    } catch (error) {
      console.log("====================================");
      console.log("Something went wrong in crud repository");
      console.log("====================================");
      throw error;
    }
  }
}
module.exports = CrudRepository;
