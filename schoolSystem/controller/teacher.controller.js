teacherModel = require("../models/teacher.model");

register = async (req, res) => {
  try {
    let teacher = new teacherModel(req.body);
    await teacher.save()
    res.status(200).send({
      apiStatus: true,
      data: teacher,
      message: "account add successfuly",
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      data: e,
      message: "error in account addition",
    });
  }
}

showAll = async (req, res) => {
  try {
    let teachers = await teacherModel.find();
    res.status(200).send({
      apiStatus: true,
      data: teachers,
      message: "",
    });
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      data: e,
      message: "error in getting data",
    });
  }
};

showSingle = async (req, res) => {
  const _id = req.params.id;
  try {
    let teacher = await teacherModel.findById(_id);
    if (!teacher) {
      res.status(200).send({
        apiStatus: true,
        data: teacher,
        message: "Not Found",
      });
    } else {
      res.status(200).send({
        apiStatus: true,
        data: teacher,
        message: "",
      });
    }
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      data: e,
      message: "error in getting data",
    });
  }
};

deleteSingle = async (req, res) => {
  const _id = req.params.id;
  try {
    let teacher = await teacherModel.findByIdAndDelete(_id);
    if (!teacher) {
      res.status(200).send({
        apiStatus: true,
        data: teacher,
        message: "Not Found",
      });
    } else {
      res.status(200).send({
        
        apiStatus: true,
        data: teacher,
        message: "",
      });
    }
  } catch (e) {
    res.status(500).send({
      apiStatus: false,
      data: e,
      message: "error in getting data",
    });
  }
};

module.exports = {
  register,
  showAll,
  showSingle,
  deleteSingle,
};
