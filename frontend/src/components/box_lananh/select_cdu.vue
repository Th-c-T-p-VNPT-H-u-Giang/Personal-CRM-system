<template>
  <div>
    <select
      class="form-control d-flex justify-content-start pl-2 mr-2"
      @change="changed"
    >
      <option disabled hidden :selected="selectedOption == ''"></option>

      <!-- <option disabled selected hidden value="">{{ title }}</option> -->
      <option
        v-for="(val, index) in field"
        :key="index"
        :value="val._id"
        :selected="selectedOption == val._id"
      >
        {{ val.name }}
      </option>
      <!-- <option value="all" :selected="selectedOption == 'all'">tất cả</option> -->
      <!-- <option v-if="add.name == 'position'" value="other">Khác</option>
      <option v-if="add.nameCDU == 'center'" value="other">Khác</option>
      <option v-if="add.nameCDU == 'dep'" value="other">Khác dep</option>
      <option v-if="add.nameCDU == 'unit'" value="other">Khác unit</option> -->
    </select>
  </div>
</template>
<script>
import { watch, ref, reactive } from "vue";
export default {
  name: "select",
  components: {},
  props: {
    field: { type: Array },
    title: { type: String },
    selectedOption: { type: String },
    add: { type: Object, default: "" },
  },
  setup(props, { emit }) {
    const changed = (e) => {
      if (e && e.target) {
        emit("option", e.target.value);
      }
    };

    return {
      changed,
    };
  },
};
</script>
<style>
.form-control {
  background-color: var(--light);
}
</style>
