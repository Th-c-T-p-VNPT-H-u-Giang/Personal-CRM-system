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
    const data = reactive({
    });

    const update = () => {
      if (
        props.item.name.length > 0 
      ){ 
        ctx.emit("update")
      }
    };
    return {
      update,
    };
  },
};
</script>


<template>
  <!-- The Modal -->
  <div class="modal" id="model-editpermission">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Sửa Quyền</h4>
          <button
            @click="$emit('cancel')"
            type="button"
            class="close"
            data-dismiss="modal"
          >
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="permission"
                >Tên Quyền(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="item.name"
                required
              />
            </div>
    
            <button
              type="button"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
              @click="$emit('edit')"
              id="edit"
            >
              <span>Cập Nhật</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-modal {
  display: block;
  opacity: 1;
  pointer-events: auto;
}
</style>
