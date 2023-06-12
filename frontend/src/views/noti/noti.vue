<script>
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";

export default {
  name: "Notification",
  setup() {
    const socket = io("http://localhost:3000"); // Điều chỉnh URL kết nối socket tương ứng với máy chủ Node.js của bạn
    const notification = ref("");

    onMounted(() => {
      // Lắng nghe sự kiện "notification" từ máy chủ Node.js và cập nhật thông báo
      socket.on("notification", (message) => {
        notification.value = message;
      });
    });

    return {
      notification,
    };
  },
};
</script>
<template>
  <div>
    <h1>Notification</h1>
    <p>{{ notification }}</p>
  </div>
</template>
