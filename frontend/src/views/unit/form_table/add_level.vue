<script></script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-edit">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Add A New Level</h4>
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
                v-model="newDataUpdate.lev_name"
                required
              />
            </div>
            <!-- <div class="form-group">
              <label for="content"
                >Content(<span style="color: red">*</span>):</label
              >
              <textarea
                id="content"
                required
                class="form-control"
                rows="5"
              ></textarea>
            </div> -->
            <button
              type="submit"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Add
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
    newDataUpdate: { type: Object },
  },
  setup({ newDataUpdate }, { emit }) {
    const save = async () => {
      console.log("Update Level:", newDataUpdate);
      emit("update", newDataUpdate);
    };
    return { newDataUpdate, save };
  },
};
</script>
