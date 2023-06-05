const router = require("express").Router();
const company = require("../controllers/company_KH.controller");

router
  .route("/:id")
  .put(company.update)
  .get(company.findOne)
  .delete(company.deleteOne);

router
  .route("/")
  .post(company.create)
  .get(company.findAll)
  .delete(company.deleteAll);

module.exports = router;
