<template>
  <!-- The Modal -->
  <div class="modal" id="model-editrole">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Sửa Vai Trò</h4>
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
              <label for="role">Vai Trò</label>
              <input
                type="text"
                class="form-control"
                id="role"
                v-model="item.name"
              />
            </div>
            <div class="form-group">
              <label for="permission">Quyền</label>
              <div class="checkbox-group">
                <label v-for="permission in permissions" :key="permission._id">
                  <input
                    type="checkbox"
                    v-model="permissions.name"
                    :value="permission._id"
                  />
                  {{ permission.name }}
                </label>
              </div>
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
<script>
import { reactive } from "vue";

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
    permissions:{
      type: Array,
      default: []
    }
  },
  setup(props, ctx) {
    const data = reactive({});
    const update = () => {
      if (
        // props.item.permissions.length > 0 &&
        props.item.role.length > 0
      ) {
        ctx.emit("update");
      }
    };
    return {
      update,
    };
  },
};
</script>

<style scoped>
.show-modal {
  display: block;
  opacity: 1;
  pointer-events: auto;
}
</style>
