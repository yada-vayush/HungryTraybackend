const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect("mongodb://localhost/Hungry_Tray");
  console.log("database cunnected");
};
module.exports = connect;
