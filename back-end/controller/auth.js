const UserSchema = require("../models/userModel");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { userName, password: pass, email } = req.body;
  const cipherPassword = cryptoJS.AES.encrypt(
    pass,
    process.env.SECRET_KEY
  ).toString();
  const createdUser = new UserSchema({
    userName: userName,
    password: cipherPassword,
    email: email,
  });
  try {
    const user = await createdUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password: pass } = req.body;
    const user = await UserSchema.findOne({
      email: email,
    });
    if (!user) return res.status(401).json("wrong user or password");
    const bytes = cryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(cryptoJS.enc.Utf8);

    if (originalPassword !== pass)
      return res.status(401).json("wrong user and password");

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = user._doc;
    res.setHeader("Authorization",`Bearer ${token}`);
    res.status(200).json({...info,token});
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { register, login };
