const UserSchema = require("../models/userModel");
const CryptoJS = require("crypto-js");

const register = async (req, res) => {
  const { userName, password, email } = req.body;
  const createdUser = new UserSchema({
    userName: userName,
    password: password,
    email: email,
  });
  try {
    const user = await createdUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register };
