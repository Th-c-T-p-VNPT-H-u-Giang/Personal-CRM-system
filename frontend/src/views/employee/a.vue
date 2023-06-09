<template>
  <div>
    <button @click="increaseCounter">Tăng giá trị</button>
    <component-b :dataFromA="counter"></component-b>
  </div>
</template>

<script>
import { ref } from "vue";
import ComponentB from "./b.vue";

export default {
  components: {
    ComponentB,
  },
  setup() {
    const counter = ref(0);

    const increaseCounter = () => {
      counter.value++;
    };

    return {
      counter,
      increaseCounter,
    };
  },
};
</script>
