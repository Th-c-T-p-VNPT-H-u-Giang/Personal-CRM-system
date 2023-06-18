const notification = require('./app/controllers/notification.controller')
const { Notification }  = require('./app/models/index.model')

// npm packages
const createError = require('http-errors');
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const moment = require('moment');

// initialize
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//socket
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server,{
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('assignmentTask', ()=>{
    io.emit('notiTask')
  })

  socket.on('birthday', (customers,_id,nameEm) => {
    console.log("ID nhan vien",_id)
    const today = moment(); // Lấy ngày hiện tại
    console.log("homnay",today)
    customers.forEach(async customer => {
      const birthday = moment(customer.birthday, 'YYYY-MM-DD'); 
      const customerBirthday = { year: birthday.year(), month: birthday.month(), date: birthday.date() };
      const todayDate = { year: today.year(), month: today.month(), date: today.date() };
      const age = todayDate.year - customerBirthday.year;
      console.log("homnay",todayDate)
      console.log("sinh nhat",customerBirthday)
      if (todayDate.month === customerBirthday.month && todayDate.date === (customerBirthday.date -1)){
        const documents = await Notification.findAll({where: {
          idRecipient: _id,
        },})
        console.log("DSSinhNhat:",documents)
        let count = 0
        if (documents.length > 0) {
          for (const value of documents) {
            console.log("Thongbaone",value._id)
            if (value.title == "Sinh nhật" && value.content == `Ngày mai ${customerBirthday.date}/${customerBirthday.month+1} là sinh nhật thứ ${age} của khách hàng "${customer.name}"`){
              count ++
            }          
          }
          if (count > 0){
            io.emit('notiTask')
          } else {
            Notification.create({title:"Sinh nhật", content:`Ngày mai ${customerBirthday.date}/${customerBirthday.month+1} là sinh nhật thứ ${age} của khách hàng "${customer.name}"`,recipient:nameEm, sender:"",isRead: false,idRecipient:_id })   
            io.emit('notiTask')
            // console.log("Khách hàng nào: ",customer);    
          } 
        } else {
          Notification.create({title:"Sinh nhật", content:`Ngày mai ${customerBirthday.date}/${customerBirthday.month+1} là sinh nhật thứ ${age} của khách hàng "${customer.name}"`,recipient:nameEm, sender:"",isRead: false,idRecipient:_id })   
          io.emit('notiTask')
        }            
      }
    });
  });

  socket.on('cycleCus', async (Tasks)=>{
    console.log("Tasks ne",Tasks);
    for (const value of Tasks) {
      const today = moment();
      const todayDate = { year: today.year(), month: today.month(), date: today.date() };
      const end_day = moment(value.end_date, 'YYYY-MM-DD');
      let coming_day;
        if (value.Cycles.name == 'tuần'){
          coming_day = end_day.add(7, 'days');
        } else
        if (value.Cycles.name == 'tháng'){
          coming_day = end_day.add(1, 'months');
        } else{
          coming_day = end_day.add(4, 'months');
        }
        coming_day = coming_day.subtract(1, 'days');
        today.startOf('day');
        coming_day.startOf('day');
        console.log("coming_day",coming_day,"cua khach hang",value.Customers.name)  
        console.log("today",today)
        if (coming_day.isSame(today)){    
          const documents = await Notification.findAll({where: {
            idRecipient: value.leaderId,
          },})        
          let count = 0
          if (documents.length > 0) {
            for (const item of documents) {
              console.log("Thongbaone",item._id)
              if (item.title == "Tới chu kỳ" && item.content == `Ngày mai ${todayDate.date+1}/${todayDate.month+1} là chu kỳ chăm sóc "${value.Cycles.name}" của khách hàng "${value.Customers.name}"`){
                count ++
              }          
            }
            console.log("count bang",count)
            if (count > 0){
              io.emit('notiTask')
            } else {
              Notification.create({title:"Tới chu kỳ", content:`Ngày mai ${todayDate.date+1}/${todayDate.month+1} là chu kỳ chăm sóc "${value.Cycles.name}" của khách hàng "${value.Customers.name}"`,recipient:"Lãnh đạo", sender:"",isRead: false,idRecipient: value.leaderId })   
              console.log("value.Customers.name",value.leaderId)
              io.emit('notiTask')
              // console.log("Khách hàng nào: ",customer);    
            } 
          } else {
            Notification.create({title:"Tới chu kỳ", content:`Ngày mai ${todayDate.date+1}/${todayDate.month+1} là chu kỳ chăm sóc "${value.Cycles.name}" của khách hàng "${value.Customers.name}"`,recipient:"Lãnh đạo", sender:"",isRead: false,idRecipient: value.leaderId })   
            console.log("value.Customers.name",value.leaderId)
            io.emit('notiTask')
          } 
        }           
      }   
  })
});

server.listen(3000, () => {
  console.log(`Server is listening on port`);
});


// config path
const pathPublic = path.join(__dirname, "./app/public");
app.use("/public", express.static(pathPublic));

// simple route
app.get('/', (req, res, next) => {
    return res.send({
        message: 'Welcom to Personal CRM System'
    })
});

// handles before https methods
const convertToLowercase = (req, res, next) => {
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].toLowerCase();
        }
    }
    next();
};

app.use(convertToLowercase);

// initialize router
const customerRouter = require('./app/routes/customer.route');
const customer_typesRouter = require('./app/routes/customer_types.route');
const customer_workRouter = require('./app/routes/customer_work.route');
const Company_KHRouter = require('./app/routes/company_KH.route');
const EventRouter = require('./app/routes/event.route');
const HabitRouter = require('./app/routes/habit.route');
const PositionRouter = require('./app/routes/position.route');
const Center_VNPTHGRouter = require('./app/routes/center_VNPTHG.route');
const DepartmentRouter = require('./app/routes/department.route');
const UnitRouter = require('./app/routes/unit.route');
const PermissionRouter = require('./app/routes/permission.route');
const RoleRouter = require('./app/routes/role.route');
const CycleRouter = require('./app/routes/cycle.route');
const EmployeeRouter = require('./app/routes/employee.route');
const AccountRouter = require('./app/routes/account.route');
const AppointmentRouter = require('./app/routes/appointment.route');
const TaskRouter = require('./app/routes/task.route');
const LogRouter = require('./app/routes/log.route');
const Role_PermissionRouter = require('./app/routes/role_permission.route');
const Customer_EventRouter = require('./app/routes/customer_event.route');
const Customer_HabitRouter = require('./app/routes/customer_habit.route');
const Task_EmployeeRouter = require('./app/routes/task_employee.route');
const MailRouter = require("./app/routes/mail.route");
const LoginRouter = require('./app/routes/login.route');
const notificationRouter = require('./app/routes/notification.route');

// use router
app.use('/api/customers', customerRouter);
app.use('/api/customer_types', customer_typesRouter);
app.use('/api/customer_works', customer_workRouter);
app.use('/api/company_khs', Company_KHRouter);
app.use('/api/events', EventRouter);
app.use('/api/habits', HabitRouter);
app.use('/api/positions', PositionRouter);
app.use('/api/center_vnpthgs', Center_VNPTHGRouter);
app.use('/api/departments', DepartmentRouter);
app.use('/api/units', UnitRouter);
app.use('/api/permissions', PermissionRouter);
app.use('/api/roles', RoleRouter);
app.use('/api/cycles', CycleRouter);
app.use('/api/employees', EmployeeRouter);
app.use('/api/accounts', AccountRouter);
app.use('/api/appointments', AppointmentRouter);
app.use('/api/tasks', TaskRouter);
app.use('/api/logs', LogRouter);
app.use('/api/role_permissions', Role_PermissionRouter);
app.use('/api/customer_events', Customer_EventRouter);
app.use('/api/customer_habits', Customer_HabitRouter);
app.use('/api/task_employees', Task_EmployeeRouter);
app.use("/api/mail", MailRouter);
app.use('/api/login', LoginRouter);
app.use('/api/notification', notificationRouter);
// check errors
app.use((req, res, next) => {
    return next(
        createError(404, 'Resource Not Found')
    );
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});


// exports
module.exports = app;

