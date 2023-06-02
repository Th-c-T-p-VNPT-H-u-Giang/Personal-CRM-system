const { Customer_Types } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  const customerType = await Customer_Types.findAll();
  console.log(customerType);
  const name = req.body.name;
  let isCheck = true;
  for (const each of customerType) {
    if (each.name.toLowerCase() == name.toLowerCase()) {
      isCheck = false;
    }
  }

  if (isCheck === true) {
    try {
      const document = await Customer_Types.create({
        name: req.body.name,
      });
      return res.status(200).json({
        msg: document
          ? "Customer type add successfully!!"
          : "Customer type add failed",
        statusCode: document ? true : false,
        payload: document ? document : undefined,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  } else {
    return res.status(200).json({
      msg: "Name Customer type can not the same",
      statusCode: false,
      payload: undefined,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Customer_Types.findAll();
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const customerType = await Customer_Types.destroy({
      where: {
        _id: req.params.id,
      },
    });

    return res.status(200).json({
      msg: customerType
        ? "Deleted customer type successfully!!"
        : "Not found!!",
      statusCode: customerType ? true : false,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};

exports.update = async (req, res, next) => {
  const customerType = await Customer_Types.findAll();
  console.log(customerType);
  const name = req.body.name;
  let isCheck = true;
  for (const each of customerType) {
    if (each.name.toLowerCase() == name.toLowerCase()) {
      isCheck = false;
    }
  }

  if (isCheck === true) {
    try {
      const customerType = await Customer_Types.update(
        {
          name: req.body.name,
        },
        {
          where: {
            _id: req.params.id,
          },
        }
      );
      return res.status(200).json({
        msg: customerType[0]
          ? "Update customer type successfully!!"
          : "Not found!!",
        statusCode: customerType[0] ? true : false,
      });
    } catch (error) {
      console.log(error);
      return next(createError(500, error.message));
    }
  } else {
    return res.status(200).json({
      msg: "Name Customer type can not the same",
      statusCode: false,
      payload: undefined,
    });
  }
};
