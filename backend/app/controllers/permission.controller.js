const { Permission } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/index");

exports.create = async (req, res, next) => {
  try {
    const document = await Permission.create({
      name: req.body.name,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating Permission !"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Permission.findAll({});
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding all permissions!"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Permission.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding permission!"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const result = await Permission.destroy({
      where: {
        _id: req.params.id,
      },
    });

    if (result === 0) {
      return next(createError(404, "Permission not found"));
    }

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting permission"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    // Tắt ràng buộc khóa ngoại
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    const result = await Permission.destroy({
      where: {},
      truncate: true, // Truncate the table to remove all records
    });

    if (result === 0) {
      return res.sendStatus(204);
    }

    // Kích hoạt lại ràng buộc khóa ngoại
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting permission"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const [updatedRowsCount, updatedRows] = await Permission.update(
      {
        name,
      },
      {
        where: {
          _id: req.params.id,
        },
        returning: true, 
      }
    );

    if (updatedRowsCount === 0) {
      return next(createError(404, "Permission not found"));
    }

    return res.send(updatedRows[0]);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error updating Permission"));
  }
};
