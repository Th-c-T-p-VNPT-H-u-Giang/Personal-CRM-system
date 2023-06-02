<script>
import { reactive, ref, defineEmits, defineProps } from "vue";

export default {
  props: {
    activeIndex: {
      type: Number,
      default: 1,
    },
    activeIndexChild: {
      type: Number,
      default: -1,
    },
  },
  setup(props) {
    const data = reactive({
      sidebarToggle: true,
      sidebarTasks: [
        {
          id: 1,
          icon: "dashboard_customize",
<<<<<<< HEAD
=======
          name_icon: "Thống kê",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Dashboard",
          role: [],
          children: [],
        },
        {
          id: 2,
          icon: "connect_without_contact",
<<<<<<< HEAD
=======
          name_icon: "Khách hàng",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Customer",
          role: [],
          children: [],
        },
        {
          id: 3,
<<<<<<< HEAD
          icon: "sprint",
          name: "Activity",
=======
          icon: "event",
          name_icon: "Sự kiện",
          name: "Event",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          role: [],
          children: [],
        },
        {
          id: 4,
          icon: "badge",
<<<<<<< HEAD
=======
          name_icon: "Nhân viên",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Employee",
          role: [],
          children: [],
        },
        {
          id: 5,
<<<<<<< HEAD
          icon: "apartment",
          name: "Unit",
          role: [],
          children: [],
        },
        {
          id: 6,
          icon: "assignment",
=======
          icon: "assignment",
          name_icon: "Phân công",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Assignment",
          role: [],
          children: [],
        },
        {
<<<<<<< HEAD
          id: 7,
          icon: "acute",
          name: "Appointment",
          role: [],
          children: [],
        },
        {
          id: 8,
          icon: "account_circle",
=======
          id: 6,
          icon: "account_circle",
          name_icon: "Tài khoản",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Account",
          role: [],
          children: [],
        },
        {
<<<<<<< HEAD
          id: 9,
          icon: "report",
=======
          id: 7,
          icon: "report",
          name_icon: "Báo cáo",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Report",
          role: [],
          children: [],
        },
        {
<<<<<<< HEAD
          id: 10,
          icon: "settings",
=======
          id: 8,
          icon: "settings",
          name_icon: "Cài đặt",
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
          name: "Setting",
          role: [],
          children: [],
        },
      ],
    });
    return {
      data,
    };
  },
};
</script>

<template>
  <div class="border-sidebar">
    <div class="d-flex flex-column">
      <div id="img-logo" class="d-flex justify-content-center">
        <img class="img border-img" src="../../assets/images/logo.png" alt="" />
      </div>
      <div class="mt-3">
        <div
          v-for="(sidebarTask, index) in data.sidebarTasks"
          :key="sidebarTask.id"
          class="d-flex flex-column align-items-center"
        >
          <router-link
            :to="{ name: sidebarTask.name }"
            class="my-2 d-flex overflow-hidden"
            :class="[
              sidebarTask.id == activeIndex
                ? 'border-nav-item'
                : 'none-border-nav-item',
            ]"
            @click="activeIndex = index + 1"
          >
            <div class="d-flex py-1 align-items-center">
              <span
                class="material-symbols-outlined mx-2 py-1 px-1"
                :class="[
                  sidebarTask.id == activeIndex
                    ? 'none-border-icon'
                    : 'border-icon',
                ]"
              >
                {{ sidebarTask.icon }}
              </span>
              <span class="d-flex align-items-center" style="font-size: 15px;">{{
<<<<<<< HEAD
                sidebarTask.name
=======
                sidebarTask.name_icon
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
              }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-sidebar {
  border: 1px solid var(--gray);
  border-bottom: 0;
  border-top: 0;
  border-left: 0;
  height: 100vh;
  max-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: auto;
  overflow-y: hidden;
}
.img {
  width: 250px;
}
.border-img {
  border: 1px solid var(--gray);
  border-top: 0;
  border-left: 0;
  border-right: 0;
}
.border-nav-item {
  border: 1px solid var(--gray);
  width: 90%;
  cursor: pointer;
  border-radius: 5px;
<<<<<<< HEAD
=======
  color: blue;
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
}
.none-border-nav-item {
  width: 90%;
  cursor: pointer;
  border: none;
}

.border-icon {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.none-border-icon {
  border: none;
}

<<<<<<< HEAD
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
  display: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(234 179 8);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
}
=======
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
</style>
