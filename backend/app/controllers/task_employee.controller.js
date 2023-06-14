const { Employee_Task, Task, Employee } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/index");

exports.create = async (req, res, next) => {
  if (Object.keys(req.body).length === 2) {
    console.log(req.body);
    const { TaskId, EmployeeId } = req.body;
    const task_em = await Employee_Task.findAll();
    for (let value of task_em) {
      if (value.TaskId == taskId && value.EmployeeId == employeeId) {
        return res.send({
          error: true,
          msg: `Đã tồn tại phân công .`,
        });
      }
    }
    try {
      const document = await Employee_Task.create({
        TaskId: TaskId,
        EmployeeId: EmployeeId,
      });
      return res.send({
        error: false,
        msg: `Bạn đã phân công thành công`,
        document,
      });
    } catch (error) {
      console.log(error.message);
      return res.send({
        error: true,
        msg: error.message,
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
    const documents = await Employee_Task.findAll({});
    return res.send(documents);
  } catch (error) {
    console.log(error);
    return next(createError(400, "Error finding all task!"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const documents = await Employee_Task.findOne({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(documents);
  } catch (error) {
    return next(createError(400, "Error finding task !"));
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const documents = await Employee_Task.destroy({
      where: {
        _id: req.params.id,
      },
    });
    return res.send(`Xóa phân công thành công`);
  } catch (error) {
    return next(createError(400, "Lỗi không xóa được phân công !"));
  }
};

exports.update = async (req, res, next) => {
  console.log("update", req.body);
  // console.log(req.body.Status_Task.status);
  // console.log(req.body.Status_Task.reason);
  const { TaskId, EmployeeId } = req.body;
  try {
    let Employee_Task = [
      await Employee_Task.findOne({
        where: {
          _id: req.params.id,
        },
        include: [
          {
            model: Task,
          },
          {
            model: Employee,
          },
        ],
      }),
    ];

    Employee_Task = Employee_Task.filter((value, index) => {
      return value.TaskId === TaskId && value.EmployeeId == EmployeeId;
    });

    if (tasks.length == 0) {
      const document = await Employee_Task.update(
        {
          EmployeeId: req.body.EmployeeId,
        },
        { where: { _id: req.params.id }, returning: true }
      );
      return res.send({
        error: false,
        msg: "Dữ liệu đã được thay đổi thành công.",
      });
    } else {
      return res.send({
        error: true,
        msg: "Dữ liệu chưa được thay đổi.",
      });
    }
  } catch (error) {
    return next(createError(400, "Error update"));
  }
};
