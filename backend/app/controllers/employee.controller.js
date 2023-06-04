const { Employee, Unit, Position } = require('../models/index.model.js');
const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res, next) => {
    try {
        const document = await Employee.create({
            name: req.body.name,
            birthday: req.body.birthday,
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            unitId: req.body.unitId,
            positionId: req.body.positionId,
        });
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            createError(400, 'Error creating customer !')
        )
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const documents = await Employee.findAll({
            include: Employee_Types,
        });
        return res.send(documents);
    } catch (error) {
        console.log(error);
        return next(
            createError(400, 'Error finding customers !')
        )
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const documents = await Employee.findOne({
            where: {
                _id: req.params.id,
            }
        });
        return res.send(documents);
    } catch (error) {
        return next(
            createError(400, 'Error finding customer !')
        )
    }
}

exports.deleteOne = async (req, res, next) => {

}

exports.deleteAll = async (req, res, next) => {

}

exports.update = async (req, res, next) => {

}
