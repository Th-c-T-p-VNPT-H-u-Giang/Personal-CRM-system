<script>
import { defineEmits, inject, ref ,reactive, onMounted} from "vue";
import io from "socket.io-client";
import socket from '../../../socket';
import employeeService from "../../services/employee.service";
import notificationService from "../../services/notification.service";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
} from "../../assets/js/common.http";
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
} from "../../assets/js/common.alert";

export default {
  props: {},

  setup(props, ctx) {
    const data = reactive({
      employeeName: sessionStorage.getItem("employeeName"),
      role: sessionStorage.getItem("role"),
      List: {
        _id: "",
        name: "",
        birthday: "",
        // avatar: "",
        address: "",
        phone: "",
        email: "",
        Position: {
          _id: "",
          name: "",
        },
        Unit: {
          _id: "",
          name: "",
          Department: {
            _id: "",
            name: "",
            Center_VNPTHG: {
              name: "",
              _id: "",
            },
          },
        },
        Tasks: {
          start_date: "",
          end_date: "",
          content: "",
          _id: "",
          customerId: "",
          cycleId: "",
          leaderId: "",
          Employee_Task: {
            TaskId: "",
            EmployeeId: "",
          },
          Cycles: {
            _id: "",
            name: "",
          },
          Customers: {
            _id: "",
            name: "",
            phone: "",
            email: "",
            address: "",
            avatar: "",
          },
          Status: {
            _id: "",
            status: "",
            reason: "",
          },
        },
      },
      Notice: {}
    })
    const emit = inject("emit");
    const hasNotification = ref(false);
    // const upcomingBirthdayData = ref(null);
    const showNotification = ref(false);
    const upcomingBirthdayData = ref([]);
    const count = ref(0);
    const updateMenuResponsive = () => {
      console.log("starting");
      ctx.emit("updateMenuResponsive", "true");
    };


    const deleteOne = async (_id) => {
      const notification = await http_getOne(notificationService, _id);
      console.log("ID ne", _id);
      console.log("deleting", notification);
      const isConfirmed = await alert_delete(
        `Xoá thông báo`,
        `Bạn có chắc chắn muốn xoá thông báo  của nhân viên  không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await http_deleteOne(notificationService, _id);
        alert_success(
          `Xoá thông báo`,
          `Bạn đã xoá thành công thông báo  của nhân viên `
        );
        refresh();
      }
    };


    // const deleteAll = async (_id) => {
    //   const notification = await http_getOne(notificationService, _id);
    //   console.log("deletingall", notification);
    //   const isConfirmed = await alert_delete(
    //     `Xoá thông báo`,
    //     `Bạn có chắc chắn muốn xoá hết tất cả thông báo không?`
    //   );
    //   console.log(isConfirmed);
    //   if (isConfirmed == true) {
    //     const result = await http_deleteAll(notificationService, _id);
    //     alert_success(
    //       `Xoá thông báo`,
    //       `Bạn đã xoá thành công tất cả thông báo`
    //     );
    //     refresh();
    //   }
    // };

    const refresh = async () => {
      const _idEmployee = sessionStorage.getItem("employeeId");
      data.List = await employeeService.get(_idEmployee);
      console.log("Tên khách hàng",data.List.Tasks)
      data.Notice = await notificationService.get(_idEmployee);
      console.log("Tên thông báo",data.Notice)
    };

    const token = sessionStorage.getItem('token')
    if (token) {
      const _idEmployee = sessionStorage.getItem("employeeId");
      const _nameEmployee = sessionStorage.getItem("employeeName");
      const object = {
        _id: _idEmployee,
        name: _nameEmployee
      }
        ////Danh sách
          // console.log("data view:", value);
          
        ///////////////////////
        // socket.emit('birthday', object)
        // socket.on('upcoming_birthday', (data) => {
        //   hasNotification.value = true;
        //   count.value++;
        //   upcomingBirthdayData.value.push(data);
        //   console.log("Đếm",count.value);
        //   if (data) {
        //     console.log('Data received from server' , data);
        //   } else {
        //     console.log('Data not received from server');
        //   }
        // });
    }
    onMounted(async () => {
      const _idEmployee = sessionStorage.getItem("employeeId");
      data.List = await employeeService.get(_idEmployee);
      console.log("Tên khách hàng",data.List.Tasks)
      data.Notice = await notificationService.get(_idEmployee);
      console.log("Tên thông báo",data.Notice)
      count.value = data.Notice.documents.length
    });
    const toggleNotification = () => {
      showNotification.value = !showNotification.value;
      count.value = 0;
      hasNotification.value = false
    };

    const clearNotification = () => {
      upcomingBirthdayData.value = [];
      showNotification.value = false;
      count.value = 0;
    };

    const currentDateTime = ref(new Date().toLocaleString());
    return {
      updateMenuResponsive,
      hasNotification,
      upcomingBirthdayData,
      clearNotification,
      count,
      toggleNotification,
      showNotification,
      currentDateTime,
      data,
      deleteOne
    };
  },
};
</script>

<template>
  <nav
    class="d-flex align-items-center justify-content-between my-3 ml-2 py-1 border-nav px-2"
  >
    <a class="text-dark h5 my-auto d-none d-xl-block">PERSONAL CRM SYSTEM</a>
    <a class="d-xl-none d-sm-block text-dark h5 my-auto">
      <span
        class="material-symbols-outlined cursor-pointer"
        @click="$emit('showMenu')"
      >
        menu
      </span>
    </a>
    <div class="d-flex align-content-center justify-content-between">
      <a class="text-dark d-flex align-items-center">
        <span class="material-symbols-outlined cursor-pointer"> search </span>
      </a>
      <a class="text-dark d-flex align-items-center mx-2">
        <span class="material-symbols-outlined cursor-pointer">
          translate
        </span>
      </a>
      <a class="text-dark d-flex align-items-center">
        <span class="material-symbols-outlined cursor-pointer">
          light_mode
        </span>
      </a>
      <a
        class="text-dark d-flex align-items-center mx-2 notification-icon"
        @click="toggleNotification"
      >
        <span class="material-symbols-outlined cursor-pointer">
          notifications
        </span>
        <span v-if="hasNotification" class="notification-dot">{{ count }}</span>
      </a>
      <div v-if="showNotification" class="notification-dropdown">
        <h6 class="font-weight-bold mb-4">THÔNG BÁO</h6>
        <div class="pb-3 mb-3 border-bottom" style="margin-left: 2px">
          <button @click="markAllAsRead" class="btn btn-primary mr-2">
            Tất Cả
          </button>
          <button @click="markUnread" class="btn btn-primary">Chưa Đọc</button>
        </div>
        <div
          v-for="item in data.Notice.documents"
          :key="item"
          class="d-flex justify-content-between mb-3"
        >
          <p class="NoticeDetails">
            <strong>{{ item.title }}</strong>
            <br><strong>{{ item.sender }}</strong> {{ item.content }} 
          </p>
          <p style="cursor: pointer" @click="deleteOne(item._id)">x</p>
        </div>
        <button @click="deleteAll(item.idRecipient)" class="clearNotification">
          Xóa Thông Báo
        </button>
      </div>

      <!-- ... -->
      <div class="d-flex align-content-center">
        <img
          class="rounded-circle avatar cursor-pointer"
          src="https://s1.media.ngoisao.vn/resize_580/news/2022/06/08/trieu-le-dinh-3-ngoisaovn-w1365-h2048.jpg"
          alt="Avatar"
        />
        <div
          class="d-xl-flex d-none flex-column align-items-center justify-content-center ml-2"
        >
          <span class="font-size-13">Keyone</span>
          <span class="italic-text font-size-13">Employee</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
h6 {
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding-top: 10px;
}
.NoticeDetails {
  height: 65px;
  padding: 5px;
  margin: 0;
  border-bottom: 1px dashed rgb(216, 217, 218);
  cursor: pointer;
  flex-basis: 350px;
}
.NoticeDetails:hover {
  background-color: aliceblue;
}
.notification-dropdown {
  position: absolute;
  top: 68px;
  right: 0;
  width: 400px;
  max-height: calc(85vh - 120px); /* Adjust this value as needed */
  overflow-y: auto;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-right: 14px;
  z-index: 3;
  /* display: grid;
  grid-template-columns: 250px 100px;
  grid-gap: 10px; */
}
.notification-dropdown::before {
  content: "";
  position: absolute;
  top: -10px;
  left: calc(50% - 18px);
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid white;
}
.markAllAsRead {
  border: 1px solid rgb(188, 229, 255);
  border-radius: 8px;
  background-color: rgb(188, 229, 255);
  font-size: 12px;
  padding: 5px;
  color: rgb(69, 69, 246);
  font-weight: bold;
}
.markUnread {
  border: 1px solid rgb(188, 229, 255);
  border-radius: 8px;
  /* background-color:  rgb(188, 229, 255); */
  font-size: 12px;
  padding: 5px;
  color: rgb(69, 69, 246);
  font-weight: bold;
}
.color-dark {
  color: var(--dark);
}
.border-nav {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.avatar {
  width: 50px;
  height: 50px;
}
.italic-text {
  font-style: italic;
}
.cursor-pointer {
  cursor: pointer;
}
.font-size-13 {
  font-size: 13px;
}
.notification-icon {
  position: relative;
}
.notification-dot {
  position: absolute;
  top: 37%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 17px;
  height: 17px;
  background-color: var(--red);
  border-radius: 50%;
  display: inline-block;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 17px;
  margin-left: 5px;
}
.clearNotification {
  position: sticky;
  bottom: 10px; /* Adjust this value as needed */
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  padding: 10px; /* Add padding for better visibility */
  font-weight: bold;
}
.clearNotification::after {
  content: "";
  position: absolute;
  top: 128%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
</style>
