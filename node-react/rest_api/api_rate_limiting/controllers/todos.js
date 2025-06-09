const db = require("../models");
const { Todo, Sequelize } = db;
const { Op } = Sequelize;

const getByName = async (req, res) => {
  const { search } = req.query;

  if (!search)
    return res.status(400).json({ message: "Search query is required" });

  try {
    const results = await Todo.findAll({
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getByDescription = async (req, res) => {
  const { search } = req.query;

  if (!search)
    return res.status(400).json({ message: "Search query is required" });

  try {
    const results = await Todo.findAll({
      where: {
        description: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = { getByName, getByDescription };
