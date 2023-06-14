<!-- <template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import io from "socket.io-client";
export default {
  name: "SocketComponent",
  setup() {
    const message = ref("");

    onMounted(() => {
      const socket = io("http://localhost:3000/public");

      socket.on("connect", () => {
        console.log("Connected to server");

        socket.emit("message", "Hello, server!");
      });

      socket.on("message", (data) => {
        message.value = data;
        console.log("Received message:", data);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    });

    return {
      message,
    };
  },
};
</script> -->
