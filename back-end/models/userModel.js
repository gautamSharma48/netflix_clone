const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, requried: true, unique: true },
    email: { type: String, requried: true ,unique:true },
    password: { type: String, requried: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nl-users",userSchema);