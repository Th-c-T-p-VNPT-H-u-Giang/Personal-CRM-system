<script>
import { defineEmits, inject, ref } from "vue";
import socket from '../../../socket';


export default {
  props: {},
  
  setup(props, ctx) {
    const emit = inject('emit');
    const hasNotification = ref(false);
    const count = ref(0);

    const updateMenuResponsive = () => {
      console.log('starting');
      ctx.emit("updateMenuResponsive", "true");
    };

    socket.on('upcoming_birthday', (data) => {
      console.log("độ dài",data);
      if (data.name.length!=null){
        hasNotification.value = true;
        count.value++;
        console.log('Đếm: ', count.value);
      }      
    });
    const clearNotification = () => {
      hasNotification.value = false;
      count.value = 0;
    };

    return {
      updateMenuResponsive,
      hasNotification,
      count,
      clearNotification
    };
  },
};
</script>

<template>
  <nav class="d-flex align-items-center justify-content-between my-3 ml-2 py-1 border-nav px-2">
    <a class="text-dark h5 my-auto d-none d-xl-block">PERSONAL CRM SYSTEM</a>
    <a class="d-xl-none d-sm-block text-dark h5 my-auto">
      <span class="material-symbols-outlined cursor-pointer" @click="$emit('showMenu')"> menu </span>
    </a>
    <div class="d-flex align-content-center justify-content-between">
      <a class="text-dark d-flex align-items-center">
        <span class="material-symbols-outlined cursor-pointer"> search </span>
      </a>
      <a class="text-dark d-flex align-items-center mx-2">
        <span class="material-symbols-outlined cursor-pointer"> translate </span>
      </a>
      <a class="text-dark d-flex align-items-center">
        <span class="material-symbols-outlined cursor-pointer"> light_mode </span>
      </a>
      <a class="text-dark d-flex align-items-center mx-2 notification-icon" @click="clearNotification">
        <span class="material-symbols-outlined cursor-pointer"> notifications </span>
        <span v-if="hasNotification" class="notification-dot">{{ count }}</span>
    </a>
      <div class="d-flex align-content-center">
        <img class="rounded-circle avatar cursor-pointer" src="https://s1.media.ngoisao.vn/resize_580/news/2022/06/08/trieu-le-dinh-3-ngoisaovn-w1365-h2048.jpg" alt="Avatar" />
        <div class="d-xl-flex d-none flex-column align-items-center justify-content-center ml-2">
          <span class="font-size-13">Keyone</span>
          <span class="italic-text font-size-13">Employee</span>
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
.font-size-13 {
  font-size: 13px;
}

/* .notification-dot {
  width: 17px;
  height: 17px;
  background-color: var(--red);
  border-radius: 50%;
  display: inline-block;
  margin-left: 5px;
} */

.notification-icon {
  position: relative;
}

/* .notification-dot {
  position: absolute;
  top: 9px;
  right: -2px;
} */
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

</style>