<script>
import Navbar from "./components/layout/navbar.vue";
import Footer from "./components/layout/footer.vue";
import Sidebar from "./components/layout/sidebar.vue";
<<<<<<< HEAD
=======
import Login from "./login.vue";
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
import { reactive, defineComponent } from "vue";
export default {
  components: {
    Footer,
    Navbar,
    Sidebar,
<<<<<<< HEAD
=======
    Login,
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
  },
  setup() {
    const data = reactive({
      activeMenuResponsive: false,
    });
<<<<<<< HEAD
    const updateMenuResponsive = (value) => {
      console.log("Received event from child component:", value);
    }
    return {
      data,
      updateMenuResponsive
=======
    const updateMenuResponsive = () => {
      console.log("Received event from child component:");
    };
    return {
      data,
      updateMenuResponsive,
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
    };
  },
};
</script>

<template>
<<<<<<< HEAD
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-2 d-none d-xl-block">
        <Sidebar @updateMenuResponsive="updateMenuResponsive" />
      </div>
      <div class="col-xl-10 col-sm-12">
        <Navbar />
=======
  <!-- <Login /> -->
  <div class="container-fluid">
    <div class="row position-relative">
      <div
        class="z-index-3"
        :class="[
          data.activeMenuResponsive ? 'd-block' : 'col-xl-2 d-none d-xl-block',
        ]"
      >
        <Sidebar />
      </div>
      <div class="col-xl-10 col-sm-12 z-index-2">
        <Navbar @showMenu="data.activeMenuResponsive = true" />
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
        <RouterView></RouterView>
        <Footer />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
<<<<<<< HEAD

=======
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
