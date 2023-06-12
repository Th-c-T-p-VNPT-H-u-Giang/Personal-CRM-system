<script>
import Navbar from "./components/layout/navbar.vue";
import Footer from "./components/layout/footer.vue";
import Sidebar from "./components/layout/sidebar.vue";
import Login from "./login.vue";
import { reactive, defineComponent, watchEffect, ref, computed } from "vue";
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
    const routePath = ref("");

    const isRootPath = computed(() => routePath.value === "/");

    // const isAPath = computed(() => routePath.value === "/a");

    // Lắng nghe sự thay đổi của đường dẫn
    watchEffect(() => {
      routePath.value = window.location.pathname;
    });
    return {
      data,
      updateMenuResponsive,
      isRootPath,
      // isAPath,
    };
  },
};
</script>

<template>
  <!-- <Login /> -->
  <div class="container-fluid">
    <div class="row position-relative">
      <div
        v-if="!isRootPath"
        class="z-index-3"
        :class="[
          data.activeMenuResponsive ? 'd-block' : 'col-xl-2 d-none d-xl-block',
        ]"
      >
        <Sidebar />
      </div>
      <div class="col-xl-10 col-sm-12 z-index-2">
        <Navbar
          @showMenu="data.activeMenuResponsive = true"
          v-if="!isRootPath"
        />
        <RouterView></RouterView>
        <Footer v-if="!isRootPath" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
