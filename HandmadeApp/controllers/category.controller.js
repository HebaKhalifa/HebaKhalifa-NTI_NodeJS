const Category = require("../models/category.model");

const create = async (req, res) => {
  try {
    let category = new Category(req.body);
    await category.save();
    res.status(200).send({
      status: true,
      message: "category added",
      data: { category },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "category addition error",
    });
  }
};

const showDetails = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (!category) return res.send("category not found!");
    res.status(200).send(category);
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const showAll = async (req, res) => {
  try {
    const categorys = await Category.find();
    res.status(200).send(categorys);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const edit = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    if (!category) return res.send("category not found!");
    category.categoryName = req.body.categoryName;
    await category.save();
    res.status(200).send({
      message: "updated",
      status: true,
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const remove = async (req, res) => {
  try {
    let id = req.params.id;
    let category=await Category.findByIdAndDelete(id);
    res.status(200).send("removed");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

module.exports = {
  create,
  showDetails,
  showAll,
  edit,
  remove,
};
