<template>
  <input
    type="text"
    class="form-control"
<<<<<<< HEAD
    placeholder="Tìm Kiếm"
=======
    placeholder="Tìm kiếm"
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
    @input="$emit('update:searchText', $event.target.value)"
  />
</template>

<script>
import { reactive } from 'vue';
export default {
  setup() {
<<<<<<< HEAD
    const Data = reactive({
        searchText: '',
    });
    return {
        Data,
=======
    const data = reactive({
        searchText: '',
    });
    return {
        data,
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
    }
  }
};
</script>

<style scoped>
.container {
  background-color: #f8f9fa;
  height: 100vh;
  display: flex;
  align-items: center;
}

.input-group {
  width: 100%;
}
.form-control {
    background-color: inherit;
    border: 1px solid var(--gray);
}
</style>
