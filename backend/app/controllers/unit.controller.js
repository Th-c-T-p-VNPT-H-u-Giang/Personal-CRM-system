const { Unit } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");

const encryptionKey = "12345678912345678901234567890121";
const iv = "0123456789abcdef";

const setEncrypt = (value) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encrypted = cipher.update(value, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};
const getDecrypt = (name) => {
  if (name) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
    let decrypted = decipher.update(name, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
};
exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length >= 2) {
    const name = setEncrypt(req.body.name);
    const unit = await Unit.findOne({
      where: {
        name: name,
        departmentId: req.body.departmentId,
      },
    });
    if (unit) {
      return res.send({
        error: true,
        msg: `Đã tồn tại  ${getDecrypt(name)}.`,
      });
    }
    try {
      const document = await Unit.create({
        departmentId: req.body.departmentId,
        name: req.body.name,
      });

      return res.send({
        error: false,
        msg: `Bạn đã tạo thành công  ${document.name} `,
        document: document,
      });
    } catch (error) {
      console.log(error);
      return res.send({
        error: true,
        msg: error.errors[0].message,
      });
    }
  } else {
    return res.send({
      error: true,
      msg: `Vui lòng nhập đủ thông tin.`,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Unit.findAll({});
    return res.send({
      document: documents,
    });
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
    return res.send({
      document: documents,
    });
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
    return res.send({
      document: documents,
    });
  } catch (error) {
    return next(createError(400, "Error finding Units of a Department !"));
  }
};
exports.deleteOne = async (req, res, next) => {
  try {
    const unit = await Unit.findOne({
      where: {
        _id: req.params.id,
      },
    });
    const documents = await Unit.destroy({
      where: { _id: req.params.id },
    });
    return res.send({
      msg: `Đã xoá thành công  ${unit.name} `,
      document: unit,
    });
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
    let unit = await Unit.findOne({
      where: {
        _id: req.params.id,
      },
    });
    if (unit.name !== req.body.name) {
      const documents = await Unit.update(
        { name: req.body.name, departmentId: req.body.departmentId },
        { where: { _id: req.params.id } }
      );
      return res.send({
        error: false,
        msg: "Dữ liệu đã được thay đổi thành công.",
      });
    } else {
      return res.send({
        error: true,
        msg: "Dữ liệu chưa được thay đổi.",
      });
    }
  } catch (error) {
    return next(createError(400, "Error update Unit !"));
  }
};
