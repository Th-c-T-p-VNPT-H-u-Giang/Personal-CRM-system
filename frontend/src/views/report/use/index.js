import {
  reactive,
  Customer,
  http_getAll,
  Employee,
  Customer_Work,
  Task,
} from "../../common/import";

const data = reactive({
  items: [],
});

export const countCustomer = async () => {
  const res = await http_getAll(Customer);
  return res.documents.length;
};

export const countEmployee = async () => {
  const res = await http_getAll(Employee);
  return res.length;
};

// khách hàng đã lâu chưa chăm sóc

export const countElementReportPage = async () => {
  const cusWork = await http_getAll(Customer_Work);
  data.items = cusWork.documents.filter((cusWork) => {
    const taskCusCared = cusWork.Customer.Tasks.filter((task) => {
      if (task.Status_Task.name == "đã chăm sóc") {
        // lấy các khách hàng đã chăm sóc
        const cycle = task.Cycle.name; // lấy chu kì
        let start_date = task.start_date; // lấy ngày bắt đầu
        start_date = new Date(start_date); // chuyển chuổi sang date

        let numberOfCycle = cycle.replace(/\D/g, ""); // lấy số trong chu kì

        numberOfCycle = +numberOfCycle; // ép kiểu sang số nguyên

        var cycleDate = 0;
        var cycleMonth = 0;
        var cycleYear = 0;
        switch (true) {
          case cycle.includes("ngày"):
            cycleDate = numberOfCycle; // Nửa sửa bỏ nhân 2
            break;
          case cycle.includes("tháng"):
            cycleMonth = numberOfCycle; // Nửa sửa bỏ nhân 2
            break;
          case cycle.includes("năm"):
            cycleYear = numberOfCycle; // Nửa sửa bỏ nhân 2
            break;
          case cycle.includes("tuần"):
            cycleDate = numberOfCycle * 7;
            break;
        }

        // lần bắt đầu đầu tiên
        start_date.setDate(start_date.getDate() + cycleDate);
        start_date.setMonth(start_date.getMonth() + cycleMonth);
        start_date.setFullYear(start_date.getFullYear() + cycleYear);
        const year = start_date.getFullYear();
        const month = start_date.getMonth() + 1;
        const day = start_date.getDate();
        const dayStartNewCycle = year + "-" + month + "-" + day; // ngày bắt đầu chu kì mới

        // lần bắt đầu thứ 2
        cycleDate = cycleDate * 2;
        cycleMonth = cycleMonth * 2;
        cycleYear = cycleYear * 2;
        start_date.setDate(start_date.getDate() + cycleDate);
        start_date.setMonth(start_date.getMonth() + cycleMonth);
        start_date.setFullYear(start_date.getFullYear() + cycleYear);
        const year2 = start_date.getFullYear();
        const month2 = start_date.getMonth() + 1;
        const day2 = start_date.getDate();
        const dayStartNewCycle2 = year2 + "-" + month2 + "-" + day2;

        task.dayStartNewCycle2 = dayStartNewCycle2;
        task.dayStartNewCycle = dayStartNewCycle;
        return task;
      }
    });

    const rsTaskCusCared = taskCusCared.filter((value) => {
      console.log("Value", value);
      if (value.customerId == cusWork.Customer._id) {
        return cusWork.Customer.Tasks.filter((task) => {
          if (
            value.dayStartNewCycle2 == task.start_date &&
            value.dayStartNewCycle != task.start_date
          ) {
            console.log("Run");
          } else {
            return value;
          }
        });
      }
    });

    if (rsTaskCusCared.length > 0) {
      return rsTaskCusCared;
    }
  });

  //   console.log("data items in use index", data.items.length);
  return data.items.length;
};

// khách hàng tới chu kì nhưng chưa chăm sóc

export const countElementReportCustomerCyclePage = async () => {
  const cusWork = await http_getAll(Customer_Work);
  data.items = cusWork.documents.filter((cusWork) => {
    const taskCusCared = cusWork.Customer.Tasks.filter((task) => {
      if (task.Status_Task.name == "đã chăm sóc") {
        const cycle = task.Cycle.name;
        let start_date = task.start_date;
        // console.log(start_date);
        start_date = new Date(start_date);
        // console.log('end_date: ' + end_date);

        let numberOfCycle = cycle.replace(/\D/g, ""); // lấy số trong chuổi

        numberOfCycle = +numberOfCycle; // chuyển chuổi thành số nguyên

        var cycleDate = 0;
        var cycleMonth = 0;
        var cycleYear = 0;
        switch (true) {
          case cycle.includes("ngày"):
            cycleDate = numberOfCycle;
            break;
          case cycle.includes("tháng"):
            cycleMonth = numberOfCycle;
            break;
          case cycle.includes("năm"):
            cycleYear = numberOfCycle;
            break;
          case cycle.includes("tuần"):
            cycleDate = numberOfCycle * 7;
            break;
        }

        start_date.setDate(start_date.getDate() + cycleDate);
        start_date.setMonth(start_date.getMonth() + cycleMonth);
        start_date.setFullYear(start_date.getFullYear() + cycleYear);

        const year = start_date.getFullYear();
        const month = start_date.getMonth() + 1;
        const day = start_date.getDate();
        const dayStartNewCycle = year + "-" + month + "-" + day; // ngày bắt đầu chu kì mới
        task.dayStartNewCycle = dayStartNewCycle;
        return task;
      }
    });

    const rsTaskCusCared = taskCusCared.filter((value) => {
      if (value.customerId == cusWork.Customer._id) {
        return cusWork.Customer.Tasks.filter((task) => {
          if (value.dayStartNewCycle == task.start_date) {
            console.log("Run");
          } else {
            // console.log('Value');
            return value;
          }
        });
      }
    });

    if (rsTaskCusCared.length > 0) {
      return rsTaskCusCared;
    }
  });

  return data.items.length;
};

// khách hàng do nhân viên chăm sóc

export const countElementReportAssignmentStaff = async () => {
  const tasks = await http_getAll(Task);
  return tasks.filter((task, index) => {
    return (
      tasks.findIndex((value) => value.Customer._id === task.Customer._id) ===
      index
    );
  }).length;
};

// khách hàng do lảnh đạo phụ trách
export const countElementReportLeaderCustomer = async () => {
  const leaderId = sessionStorage.getItem("employeeId");

  const tasks = await http_getAll(Task);
  return tasks.filter((task) => {
    return task.leaderId == task.Employee._id && task.leaderId == leaderId; // người giao việc và nhân viên là mình
  }).length;
};

// nhân viên do lảnh đạo phụ trách
export const countElementReportLeaderStaff = async () => {
  const leaderId = sessionStorage.getItem("employeeId");
  const tasks = await http_getAll(Task);
  return tasks.filter((task, index) => {
    console.log("task", task);
    if (task.leaderId == leaderId) {
      return (
        tasks.findIndex((value) => value.Employee._id === task.Employee._id) ===
        index
      );
    }
  }).length;
};
