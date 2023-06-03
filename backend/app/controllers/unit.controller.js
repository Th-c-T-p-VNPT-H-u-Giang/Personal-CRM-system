const { Unit } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  console.log("Body of Unit:", req.body);
  try {
    const document = await Unit.create({
      departmentId: req.body.departmentId,
      name: req.body.name,
    });

    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating Unit !"));
  }
};

exports.findAll = async (req, res, next) => {
  console.log("FIND ALL Unit:");
  try {
    const documents = await Unit.findAll({});
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding Units !"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Unit.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding Unit !"));
  }
};
//
exports.findAllUnitOfADep = async (req, res, next) => {
  try {
    const documents = await Unit.findAll({
      where: {
        departmentId: req.params.depId,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding Units of a Department !"));
  }
};
exports.deleteOne = async (req, res, next) => {
  try {
    const documents = await Unit.destroy({
      where: { _id: req.params.id },
    });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Unit !"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const documents = await Unit.destroy({ where: {} });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Unit !"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const documents = await Unit.update(
      { name: req.body.name, departmentId: req.body.departmentId },
      { where: { _id: req.params.id } }
    );
    res.send(`Đã cập nhật ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error update Unit !"));
  }
};
