<script>
import { defineEmits, inject, reactive } from "vue";
import socket from "../../socket";
import {
  Nofifications,
  http_getOne,
  Employee,
} from "../../views/common/import";

export default {
  props: {},
  setup(props, ctx) {
    const data = reactive({
      employeeName: sessionStorage.getItem("employeeName"),
      role: sessionStorage.getItem("role"),
      customers: [],
    });

    const updateMenuResponsive = () => {
      console.log("starting");
      ctx.emit("updateMenuResponsive", "true");
    };

    const token = sessionStorage.getItem("token");
    const check = async (token) => {
      if (token) {
        const _idEmployee = sessionStorage.getItem("employeeId");
        const employees = await http_getOne(Employee, _idEmployee);
        console.log("Khách hàng thuộc nhân viên", employees.Tasks);
        const Tasks = employees.Tasks;

        Tasks.map((value, index) => {
          console.log("Task", index, " = ", value.Customers);
          data.customers.push(value.Customers);
        });

        socket.emit('birthday customer by staff', data.customers);



        socket.on("add assignment for staff from server", async () => {
          const document = await http_getOne(Nofifications, _idEmployee);
          console.log("add assignment for staff from server", document);
        });

      }
    };

    check(token);

    return {
      updateMenuResponsive,
      data,
    };
  },
};
</script>

<template>
  <nav class="d-flex align-items-center justify-content-between my-3 ml-2 py-1 border-nav px-2">
    <a class="text-dark h5 my-auto d-none d-xl-block">PERSONAL CRM SYSTEM</a>
    <a class="d-xl-none d-sm-block text-dark h5 my-auto"><span class="material-symbols-outlined cursor-pointer"
        @click="$emit('showMenu')">
        menu
      </span></a>
    <div class="d-flex align-content-center justify-content-between">
      <a class="text-dark d-flex align-items-center"><span class="material-symbols-outlined cursor-pointer">
          search
        </span></a>
      <a class="text-dark d-flex align-items-center mx-2"><span class="material-symbols-outlined cursor-pointer">
          translate
        </span></a>
      <a class="text-dark d-flex align-items-center"><span class="material-symbols-outlined cursor-pointer">
          light_mode
        </span></a>
      <a class="text-dark d-flex align-items-center mx-2">
        <span class="material-symbols-outlined cursor-pointer notification">
          notifications
          <div class="notification__hover font-size-13" >
            <p class="notification__title">Thông báo</p>
            <ul>
              <li>Hello</li>
              <li>lalal</li>
              <li>dasd</li>
            </ul>
          </div>
        </span>
      </a>
      <div class="d-flex align-content-center">
        <img class="rounded-circle avatar cursor-pointer"
          src="https://s1.media.ngoisao.vn/resize_580/news/2022/06/08/trieu-le-dinh-3-ngoisaovn-w1365-h2048.jpg"
          alt="Avatar" />
        <div class="d-xl-flex d-none flex-column align-items-center justify-content-center ml-2">
          <span class="font-size-13">{{ data.employeeName }}</span>
          <span class="italic-text font-size-13">{{ data.role }}</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
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

.notification {
  position: relative;
  top: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.notification__hover::before {
  content: "";
  position: absolute;
  top: -28px;
  right: 8px;
  border-style: solid;
  border-width: 20px 27px;
  border-color: transparent transparent white transparent;
  /* background: red; */
}

.notification__hover {
  position: absolute;
  top: 30px;
  right: -22px;
  width: 220px;
  min-height: 200px;
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 4px;
  transform-origin: calc(100% - 20px) top;
  will-change: opacity transform;
  animation: notificationHover ease-in 0.2s;
  /* display: none; */
}

.notification:hover .notification__hover {
  display: block;
}


@keyframes notificationHover {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
    /* scale là thuộc tính lớn lên */
  }
}


.notification__title {
  /* font-family: Arial, Helvetica, sans-serif; */
}
.font-size-13 {
  font-size: 13px;
}
</style>
