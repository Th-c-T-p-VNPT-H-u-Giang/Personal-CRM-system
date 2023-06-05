<template>
  <div>
    <select
      class="form-control d-flex justify-content-start pl-2 mr-2"
      v-model="select"
    >
      <option disabled selected hidden>{{ title }}</option>
      <option v-for="(val, index) in field" :key="index" :value="val._id">
        {{ val.name }}
      </option>
      <option
        v-if="add.nameCDU == 'center'"
        value="other"
        data-toggle="modal_center"
        data-target="#model-center"
      >
        Khác
      </option>
      <option
        v-if="add.nameCDU == 'dep'"
        value="other"
        data-toggle="model-department"
        data-target="#model-department"
      >
        Khác dep
      </option>
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
  setup({ selectedOption, add }, { emit }) {
    // console.log("Add:", add);
    const select = ref({});
    select.value = selectedOption;
    watch([select], ([newValue1, oldValue1]) => {
      console.log("Dropdown value changed:", select.value);
      emit("option", select.value);
    });

    return { select };
  },
};
</script>
<style>
.form-control {
  background-color: var(--light);
}
</style>
