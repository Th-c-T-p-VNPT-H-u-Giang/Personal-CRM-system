<script>
import Navbar from "./components/layout/navbar.vue";
import Footer from "./components/layout/footer.vue";
import Sidebar from "./components/layout/sidebar.vue";
import Login from "./login.vue";
import {
  reactive,
  defineComponent,
  watchEffect,
  ref,
  computed,
  watch,
  onMounted,
} from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  components: {
    Footer,
    Navbar,
    Sidebar,
    Login,
  },

  setup() {
    const data = reactive({
      activeMenuResponsive: false,
    });

    const updateMenuResponsive = () => {
      console.log("Received event from child component:");
    };

    //
    const route = useRoute();
    const isRootPath = ref(false);
    watch(
      () => route.fullPath,
      (newPath, oldPath) => {
        if (newPath == "/login") isRootPath.value = true;
        else {
          isRootPath.value = false;
        }
        // Xử lý khi chuyển trang xảy ra
        console.log("Đã chuyển từ:", oldPath);
        console.log("Đã chuyển đến:", newPath);
        // Thực hiện các hành động khác khi chuyển trang xảy ra
      }
    );

    return {
      data,
      updateMenuResponsive,
      isRootPath,
    };
  },
};
</script>

<template>
  <!-- <Login /> -->
  <!-- v-if="!isRootPath" -->
  <div>
    <RouterView v-if="isRootPath"></RouterView>
    <div class="container-fluid" v-if="!isRootPath">
      <div class="row position-relative">
        <div
          class="z-index-3"
          :class="[
            data.activeMenuResponsive
              ? 'd-block'
              : 'col-xl-2 d-none d-xl-block',
          ]"
        >
          <Sidebar />
        </div>
        <div class="col-xl-10 col-sm-12 z-index-2">
          <Navbar @showMenu="data.activeMenuResponsive = true" />
          <RouterView></RouterView>
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
