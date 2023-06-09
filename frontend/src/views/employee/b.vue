<template>
  <div>
    <p>Dữ liệu từ Component A: {{ dataFromA }}</p>
    <p>Dữ liệu mới: {{ newData }}</p>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: ["dataFromA"],
  setup(props) {
    const newData = ref("");

    watchEffect(() => {
      // Thực hiện hành động khi prop dataFromA thay đổi
      newData.value = "Dữ liệu mới: " + props.dataFromA;
    });

    return {
      newData,
    };
  },
};
</script>
