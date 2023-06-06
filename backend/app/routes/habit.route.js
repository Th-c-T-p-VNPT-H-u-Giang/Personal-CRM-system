const express = require('express');
<<<<<<< HEAD
const customers = require('../controllers/customer.controller');
=======
const habits = require('../controllers/habit.controller');
>>>>>>> b8be74c0ec1abe17da6fb42c2342fe4f65e73ab8

const router = express.Router();

router.route('/')
<<<<<<< HEAD
    .post(customers.create)
    .get(customers.findAll)
    .delete(customers.deleteAll)

router.route('/:id')
    .put(customers.update)
    .get(customers.findOne)
    .delete(customers.deleteOne)
=======
    .post(habits.create)
    .get(habits.findAll)
    .delete(habits.deleteAll)

router.route('/:id')
    .put(habits.update)
    .get(habits.findOne)
    .delete(habits.deleteOne)
>>>>>>> b8be74c0ec1abe17da6fb42c2342fe4f65e73ab8

module.exports = router;

