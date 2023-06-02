const { employees } = require('../models/index.model.js');
const createError = require('http-errors');
const { v4: uuidv4 } = require('uuid');


exports.create = async (req, res, next) => {
    try {
        const document = await employees.create({
            name: req.body.name,
            customerTypesId: req.body.customerTypesId,
        });
        return res.send(document);
    } catch (error) {
        console.log(error);
        return next(
            createError(400, 'Error creating employees !')
        )
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const documents = await employees.findAll({
            include: Customer_Types,
        });
        return res.send(documents);
    } catch (error) {
        console.log(error);
        return next(
            createError(400, 'Error finding employees !')
        )
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const documents = await employees.findOne({
            where: {
                _id: req.params.id,
            }
        });
        return res.send(documents);
    } catch (error) {
        return next(
            createError(400, 'Error finding employees !')
        )
    }
}

exports.deleteOne = async (req, res, next) => {

}

exports.deleteAll = async (req, res, next) => {

}

exports.update = async (req, res, next) => {

}

