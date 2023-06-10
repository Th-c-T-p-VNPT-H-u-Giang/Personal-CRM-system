<template>
  <!-- The Modal -->
  <div class="modal" id="modal-addpermission">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Thêm Quyền</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="permission">Quyền:</label>
              <input
                type="text"
                id="name"
                v-model="item.name"
                class="form-control"
                required
              />
            </div>
            <button
              type="button"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px; float: right"
              id="addpermission"
              @click="create"
            >
              <span>Thêm</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({});

    const create = () => {
      if (props.item.name.length > 0) {
        ctx.emit("create");
      }
    };

    return {
      data,
      create,
    };
  },
};
</script>

<style scoped>
</style>
