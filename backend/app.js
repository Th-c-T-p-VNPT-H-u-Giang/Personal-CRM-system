// npm packages
const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

// initialize
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// config path
const pathPublic = path.join(__dirname, "./app/public");
app.use("/public", express.static(pathPublic));

// simple route
app.get("/", (req, res, next) => {
  return res.send({
    message: "Welcom to Personal CRM System",
  });
});

// handles before https methods
const convertToLowercase = (req, res, next) => {
  for (let key in req.body) {
    if (typeof req.body[key] === "string") {
      req.body[key] = req.body[key].toLowerCase();
    }
  }
  next();
};

app.use(convertToLowercase);

// initialize router
const customerRouter = require("./app/routes/customer.route");
const customer_typesRouter = require("./app/routes/customer_types.route");
const customer_workRouter = require("./app/routes/customer_work.route");
const Company_KHRouter = require("./app/routes/company_KH.route");
// const EventRouter = require("./app/routes/event.route");
// const HabitRouter = require("./app/routes/habit.route");
// const PositionRouter = require("./app/routes/position.route");
// const Center_VNPTHGRouter = require("./app/routes/center_VNPTHG.route");
// const DepartmentRouter = require("./app/routes/department.route");
// const UnitRouter = require("./app/routes/unit.route");
// const PermissionRouter = require("./app/routes/permission.route");
// const RoleRouter = require("./app/routes/role.route");
// const CycleRouter = require("./app/routes/cycle.route");
// const EmployeeRouter = require("./app/routes/employee.route");
// const AccountRouter = require("./app/routes/account.route");
// const AppointmentRouter = require("./app/routes/appointment.route");
// const TaskRouter = require("./app/routes/task.route");
// const LogRouter = require("./app/routes/log.route");

// // use router
app.use("/api/customers", customerRouter);
app.use("/api/customer_types", customer_typesRouter);
app.use("/api/customer_works", customer_workRouter);
app.use("/api/company_KHs", Company_KHRouter);
// app.use("/events", EventRouter);
// app.use("/habits", HabitRouter);
// app.use("/positions", PositionRouter);
// app.use("/center_VNPTHGs", Center_VNPTHGRouter);
// app.use("/departments", DepartmentRouter);
// app.use("/units", UnitRouter);
// app.use("/permissions", PermissionRouter);
// app.use("/roles", RoleRouter);
// app.use("/cycles", CycleRouter);
// app.use("/employees", EmployeeRouter);
// app.use("/accounts", AccountRouter);
// app.use("/appointments", AppointmentRouter);
// app.use("/tasks", TaskRouter);
// app.use("/logs", LogRouter);

// check errors
app.use((req, res, next) => {
  return next(createError(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// exports
module.exports = app;
