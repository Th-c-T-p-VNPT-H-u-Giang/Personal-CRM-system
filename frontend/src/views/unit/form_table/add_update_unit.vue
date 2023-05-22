<script></script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-add">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Level</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="save" class="was-validated">
            <div class="form-group">
              <label for="name"
                >Level(<span style="color: red">*</span>):</label
              >

              <select class="pl-2 form-control" @change="getLevel">
                <option disabled selected hidden value="#"></option>
                <option
                  :value="`${value.lev_id}`"
                  :key="index"
                  v-for="(value, index) in levels"
                >
                  {{ value.lev_name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="name">Name(<span style="color: red">*</span>):</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="newData.uni_name"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Add",
  props: {
    newData: { type: Object },
  },
  setup({ newData }, ntx) {
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const getLevel = (event) => {
      console.log(event.target.value);
      newData.lev_id = event.target.value;
    };
    const save = async () => {
      console.log("save:", newData);
      ntx.emit("addorupdate", newData);
    };
    return { save, levels, getLevel };
  },
};
</script>
