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
        v-if="add"
        value="other"
        data-toggle="modal_center"
        data-target="#model-center"
      >
        Khác
      </option>
    </select>
  </div>
</template>
<script>
import { watch, ref, reactive } from "vue";
import Center from "../../views/unit/center.vue";

export default {
  name: "select",
  components: {
    Center,
  },
  props: {
    field: { type: Array },
    title: { type: String },
    selectedOption: { type: String },
    add: { type: Boolean },
  },
  setup({ selectedOption, add }, { emit }) {
    console.log("Add:", add);
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
