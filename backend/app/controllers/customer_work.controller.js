const {
  Customer_Types,
  Customer_Work,
  Customer,
  Company_KH,
} = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

// "customerId" : "1",
// "current_workplace" : "2",
// "work_history" : "4",
// "current_position" : "3",
// "work_temp" : "5",
// "companyId" : "7"
exports.create = async (req, res, next) => {
  try {
    const document = await Customer_Work.create({
      ...req.body,
    });

    return res.status(200).json({
      msg: document ? "Created successfully" : "Failed to create",
      statusCode: document ? true : false,
      payload: document ? document : undefined,
    });
  } catch (error) {
    console.log(error);
    return next(createError(500, error.message));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const documents = await Customer_Work.findAll({
      include: [
        {
          model: Customer,
          include: [
            {
              model: Customer_Types,
            },
          ],
        },
        {
          model: Company_KH,
        },
      ],
    });

    return res.status(200).json({
      msg: documents.length > 0 ? "Not Empty!!" : "Empty",
      statusCode: documents.length > 0 ? true : false,
      payload: documents.length > 0 ? documents : undefined,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

// exports.findOne = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const documents = await Customer_Work.findOne({
//       include: [
//         {
//           model: Customer,
//           include: [
//             {
//               model: Customer_Types,
//             },
//           ],
//         },
//       ],
//       where: {
//         _id: id,
//       },
//     });

//     return res.status(200).json({
//       msg: documents ? "Find customer work" : "Not found!!",
//       statusCode: documents ? true : false,
//       payload: documents ? documents : undefined,
//     });
//   } catch (error) {
//     return next(createError(500, error.message));
//   }
// };

exports.deleteOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await Customer_Work.destroy({
      where: {
        _id: id,
      },
    });

    return res.status(200).json({
      msg: document ? "Delete successfully!!!" : "Not found to deleted!!!",
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
  try {
    const document = await Customer_Work.update(
      {
        ...req.body,
      },
      {
        where: {
          _id: id,
        },
      }
    );

    return res.status(200).json({
      msg: document[0]
        ? "Updated successfully"
        : "Not found customer work to update",
      statusCode: document[0] ? true : false,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};
