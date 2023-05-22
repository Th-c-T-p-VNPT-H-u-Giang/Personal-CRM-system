<template>
    <div class="">
    <select
      class="form-control d-flex justify-content-start"
      :value="entryValue"
      @input="$emit('update:entryValue', $event.target.value)"
    >
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

<script>
import {  reactive } from "vue";
export default {
    props: {
    options: {
      type: Array,
      required: true,
      default : 5
    },
    entryValue: {
      type: String,
      required: true,
    },
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
}
</script>


<style scoped>
.option {
  font-size: 13px;
}
.form-control {
    background-color: inherit;
    border: 1px solid var(--gray);
}
</style>