const validateUserSignUp = (req, res, next) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.phoneNumber ||
    !req.body.firstName ||
    !req.body.confirmPassword
  ) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Some credentials are missing",
    });
  }
  if (req.body.password != req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Password and confirm password doesnot matched",
    });
  }
  next();
};

const validateSignIn = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Some credentials are missing",
    });
  }
  next();
};
module.exports = {
  validateSignIn,
  validateUserSignUp,
};
