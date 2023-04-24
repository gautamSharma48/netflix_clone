const movieSchema = require("../models/movieModel");

const createMovie = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie();
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await movieSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updateMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

const deleteMovie = async () => {
  if (req.user.isAdmin) {
    try {
      const deleteMovie = await movieSchema.findByIdAndDelete(req.params.id);
      res.status(200).json(deleteMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

const getMovie = async () => {
  try {
    const movie = await movieSchema.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllMovie = async (req, res) => {
  try {
    const { page = 1, limit = 10, userLimit = false } = req.query;
    const movies = userLimit
      ? await movieSchema
          .find()
          .skip((page - 1) * limit)
          .limit(limit * 1)
      : await movieSchema.find();
    res.status(200).json(movies.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
};

const randomMovie = () => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movieSchema.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    }
    else {
      movieSchema.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  randomMovie,
  getMovie,
  getAllMovie,
  randomMovie
};
