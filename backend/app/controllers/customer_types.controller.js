const { Customer_Types } = require("../models/index.model.js");
const createError = require("http-errors");

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
        error: false,
        msg: `Thêm thành công loại khách hàng ${document.name}`,
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  } else {
    return res.status(200).json({
      error: true,
      msg: `Tên loại khách hàng ${req.body.name} đã tồn tại không thể thêm!!`,
    });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Customer_Types.findAll();
    return res.status(200).json({
      msg:
        documents.length > 0 ? "Danh sách khách hàng" : "Không có khách hàng",
      error: documents.length > 0 ? false : true,
      documents,
    });
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
      error: customerType ? false : true,
      msg: customerType
        ? "Bạn vừa xóa thành công loại khách hàng"
        : "Không thể tìm thấy loại khách hàng để xóa!!",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.update = async (req, res, next) => {
  const customerType = await Customer_Types.findAll();
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
        error: customerType[0] ? false : true,
        msg: customerType[0]
          ? "Dử liệu thay đổi thành công"
          : "Không thể tìm thấy dử liệu để thay đổi!!",
      });
    } catch (error) {
      return next(createError(500, error.message));
    }
  } else {
    return res.status(200).json({
      error: true,
      msg: "Dữ liệu chùng nên chưa được thay đổi.",
    });
  }
};
