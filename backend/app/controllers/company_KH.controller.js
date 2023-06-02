const { Company_KH } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

exports.create = async (req, res, next) => {
  try {
    const document = await Company_KH.create({
      name: req.body.name,
    });
    return res.status(200).json({
      msg: document
        ? "Company KH created successfully"
        : "Company KH created failed",
      statusCode: document ? true : false,
      payload: document ? document : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Company_KH.findAll();

    return res.status(200).send(documents);
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// exports.findOne = async (req, res, next) => {
//   try {
//     const documents = await Customer.findOne({
//       where: {
//         _id: req.params.id,
//       },
//     });
//     return res.send(documents);
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await Company_KH.destroy({
      where: {
        _id: id,
      },
    });

    return res.status(200).json({
      msg: document ? "Deleted successfully" : "Not found to delete!!",
      statusCode: document ? true : false,
      payload: document ? document : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

exports.deleteAll = async (req, res, next) => {};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  try {
    const document = await Company_KH.update(
      {
        name: req.body.name,
      },
      {
        where: {
          _id: req.params.id,
        },
      }
    );

    console.log(document);
    return res.status(200).json({
      msg: document[0] ? "Update successfully" : "Not found to update!!",
      statusCode: document[0] ? true : false,
      payload: document[0] ? document : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
