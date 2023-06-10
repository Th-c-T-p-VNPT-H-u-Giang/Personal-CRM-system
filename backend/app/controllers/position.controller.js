const { Position } = require("../models/index.model.js");
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
  if (Object.keys(req.body).length >= 1) {
    const name = setEncrypt(req.body.name);
    const center = await Position.findOne({
      where: {
        name: name,
      },
    });
    if (center) {
      return res.send({
        error: true,
        msg: `Đã tồn tại trung tâm ${getDecrypt(name)}.`,
      });
    }
    try {
      const document = await Position.create({
        name: req.body.name,
      });

      return res.send({
        error: false,
        msg: `Bạn đã tạo thành công trung tâm ${document.name} `,
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
