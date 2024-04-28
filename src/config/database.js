const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect("mongodb://localhost/Hungry_Tray");
  console.log("database connected");
};
module.exports = connect;
