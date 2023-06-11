const router = require("express").Router();
const customer_event = require("../controllers/customer_event.controller");

router.route("/").post(customer_event.create).get(customer_event.findAll);

module.exports = router;
