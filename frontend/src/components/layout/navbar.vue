<script>
import { defineEmits, inject, ref ,reactive, onMounted, computed, watch} from "vue";
import socket from '../../../socket';
import employeeService from "../../services/employee.service";
import taskService from "../../services/task.service";
import notificationService from "../../services/notification.service";
import { formatDateTime } from "../../assets/js/common";
// import Add1 from "./modal.vue";
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
  components: {
    // Add1,
  },
  props: {},

  setup(props, ctx) {
    const data = reactive({
      employeeName: sessionStorage.getItem("employeeName"),
      role: sessionStorage.getItem("role"),
      Notice: {},
      customers: [],
      selectedItem: {},
      TaskLD : [],
      TaskLDE: []
    })
    
    const emit = inject("emit");
    const updateMenuResponsive = () => {
      console.log("starting");
      ctx.emit("updateMenuResponsive", "true");
    };


    const hasNotification = ref(false);
    const showNotification = ref(false);
    const count = ref(0);

    const isRead = async (item)=>{
      data.selectedItem = item;
      item.isRead = true
      const item1 = await http_update(notificationService, item._id);
      if (count.value > 0) count.value --
    }

    const deleteOne = async (_id) => {
      const notification = await http_getOne(notificationService, _id);
      console.log("ID ne", _id);
      console.log("deleting", notification);
      const result = await http_deleteOne(notificationService, _id);
      refresh();
      if (count.value >0) count.value -- 
    }


    const deleteAll = async () => {
      const _idEmployee = sessionStorage.getItem("employeeId");
      const notification = await http_getOne(notificationService, _idEmployee);
      console.log("deleting", notification);
      const isConfirmed = await alert_delete(
        `Xoá thông báo`,
        `Bạn có chắc chắn muốn xoá tất cả thông báo không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await notificationService.deleteAll(_idEmployee);
        alert_success(
          `Xoá thông báo`,
          `Bạn đã xoá thành công tất cả thông báo`
        );
        refresh();
        count.value =0 
      }
    };

    const refresh = async () => {
      const _idEmployee = sessionStorage.getItem("employeeId");
      data.List = await employeeService.get(_idEmployee);
      console.log("Tên khách hàng",data.List.Tasks)
      data.Notice = await notificationService.get(_idEmployee);
      console.log("Tên thông báo",data.Notice)
      count.value = 0
      for (const value of data.Notice.documents) {
        if (value.isRead == false) {
          count.value++
          console.log("count value",count.value)
        }
        console.log("đém",value)
      }
    };
    

    const token = sessionStorage.getItem('token')
    const check = async (token) => {
      if (token) {
        const _idEmployee = sessionStorage.getItem("employeeId");
        const _nameEmployee = sessionStorage.getItem("employeeName");
        const object = {
          _id: _idEmployee,
          name: _nameEmployee
        }
        socket.on('notiTask', async ()=>{
          const _idEmployee = sessionStorage.getItem("employeeId");
          data.Notice = await notificationService.get(_idEmployee);
          console.log("notice",data.Notice.documents)
          hasNotification.value = true
          // for (let i = 0; i <= data.Notice.documents.length; i++) {
          //   if (data.Notice.documents[i].isRead == false)
          //     count.value++
          // }
          count.value = 0
          for (const value of data.Notice.documents) {
            if (value.isRead == false) {
              count.value++
              console.log("count value",count.value)
            }
            console.log("đém",value)
          }
        })
        const employees = await http_getOne(employeeService, _idEmployee)
        console.log('nhân viên nào', employees);
        const Tasks = employees.Tasks;

        Tasks.map( (value, index) => {          
          console.log('Task', index, ' = ' ,  value.Customers);
          data.customers.push(value.Customers);
        })

        const TasksLD = await http_getAll(taskService)
        data.TaskLD = TasksLD.filter(async value => {
          const TasksLDE = await http_getOne(taskService,value._id)          
          console.log('LDE neeeee', TasksLDE);
          if (_idEmployee == value.leaderId){
            socket.emit('cycleCus',TasksLDE)
          }
        })
        console.log('Data task leader', data.TaskLD);
        for (const value of data.TaskLD) {
          console.log('Data ', value);
        }
        console.log('hihi',TasksLD);
        socket.emit('birthday',data.customers,_idEmployee,_nameEmployee)
       }
    }    

    onMounted(async () => {
      const _idEmployee = sessionStorage.getItem("employeeId");
      data.Notice = await notificationService.get(_idEmployee);
      console.log("Tên thông báo",data.Notice)
      count.value = 0
      for (const value of data.Notice.documents) {
        if (value.isRead == false) {
          count.value++
          console.log("count value",count.value)
        }
      }
    });

    const toggleNotification = () => {
      showNotification.value = !showNotification.value;
      hasNotification.value = false
    };

    const clearNotification = () => {
      showNotification.value = false;
    };

    check(token)

    return {
      updateMenuResponsive,
      hasNotification,
      clearNotification,
      count,
      toggleNotification,
      showNotification,
      data,
      deleteOne,
      deleteAll,
      isRead,
      formatDateTime,
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
        <span class="notification-dot">{{ count }}</span>
      </a>
      <div v-if="showNotification" class="notification-dropdown">
        <h6 class="font-weight-bold mb-4">THÔNG BÁO</h6>
        <div
          v-for="item in data.Notice.documents"
          :key="item"
          style="align-items: center;"
          class="d-flex justify-content-between mb-3 line"
        >
          <p @click="isRead(item)" id="add" data-toggle="modal"
          data-target="#model-noti" class="NoticeDetails">
            <strong>{{ item.title }}</strong>
            <br><strong>{{ item.sender }}</strong> {{ item.content }} 
            <br>{{ formatDateTime(item.createdAt) }}
          </p>
            <div class="modal" id="model-noti">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  <!-- Modal Header -->
                  <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 15px">
                      Chi tiết thông báo
                    </h4>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      @click="activeStep = 1"
                    >
                      &times;
                    </button>
                  </div>
                  <!-- Modal body -->
                  <div class="model-body">
                    <div class="d-flex">
                      <div
                        class="d-flex flex-grow-1 step-content px-3 my-3"
                        style="width: 10000px"
                      >
                        <div class="d-flex justify-content-around">
                          <div class="mt-3">
                            <p>
                              <span class="font-weight-bold">Từ: </span>
                              {{ data.selectedItem.sender }}
                            </p>
                            <p>
                              <span class="font-weight-bold">Tiêu đề: </span>
                              {{ data.selectedItem.title }}
                            </p>
                            <p>
                              <span class="font-weight-bold">Nội dung: </span>
                              {{ data.selectedItem.content }}
                            </p>
                            <p>
                              <span class="font-weight-bold">Được tạo lúc: </span>
                              {{ formatDateTime(data.selectedItem.createdAt) }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>         
            <p class="notify-icon">
              <span :style="{ 'color': item.isRead ? 'gray' : 'blue' }" style="font-size: 20px;" class="material-symbols-outlined">
                fiber_manual_record
                </span>
              <span style="font-size: 20px; cursor: pointer" @click="deleteOne(item._id)" class="material-symbols-outlined none">
              close
              </span>
            </p>
        </div>
        <button @click="deleteAll()" class="clearNotification">
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

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 300,
  'GRAD' 0,
  'opsz' 48
}

h6 {
  border-bottom: 1px solid #ccc;
  height: 50px;
  padding-top: 10px;
}
.NoticeDetails {
  height: auto;
  padding: 5px;
  margin: 0;
  cursor: pointer;
  flex-basis: 350px;
}
.line{
  border-bottom: 1px solid rgb(216, 217, 218);
}
.none{
  display: none;
}
.line:hover .none {  
  display: block;
}
.line:hover {
  background-color: aliceblue;
}
.notify-icon{
  position: relative;
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
