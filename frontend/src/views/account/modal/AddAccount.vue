<template>
  <!-- The Modal -->
  <div class="modal" id="model-addaccount">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Thêm Tài Khoản</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form action="" class="was-validated">
            <div class="form-group">
              <label for="name"
                >Tên Tài Khoản(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="user_name"
                name="user_name"
                v-model="item.user_name"
                required
              />
            </div>

            <div class="form-group">
              <label for="name"
                >Password(<span style="color: red">*</span>):</label
              >
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                v-model="item.password"
                required
              />
            </div>
            <div class="form-group">
              <label for="name"
                >Chọn Vai Trò(<span style="color: red">*</span>):</label
              >
              <select
                class="form-control"
                id="RoleId"
                name="roleId"
                v-model="item.roleId"
                required
              >
                <option v-for="role in roles" :key="role" :value="role._id">
                  {{ role.name }}
                </option>
              </select>
            </div>
            <!-- Thêm mấy cái của nv => truyền employs -> select  -->
            <div class="form-group">
              <label for="name"
                >Mã Nhân Viên(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="EmployeeId"
                name="EmployeeId"
                v-model="item.EmployeeId"
                required
              />
            </div>
            <button
              type="button"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px; float: right"
              @click="create"
              id="addaccount"
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
    roles: {
      type: Array,
      default: [],
    },
  },
  setup(props, ctx) {
    const data = reactive({});

    const create = () => {
      if (
        props.item.user_name.length > 0 &&
        props.item.password.length > 0 &&
        props.item.roleId.length > 0 &&
        props.item.EmployeeId.length > 0
      ) {
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
