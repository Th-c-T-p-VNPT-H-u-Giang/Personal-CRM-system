const { Center_VNPTHG } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  console.log("Body of center:", req.body);
  try {
    const document = await Center_VNPTHG.create({
      name: req.body.name,
    });

    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating Center_VNPTHG !"));
  }
};

exports.findAll = async (req, res, next) => {
  console.log("FIND ALL CENTER:");
  try {
    const documents = await Center_VNPTHG.findAll({});
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding Center_VNPTHGs !"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Center_VNPTHG.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding Center_VNPTHG !"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const documents = await Center_VNPTHG.destroy({
      where: { _id: req.params.id },
    });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Center_VNPTHG !"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const documents = await Center_VNPTHG.destroy({ where: {} });
    return res.send(`Đã xóa ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error delete Center_VNPTHG !"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const documents = await Center_VNPTHG.update(
      { name: req.body.name },
      { where: { _id: req.params.id } }
    );
    res.send(`Đã cập nhật ${documents} bản ghi.`);
  } catch (error) {
    return next(createError(400, "Error update Center_VNPTHG !"));
  }
};
