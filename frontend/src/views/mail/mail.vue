<template>
  <div>
    <button @click="sendEmail">Gửi email</button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import mailService from "../../services/mai.service";
export default {
  setup() {
    const sendEmail = async () => {
      try {
        await mailService.sendmail();
        console.log("Email sent successfully.");
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };

    return {
      sendEmail,
    };
  },
};
</script>
