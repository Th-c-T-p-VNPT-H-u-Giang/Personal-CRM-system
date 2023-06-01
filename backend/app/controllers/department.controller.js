const { Department } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  console.log("Body of department:", req.body);
  try {
    const document = await Department.create({
      centerVNPTHGId: req.body.centerVNPTHGId,
      name: req.body.name,
    });

    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating Department !"));
  }
};

exports.findAll = async (req, res, next) => {
  console.log("FIND ALL Department:");
  try {
    const documents = await Department.findAll({});
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding Departments !"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Department.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding Department !"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const documents = await Department.destroy({
      where: { _id: req.params.id },
    });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Department !"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const documents = await Department.destroy({ where: {} });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Department !"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const documents = await Department.update(
      { name: req.body.name, centerVNPTHGId: req.body.centerVNPTHGId },
      { where: { _id: req.params.id } }
    );
    res.send(`Đã cập nhật ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error update Department !"));
  }
};
