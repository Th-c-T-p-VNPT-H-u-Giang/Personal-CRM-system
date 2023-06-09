const { Position } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  console.log(req.body);
  try {
    const document = await Position.create({
      name: req.body.name,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating position !"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Position.findAll();
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding positions !"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Position.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding position !"));
  }
};

exports.deleteOne = async (req, res, next) => {};

exports.deleteAll = async (req, res, next) => {
  try {
    const documents = await Position.destroy({ where: {} });
    return res.send(`Đã xóa.`);
  } catch (error) {
    return next(createError(400, "Error delete employees !"));
  }
};

exports.update = async (req, res, next) => {};
