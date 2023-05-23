<template>
  <div class="">
    <select class="form-control d-flex justify-content-start" :value="entryValue"
      @input="$emit('update:entryValue', $event.target.value)">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.name }}
      </option> 
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
      default: 5
    },
    entryValue: {
      type: String,
      required: true,
    },
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