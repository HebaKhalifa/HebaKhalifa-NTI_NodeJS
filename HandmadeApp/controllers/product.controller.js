const Product = require("../models/product.model");

const create = async (req, res) => {
  try {
    let product = new Product(req.body);
    await product.save();
    res.status(200).send({
      status: true,
      message: "product added",
      data: { product },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "product addition error",
    });
  }
};

const showProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.send("product not found!");
    res.status(200).send(product);
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const showAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
const showByCategory = async (req, res) => {
  try {
    let category_id = req.params.category_id;
    let products = await Product.find();
    products = products.filter((product) => {
      return product.category_id == category_id;
    });
    res.status(200).send(products);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const edit = async (req, res) => {
  let updates = Object.keys(req.body);
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.send("product not found!");
    updates.forEach((update) => {
      product[update] = req.body[update];
    });
    await product.save();
    res.status(200).send({
      message: "updated",
      status: true,
      data:{product}
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
    let product = await Product.findByIdAndDelete(id);
    res.status(200).send("removed");
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const makeOffer = async (req, res) => {
  try {
      if(!req.body.offer)return res.send("There is no offer!")
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.send("product not found!");
    product.offer = req.body.offer;
    await product.save();
    res.status(200).send({
      message: "offer started",
      status: true,
      data: { product },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const endOffer = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id);
    if (!product) return res.send("product not found!");
    product.offer = 0;
    await product.save();
    res.status(200).send({
      message: "offer finished",
      status: true,
      data: { product },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

module.exports = {
  create,
  showProduct,
  showAll,
  showByCategory,
  edit,
  remove,
  makeOffer,
  endOffer,
};
