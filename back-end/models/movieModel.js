const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, requried: true, unique: true },
    description: { type: String },
    img: { type: String },
    titleImg: { type: String },
    imgsm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: String },
    genere: { type: String },
    isSeries: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("nl-movies", movieSchema);
