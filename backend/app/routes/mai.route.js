const express = require("express");
const mail = require("../controllers/mai.controller");

const router = express.Router();

router.route("/").post(mail.sendEmail);
module.exports = router;
