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
      <button class="btn btn-outline-danger" @click="handleLogout">
          Đăng xuất
        </button>
</template>

<style scoped>

</style>