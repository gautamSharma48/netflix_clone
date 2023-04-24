const listSchema = require("../models/listModel");

const createList = async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new listSchema(req.body);
    try {
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "You are not authorized to do that" });
  }
};
const updateList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await listSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "You are not authorized to do that" });
  }
};

const deletList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedList = await listSchema.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json({ message: "You are not authorized to do that" });
  }
};

const getList = async (req, res) => {
  const { type, genere } = req.query;
  let list = [];
  try {
    if (type) {
      if (genere) {
        list = await listSchema.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: type, genere: genere } },
        ]);
      }
    } else {
      list = await listSchema.aggregate([{ $sample: { size: 10 } }]);
    }
    res.status(200).json(list);
    const list = await listSchema.find(req.params.id);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  createList,
  updateList,
  deletList,
  getList,
};
