const { Product, Sequelize } = require("../models");
const { Op } = Sequelize;

const getByName = async (req, res) => {
  const { search } = req.query;

  if (!search)
    return res.status(400).json({ message: "Search query is required" });

  try {
    const results = await Product.findAll({
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
    const results = await Product.findAll({
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

const getByCategory = async (req, res) => {
  const { search } = req.query;

  if (!search)
    return res.status(400).json({ message: "Search query is required" });

  try {
    const results = await Product.findAll({
      where: {
        category: {
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

const getByPriceRange = async (req, res) => {
  const { min, max } = req.query;

  if (!min || !max)
    return res.status(400).json({ message: "Both min and max are required." });

  try {
    const results = await Product.findAll({
      where: {
        price: {
          [Op.between]: [parseFloat(min), parseFloat(max)],
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getByQuantityRange = async (req, res) => {
  const { min, max } = req.query;

  if (!min || !max)
    return res.status(400).json({ message: "Both min and max are required." });

  try {
    const results = await Product.findAll({
      where: {
        quantity: {
          [Op.between]: [parseFloat(min), parseFloat(max)],
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

const getLowStock = async (req, res) => {
  try {
    const results = await Product.findAll({
      where: {
        quantity: {
          [Op.lt]: 20,
        },
      },
    });
    res.json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

module.exports = {
  getByName,
  getByDescription,
  getByCategory,
  getByPriceRange,
  getByQuantityRange,
  getLowStock,
};
