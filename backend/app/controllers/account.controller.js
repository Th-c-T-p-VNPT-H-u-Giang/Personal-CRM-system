const { Account } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");


exports.create = async (req, res, next) => {
  try {
    const document = await Account.create({
      user_name: req.body.user_name,
      password: req.body.password,
      roleId: req.body.roleId,
      EmployeeId: req.body.EmployeeId,
    });
    return res.send(document);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error creating accounts!"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Account.findAll({
      // include: {
      //     model: Employee
      // },
    });
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding all accounts!"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Account.findOne({
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
    const result = await Account.destroy({
      where: {
        _id: req.params.id,
      },
    });

    if (result === 0) {
      // If no records were deleted, return an error
      return next(createError(404, "Account not found"));
    }

    return res.sendStatus(204); // Return 204 No Content if the record was deleted successfully
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting account"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const result = await Account.destroy({
      where: {},
      truncate: true, // Truncate the table to remove all records
    });

    if (result === 0) {
      // If no records were deleted, return an error
      // return next(createError(404, 'No accounts found'));
      return res.sendStatus(204); // Return 204 No Content if all records were deleted successfully
    }

    //   return res.sendStatus(204); // Return 204 No Content if all records were deleted successfully
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error deleting accounts"));
  }
};

exports.update = async (req, res, next) => {
  try {
    const { user_name, password, roleId, EmployeeId } = req.body;
    const [updatedRowsCount, updatedRows] = await Account.update(
      {
        user_name,
        password,
        roleId,
        EmployeeId,
      },
      {
        where: {
          _id: req.params.id,
        },
        returning: true, // Get the updated rows as the result
      }
    );

    if (updatedRowsCount === 0) {
      // If no records were updated, return an error
      return next(createError(404, "Account not found"));
    }

    return res.send(updatedRows[0]); // Return the updated account
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error updating account"));
  }
};
