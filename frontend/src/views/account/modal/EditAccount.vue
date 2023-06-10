<script>
import { reactive } from "vue";

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
    roles: {
      type: Array,
      default: []
    }
  },
  setup(props, ctx) {
    const data = reactive({});
    const update = () => {
      if (
        props.item.user_name.length > 0 &&
        props.item.password.length > 0 &&
        props.item.roleId.length > 0 &&
        props.item.EmployeeId > 0
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

<template>
  <!-- The Modal -->
  <div class="modal" id="model-edit">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Sửa Tài Khoản</h4>
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
              <label for="name"
                >Tên Tài Khoản(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="user_name1"
                name="user_name"
                v-model="item.user_name"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="name"
                >Chọn Vai Trò(<span style="color: red">*</span>):</label
              >
              <select
                class="form-control"
                id="roleId"
                name="roleId"
                v-model="item.roleId"
                required
              >
                <option v-for="role in roles" :key="role" :value="role._id">
                  {{ role.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="name"
                >Mã Nhân Viên(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="EmployeeId1"
                name="EmployeeId"
                v-model="item.EmployeeId"
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
