const { Role } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/index");

exports.create = async (req, res, next) => {
  try {
    const document = await Role.create({
      name: req.body.name,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating role !"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Role.findAll({
    });
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding all role!"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Role.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding customer !"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const result = await Role.destroy({
      where: {
        _id: req.params.id,
      },
    });

    if (result === 0) {
      // If no records were deleted, return an error
      return next(createError(404, "Role not found"));
    }

    return res.sendStatus(204); // Return 204 No Content if the record was deleted successfully
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting Role"));
  }
};
exports.deleteAll = async (req, res, next) => {
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    const result = await Role.destroy({
      where: {},
      truncate: true, // Truncate the table to remove all records
    });

    if (result === 0) {
      return res.sendStatus(204);
    }
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting accounts"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const [updatedRowsCount, updatedRows] = await Role.update(
      {
        name,
      },
      {
        where: {
          _id: req.params.id,
        },
        returning: true, // Get the updated rows as the result
      }
    );

    if (updatedRowsCount === 0) {
      return next(createError(404, "Role not found"));
    }

    return res.send(updatedRows[0]);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error updating Role"));
  }
};
