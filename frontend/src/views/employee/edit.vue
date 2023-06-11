<script>
import Select from "../../components/form/select.vue";
import { reactive } from "vue";
import SelectOption from "../../components/box_lananh/select_cdu.vue";
export default {
  components: {
    Select,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    position: {
      type: Object,
      default: {},
    },
    center: {
      type: Object,
      default: {},
    },
    department: {
      type: Object,
      default: {},
    },
    unit: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({});
    const update = () => {
      ctx.emit("update");
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
          <h4 class="modal-title" style="font-size: 15px">
            Sửa thông tin nhân viên
          </h4>
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
                >Họ và tên(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="item.name"
                required
              />
            </div>
            <div class="form-group">
              <label for="birthday"
                >Ngày sinh(<span style="color: red">*</span>):</label
              >
              <input
                type="date"
                class="form-control"
                id="birthday"
                name="birthday"
                v-model="item.birthday"
                required
              />
            </div>
            <div class="form-group">
              <label for="avatar"
                >Avatar(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="avatar"
                name="avatar"
                v-model="item.avatar"
                required
              />
            </div>
            <div class="form-group">
              <label for="address"
                >Địa chỉ(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                v-model="item.address"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone"
                >Số điện thoại(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                v-model="item.phone"
                required
              />
            </div>
            <div class="form-group">
              <label for="email"
                >Email(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                v-model="item.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="position"
                >Chức vụ(<span style="color: red">*</span>):</label
              >
              <select
                id=""
                class="form-control"
                required
                v-model="item.postionId"
              >
                <option
                  v-for="position in position"
                  :key="position"
                  :value="position._id"
                >
                  {{ position.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="center"
                >Trung tâm(<span style="color: red">*</span>):</label
              >
              <select id="" class="form-control" required>
                <option
                  v-for="center in center"
                  :key="center"
                  :value="center._id"
                >
                  {{ center.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="department"
                >Phòng(<span style="color: red">*</span>):</label
              >
              <select id="" class="form-control" required>
                <option
                  v-for="department in department"
                  :key="department"
                  :value="department._id"
                >
                  {{ department.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="unit"
                >Đơn vị(<span style="color: red">*</span>):</label
              >
              <select id="" class="form-control" required v-model="item.unitId">
                <option v-for="unit in unit" :key="unit" :value="unit._id">
                  {{ unit.name }}
                </option>
              </select>
            </div>
            <button
              type="button"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
              @click="$emit('edit')"
              id="edit"
              data-dismiss="modal"
            >
              <span>Cập nhật</span>
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
