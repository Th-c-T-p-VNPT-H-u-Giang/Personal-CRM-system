<script>
import { defineProps, reactive } from "vue";
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    entryValue: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
=======
    title: {
      type: String,
    }
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
  },
  setup(props) {
    const data = reactive({
      a: 1,
    });
    return {
      props,
      data,
    };
  },
};
</script>

<template>
  <div class="">
    <select
      class="form-control d-flex justify-content-start"
      :value="entryValue"
      @input="$emit('update:entryValue', $event.target.value)"
    >
<<<<<<< HEAD
=======
      <option>{{ title }}</option>
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.option {
  font-size: 13px;
}
.form-control {
<<<<<<< HEAD
    background-color: inherit;
    border: 1px solid var(--gray);
=======
  background-color: inherit;
  border: 1px solid var(--gray);
>>>>>>> 647811d30517bc047eefce4e74da086465d489fb
}
</style>
