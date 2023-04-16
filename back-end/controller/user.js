const cryptoJs = require("crypto-js");
const userSchema = require("../models/userModel");

const updateUser = async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = cryptoJs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updateUser = await userSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can only update your account");
  }
};

const deleteUser = async (req, res) => {
  if (req.params.id === req.user.id || req.user.isAdmin) {
    try {
      await userSchema.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can only update your account");
  }
};

const getUser = async (req, res) => {
  try {
    const getUser = await userSchema.findById(req.params.id);
    const { password, ...info } = getUser._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllUser = async (req, res) => {
  const { page = 1, limit = 10, userLimit = false } = req.query;

  if (req.user.isAdmin) {
    try {
      const users = userLimit
        ? await userSchema
            .find()
            .skip((page - 1) * limit)
            .limit(limit * 1)
        : await userSchema.find();

      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("only admin get all users");
  }
};

const stats = async (req, res) => {
    console.log("asf")
  const today = new Date();
  const lastYear = today.setFullYear(today.setFullYear() - 1);
  try {
    const data = await userSchema.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { updateUser, deleteUser, getUser, getAllUser, stats };
