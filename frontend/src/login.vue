<template>
  <div class="container-fluid">
    <div
      class="row justify-content-center align-items-center vh-100"
      style="
        background-image: url(https://www.ebillity.com/wp-content/uploads/2019/08/CRM.jpg);
        background-repeat: no-repeat;
        background-size: 100%;
      "
    >
      <div class="col-lg-4">
        <div class="card shadow bg-bray">
          <div class="card-body p-5">
            <h5 class="card-title text-center mb-4">
              <img src="./assets/images/logo.png" alt="" style="width: 200px" />
            </h5>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="text" class="form-label">User Name</label>
                <input
                  v-model="user_name"
                  type="text"
                  class="form-control"
                  id="user_name"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const user_name = ref("");
    const password = ref("");
    const router = useRouter();

    // Xử lý sự kiện đăng nhập
    const login = async () => {
      try {
        // Gửi yêu cầu POST tới backend để kiểm tra đăng nhập
        const response = await axios.post("http://localhost:3000/api/login", {
          user_name: user_name.value,
          password: password.value,
        });
        localStorage.setItem("token", response.data.token);

        // Kiểm tra phản hồi từ backend
        if (response.data.success) {
          console.log(response.data.message);
          console.log(response);
          console.log("USERNAME:", user_name.value);
          console.log("PASSWORD:", password.value);

          // Đăng nhập thành công, chuyển hướng đến trang chủ
          router.push("/");
        } else {
          // Đăng nhập thất bại, xử lý thông báo lỗi hoặc hiển thị thông báo lỗi trên giao diện
          console.log(response.data.message);
          router.push("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const check = () => {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    check()
    return {
      user_name,
      password,
      login,

    };
  },
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
}

.card {
  border: none;
  border-radius: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0069d9;
}

.vh-100 {
  height: 100vh;
}
</style>
