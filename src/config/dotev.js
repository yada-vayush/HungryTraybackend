const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  PORT: process.env.PORT,
  // MongoDb:process.env.
  JWT_KEY: process.env.JWT_KEY,
};
