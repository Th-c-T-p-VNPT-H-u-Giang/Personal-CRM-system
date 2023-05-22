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
              <label for="name">Name(<span style="color: red">*</span>):</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="newData.lev_name"
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
import {} from "vue";
export default {
  name: "Add",
  props: {
    newData: { type: Object },
  },
  setup({ newData }, ntx) {
    const save = async () => {
      ntx.emit("addorupdate", newData);
    };
    return { save };
  },
};
</script>
