const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      unique: true,
    },
    firstName: {
      type: String,
      requried: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      requried: [true, "Password is required"],
      min: 8,
    },
    phoneNumber: {
      type: Number,
      requried: [true, "Phone number is required"],

      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  const Salt = bcrypt.genSaltSync(9);
  const encryptedPassword = bcrypt.hashSync(user.password, Salt);
  user.password = encryptedPassword;
  next();
});
const User = mongoose.model("User", userSchema);
module.exports = User;
