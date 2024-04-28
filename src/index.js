const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const testRouter = require("./routes/api/index.js");
const { PORT } = require("./config/dotev");
const connect = require("./config/database.js");
const { default: mongoose } = require("mongoose");
const { v2 } = require("cloudinary");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", testRouter);

app.listen(PORT, async () => {
  console.log("Server running on port ", PORT);
  await connect();
  v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
});
