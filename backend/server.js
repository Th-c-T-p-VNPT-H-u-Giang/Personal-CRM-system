const app = require("./app");
const { config, connection } = require("./app/config/index");
const {
  Task,
  Status_Task,
  Customer,
  Employee,
  Cycle,
  Appointment,
} = require("./app/models/index.model");
// connect to the database
connection();
// createTable()
// start server
const PORT = config.app.port;

const moment = require("moment");

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("birthday", async ({ _id, name }) => {
    const documents = await Task.findAll({
      include: [
        {
          model: Status_Task,
          // attribute: ['status','reason']
        },
        {
          model: Customer,
        },
        {
          model: Employee,
          where: {
            _id: _id,
          },
        },
      ],
    });
    io.emit("upcoming_birthday", documents);
    // const today = moment(); // Lấy ngày hiện tại
    // customers.forEach((customer) => {
    //   const birthday = moment(customer.birthday, "YYYY-MM-DD");
    //   const customerBirthday = {
    //     month: birthday.month(),
    //     date: birthday.date(),
    //   };
    //   const todayDate = { month: today.month(), date: today.date() };
    //   if (
    //     todayDate.month === customerBirthday.month &&
    //     todayDate.date === customerBirthday.date
    //   ) {
    //     io.emit("upcoming_birthday", {
    //       name: customer.name,
    //       birthday: customer.birthday,
    //     });
    //     console.log("Khách hàng nào: ", {
    //       name: customer.name,
    //       birthday: customer.birthday,
    //     });
    //   }
    // });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});
