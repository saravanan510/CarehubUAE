const User = require("../models/user-model");
const userCtrl = {};
userCtrl.login = async (req, res) => {
  console.log("credentials", req.body);
  try {
    const user = await User.findOne({ userName: req.body.userName });

    if (user) {
      console.log("user", user);
      if (user.password === req.body.password) {
        return res.json({ status: 200, message: "logged in successfully" });
      } else {
        return res.json({ status: 400, message: "incorrect data" });
      }
    }
  } catch (error) {
    res.status(500).json({ errors: "something went wrong" });
  }
};
userCtrl.register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    if (user) {
      return res.status(200).json({ message: "user registered successfully" });
    }
  } catch (error) {
    res.status(500).json({ errors: "something went wrong" });
  }
};
module.exports = userCtrl;
