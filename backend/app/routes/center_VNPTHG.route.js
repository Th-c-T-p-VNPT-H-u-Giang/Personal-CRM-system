const express = require("express");
const center_VNPTHG = require("../controllers/center_VNPTHG.controller");

const router = express.Router();

router
  .route("/")
  .post(center_VNPTHG.create)
  .get(center_VNPTHG.findAll)
  .delete(center_VNPTHG.deleteAll);

router
  .route("/:id")
  .put(center_VNPTHG.update)
  .get(center_VNPTHG.findOne)
  .delete(center_VNPTHG.deleteOne);

module.exports = router;
