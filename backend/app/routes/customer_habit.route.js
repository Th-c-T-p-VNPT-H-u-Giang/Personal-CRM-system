const router = require("express").Router();
const customer_habit = require("../controllers/customer_habit.controller");

router.route("/").post(customer_habit.create).get(customer_habit.findAll);

module.exports = router;
