<script>
import { useRouter } from "vue-router";
export default{
    setup (){
        const router = useRouter()
        const handleLogout = () => {
          localStorage.removeItem("token");
          router.push('/login')
        }
        return{
            handleLogout
        }
    }

}
</script>

<template>
      <button class="header__right-link text-decoration-none text-white bg-dark" style="outline: none; border: none;" @click="handleLogout">
          <i class="fa-solid fa-power-off"></i>
          Đăng xuất
        </button>
</template>

<style scoped>

</style>