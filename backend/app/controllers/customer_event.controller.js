const { Customer_Event } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  const { CustomerId, EventId } = req.body;
  try {
    const document = await Customer_Event.create({
      CustomerId,
      EventId,
    });
    return res.status(200).json({
      msg: document
        ? "Tạo sự kiện của khách hàng thành công"
        : "Tạo sự kiện của khách hàng thất bại",
      error: document ? false : true,
      document,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Customer_Event.findAll();

    return res.status(200).json({
      msg:
        documents.length > 0
          ? "Danh sách sự kiện của khách hàng"
          : "Danh sách không tồn tại",
      error: documents.length > 0 ? false : true,
      documents,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
