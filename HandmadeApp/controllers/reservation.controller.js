const Reservation = require("../models/reservation.model");
const User = require("../models/user.model");
const Product = require("../models/product.model");

const calculateExpectedTime = (req, product) => {
  return (
    product.defaultMakingTime * req.body.quantity +
    req.body.deliveryWay.deliveringTime
  );
};

const specifyPriority = (expectedTime, breakPoint) => {
  if (expectedTime < breakPoint) return true;
  return false;
};

const calculateDeliveringDate = (
  expectedTime,
  lastdeliveryDate = new Date(),
  priority,
  n
) => {
  if (!lastdeliveryDate) lastdeliveryDate = new Date();
  if (priority) {
    return lastdeliveryDate.setDate(
      lastdeliveryDate.getDate() + expectedTime * n
    );
  }
  return lastdeliveryDate.setDate(lastdeliveryDate.getDate() + expectedTime);
};

const calculateTotalCost = (product, reservation) => {
  return product.price * reservation.quantity + reservation.deliveryWay.cost;
};

/**helper function to update some values to reservation when it edited */
const updateReservationValues=async(req,reservation)=>{
  let product = await Product.findById(reservation.product_id);
    let lastReservation = await Reservation.find()
      .sort({ createdAt: -1 })
      .limit(1);

    reservation.cost = calculateTotalCost(product, reservation);
    reservation.expectedTime = calculateExpectedTime(req, product);
    reservation.priority = specifyPriority(
      reservation.expectedTime,
      process.env.breakPoint
    );
    reservation.deliveryDate = calculateDeliveringDate(
      reservation.expectedTime,
      lastReservation[0].deliveryDate,
      reservation.priority,
      process.env.n
    );
    await reservation.save();
}

/**helper function to set some values to reservation new created */
const calculateReservationValues = async (req, reservation) => {
  let product = await Product.findById(req.params.id);
  let lastReservation = await Reservation.find()
    .sort({ createdAt: -1 })
    .limit(1);

  reservation.user_id = req.user._id;
  reservation.product_id = req.params.id;
  reservation.cost = calculateTotalCost(product, reservation);
  reservation.expectedTime = calculateExpectedTime(req, product);
  reservation.priority = specifyPriority(
    reservation.expectedTime,
    process.env.breakPoint
  );
  /******************check if reservation is exist */
  let reservationFound = (
    await Reservation.db.db
      .listCollections({
        name: Reservation.collection.name,
      })
      .toArray()
  ).length;

  if (!reservationFound) {
    reservation.deliveryDate = calculateDeliveringDate(
      reservation.expectedTime,
      reservation.priority,
      process.env.n
    );
  } else {
    reservation.deliveryDate = calculateDeliveringDate(
      reservation.expectedTime,
      lastReservation[0].deliveryDate,
      reservation.priority,
      process.env.n
    );
  }
  await reservation.save();
  req.user.reservations = req.user.reservations.concat({
    reservation_id: reservation._id,
  });
};

const create = async (req, res) => {
  try {
    let reservation = new Reservation(req.body);
    /****************** */
    calculateReservationValues(req, reservation);
    console.log(reservation);
    /************ */

    await req.user.save();
    res.status(200).send({
      status: true,
      message: "reservation added",
      data: { reservation },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      error: e.message,
      message: "reservation addition error",
    });
  }
};

const show = async (req, res) => {
  try {
    let id = req.params.id;
    let reservation = await Reservation.findById(id);
    if (!reservation) return res.send("reservation not found!");
    res.status(200).send(reservation);
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const showAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).send(reservations);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const edit = async (req, res) => {
  let updates = Object.keys(req.body);
  try {
    let id = req.params.id;
    let reservation = await Reservation.findById(id);
    if (!reservation) return res.send("reservation not found!");
    if (reservation.status !== "reserved") {
      return res.send(
        "this reservation can not be edited because it is confirmed before!"
      );
    }
    updates.forEach((update) => {
      reservation[update] = req.body[update];
    });
    updateReservationValues(req,reservation);
    res.status(200).send({
      message: "updated",
      status: true,
      data: { reservation },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const cancel = async (req, res) => {
  try {
    let id = req.params.id;
    let reservation = await Reservation.findById(id);
    if (!reservation) return res.send("reservation not found!");
    if (reservation.status !== "reserved") {
      return res.send(
        "this reservation can not be cancelled because it is confirmed before!"
      );
    }
    reservation.isDeletedFlag = true;
    res.status(200).send({
      status: true,
      message: "cancelled",
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    let id = req.params.id;
    let reservation = await Reservation.findById(id);
    if (!reservation) return res.send("reservation not found!");

    reservation.status = req.body.status;
    await reservation.save();
    res.status(200).send({
      status: true,
      message: "resevation status updated",
      data: { reservation },
    });
  } catch (e) {
    res.status(500).send({
      status: false,
      message: e.message,
    });
  }
};

const setMaker = async (req, res) => {
  try {
    let id = req.params.id;
    let reservation = await Reservation.findById(id);
    if (!reservation) return res.send("reservation not found!");

    reservation.maker = { admin_id: req.user._id };
    req.user.orders = req.user.orders.concat({ reservation_id: id });
    await reservation.save();
    res.status(200).send({
      status: true,
      message: "resevation maker updated",
      data: { reservation },
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
  show,
  showAll,
  edit,
  cancel,
  updateStatus,
  setMaker,
};
