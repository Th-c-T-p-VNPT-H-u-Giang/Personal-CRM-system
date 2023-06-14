const { Permission, Role_Permission, Role, Task_Employee, Task, Employee } = require("../models/index.model.js");
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../config/index");

exports.create = async (req, res, next) => {
    if (Object.keys(req.body).length === 2) {
        const { taskId, employeeId } = req.body;
        const task_em = await Task_Employee.findAll();
        for (let value of task_em) {
            if (value.TaskId == taskId && value.EmployeeId == employeeId) {
                return res.send({
                    error: true,
                    msg: `Đã tồn tại phân công .`,
                });
            }
        }
        try {
            const document = await Task_Employee.create({
                TaskId: taskId,
                EmployeeId: employeeId,
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
        const documents = await Task_Employee.findAll({
            include: [{
                model: Task,
                // attribute: ['status','reason']
            },
            {
                model: Employee,
            },
            ]

        });
        return res.send(documents);
    } catch (error) {
        console.log(error);
        return next(createError(400, "Error finding all task!"));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const documents = await Task_Employee.findOne({
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
        const documents = await Task_Employee.destroy({
            where: {
                _id: req.params.id,
            }   
        });
        return res.send(`Xóa phân công thành công`);
    } catch (error) {
        return next(createError(400, "Lỗi không xóa được phân công !"));
    }
}


exports.update = async (req, res, next) => {
    console.log('update', req.body);
    // console.log(req.body.Status_Task.status);
    // console.log(req.body.Status_Task.reason);
    const { TaskId, EmployeeId } = req.body;
    try {
        let task_employee = [await Task_Employee.findOne({
            where: {
                _id: req.params.id,
            },
            include: [{
                model: Task,
                
            },
            {
                model: Employee
            }
            ]
        })];

        task_employee = task_employee.filter(
            (value, index) => {
                return value.TaskId === TaskId && value.EmployeeId == EmployeeId
            }
        )

        if (tasks.length == 0) {
            const document = await Task_Employee.update({
                EmployeeId : req.body.EmployeeId,
            }, { where: { _id: req.params.id }, returning: true, });
            return res.send({
                error: false,
                msg: 'Dữ liệu đã được thay đổi thành công.',
            })
        } else {
            return res.send({
                error: true,
                msg: 'Dữ liệu chưa được thay đổi.'
            })
        }

    } catch (error) {
        return next(
            createError(400, 'Error update')
        )
    }

}
