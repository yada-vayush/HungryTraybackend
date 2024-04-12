const UserRepository = require("../repository/user-repository");
const UserService = require("../services/user-services");
const userRepository = new UserRepository();
const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create(req.body);
    return res.status(201).json({
      success: true,
      message: "New user created successfully",
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
      message: "Not able to create the user",
      err: error,
    });
  }
};
const getByToken = async (req, res) => {
  try {
    const data = await userService.isAuthenticated(
      req.headers["x-access-token"]
    );
    const response = await userService.get(data.id);
    return res.status(201).json({
      success: true,
      message: "User found",
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
      message: "Not able to get the user",
      err: error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const response = await userService.destroy(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
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
      message: "Not able to delete the user",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await userService.get(req.params.id);
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the user",
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
      message: "Not able to fetch the user",
      err: error,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await userService.getAll();
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the user",
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
      message: "Not able to fetch the user",
      err: error,
    });
  }
};

const update = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const user = await userService.isAuthenticated(token);
    const response = await userService.update(user.id, req.body);
    return res.status(201).json({
      success: true,
      message: "Successfully updated the user",
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
      message: "Not able to update the user",
      err: error,
    });
  }
};
const signIn = async (req, res) => {
  try {
    const response = await userService.signin(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      message: "Successfully signed in",
      err: [],
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Something went wrong",
      err: error,
    });
  }
};
const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      message: "user is authenticated and token is valid",
      err: {},
      data: response,
      success: true,
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
    return res.status(500).json({
      success: false,
      data: [],
      message: "Something went wrong",
      err: error,
    });
  }
};

module.exports = {
  create,
  destroy,
  get,
  getAll,
  update,
  signIn,
  isAuthenticated,
  getByToken,
};
