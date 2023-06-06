const express = require('express');
<<<<<<< HEAD
const customers = require('../controllers/customer.controller');
=======
const events = require('../controllers/event.controller');
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
    .post(events.create)
    .get(events.findAll)
    .delete(events.deleteAll)

router.route('/:id')
    .put(events.update)
    .get(events.findOne)
    .delete(events.deleteOne)
>>>>>>> b8be74c0ec1abe17da6fb42c2342fe4f65e73ab8

module.exports = router;

