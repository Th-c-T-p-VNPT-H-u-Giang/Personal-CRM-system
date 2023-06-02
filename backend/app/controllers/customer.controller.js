const { Customer_Types, Customer } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path_lib = require("path");
const POSITION_CUT_LINK_IMAGE = 21;

exports.create = async (req, res, next) => {
  const { path } = req.file;
  const imgUrl = path.slice(4, path.length);
  const image = `http://localhost:3000/${imgUrl}`;
  console.log(image);
  const newCustomer = {
    ...req.body,
    avatar: image,
  };

  const customer = await Customer.create({
    ...newCustomer,
  });
  try {
    return res.status(200).json({
      msg: customer
        ? "Created customer successfully"
        : "Failed to create customer",
      statusCode: customer ? true : false,
      payload: customer ? customer : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Customer.findAll();
    return res.status(200).json({
      msg: documents.length > 0 ? "Not Empty!!" : "Empty",
      statusCode: documents.length > 0 ? true : false,
      payload: documents.length > 0 ? documents : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Customer.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.status(200).json({
      msg: documents ? "Get customer by id successfully" : "Not found!!",
      statusCode: documents ? true : false,
      payload: documents ? documents : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  const customer = await Customer.findOne({
    where: {
      _id: id,
    },
  });

  try {
    if (customer) {
      const linkImage = customer.avatar.slice(
        POSITION_CUT_LINK_IMAGE,
        customer.avatar.length
      );
      const imagePath = path_lib.join(__dirname, "../", linkImage);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Deleted image fail", err);
        } else {
          console.log("Deleted image successfully");
        }
      });

      const deleteCustomer = await Customer.destroy({
        where: {
          _id: id,
        },
      });

      return res.status(200).json({
        msg: deleteCustomer
          ? "Customer deleted successfully"
          : "Customer deleted failed",
        statusCode: deleteCustomer ? true : false,
        payload: deleteCustomer ? customer : undefined,
      });
    } else {
      return res.status(200).json({
        msg: "Not Found!!",
        statusCode: false,
      });
    }
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteAll = async (req, res, next) => {
  res.send("Xóa tất cả các khách hàng đã chọn");
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!req.file) {
      const newCustomer = {
        ...req.body,
      };
      const updatedCustomer = await Customer.update(
        {
          ...newCustomer,
        },
        {
          where: {
            _id: id,
          },
        }
      );
      return res.status(200).json({
        msg: updatedCustomer
          ? "updated customer successfully!!"
          : "Not found customer to update!!",
        statusCode: updatedCustomer ? true : false,
        payload: updatedCustomer,
      });
    } else {
      const customer = await Customer.findOne({
        where: {
          _id: id,
        },
      });

      const linkImage = customer.avatar.slice(
        POSITION_CUT_LINK_IMAGE,
        customer.avatar.length
      );
      const imagePath = path_lib.join(__dirname, "../", linkImage);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Deleted image fail", err);
        } else {
          console.log("Deleted image successfully");
        }
      });

      const { path } = req.file;

      const imgUrl = path.slice(4, path.length);
      const image = `http://localhost:3000/${imgUrl}`;
      console.log(image);
      const newCustomer = {
        ...req.body,
        avatar: image,
      };
      const updatedCustomer = await Customer.update(
        {
          ...newCustomer,
        },
        {
          where: {
            _id: id,
          },
        }
      );
      return res.status(200).json({
        msg: updatedCustomer
          ? "updated customer successfully!!"
          : "Not found customer to update!!",
        statusCode: updatedCustomer ? true : false,
        payload: updatedCustomer,
      });
    }
  } catch (error) {
    return next(createError(500, error.message));
  }
};
