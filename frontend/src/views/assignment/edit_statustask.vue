<script>
import { reactive, onBeforeMount, watch, ref, computed } from "vue";
import StatusTask from "../../services/status_task.service";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Swal from "sweetalert2";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
} from "../../assets/js/common.http";
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
} from "../../assets/js/common.alert";
export default {
  components: {
    Select_Advanced,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    statustask: {
      type: Object,
      default: {},
    },
    resetData: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    watch(
      () => props.resetData,
      async (newValue, oldValue) => {
        await refresh();
      },
      { immediate: true }
      //có props
    );
    const data = reactive({
      modelStatus_Task: "1",
    });

    const statustasks = reactive({ statustask: [] });
    let selectedOptionStatus = ref("0");
    watch(selectedOptionStatus, async (newValue, oldValue) => {
      if (newValue == "") return;
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: statusTask } = await Swal.fire({
            title: "Thêm trạng thái mới",
            input: "text",
            inputLabel: "Tên trạng thái",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên trạng thái không được bỏ trống";
              }
            },
          });

          if (statusTask) {
            const res = await http_create(StatusTask, { name: statusTask });
            if (res.error) {
              alert_warning(`Đã tồn tại trạng thái `, `${statusTask}`);
              return false;
            }
            alert_success(`Đã thêm trạng thái`, `${statusTask}`);
            props.item.Status_Task.name = res.document.name;
            await refresh();
            ctx.emit("newStatus", statustasks.statustask);

            selectedOptionStatus.value = res.document._id;
          }
          return true;
        };
        showSweetAlert();
        selectedOptionStatus.value = 0;
      }

      props.item.StatusTaskId = selectedOptionStatus.value;
      selectedOptionStatus.value = "";
    });

    const deleteStatusTask = async (_id) => {
      const status_task = await http_getOne(StatusTask, _id);

      const isConfirmed = await alert_delete(
        `Xoá trạng thái`,
        `Bạn có chắc chắn muốn xoá trạng thái ${status_task.name} không ?`
      );

      if (isConfirmed == true) {
        const result = await http_deleteOne(StatusTask, _id);
        alert_success(
          `Xoá trạng thái`,
          `Bạn đã xoá thành công trạng thái ${status_task.name} .`
        );
        refresh();
      }
    };
    const search = async (value) => {
      await refresh();
      statustasks.statustask = statustasks.statustask.filter(
        (value1, index) => {
          return value1.name.includes(value) || value.length == 0;
        }
      );
    };

    const refresh = async () => {
      statustasks.statustask = await http_getAll(StatusTask);
      statustasks.statustask.push({
        _id: "other",
        name: "khác",
      });
    };

    onBeforeMount(() => {
      refresh();
    });
    const update = () => {
      ctx.emit("update");
    };
    return {
      update,
      data,
      selectedOptionStatus,
      statustasks,
      deleteStatusTask,
      search,
    };
  },
};
</script>
<template>
  <!-- The Modal -->
  <div class="modal" id="modal-edit-statustask">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Cập nhật trạng thái phân công
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="name"
                >Trạng thái lịch hẹn(<span style="color: red">*</span>):</label
              >
              <Select_Advanced
                style="height: 40px"
                required
                :options="statustasks.statustask"
                :modelValue="item.Status_Task.name"
                @searchSelect="(value) => search(value)"
                @delete="(value) => deleteStatusTask(value._id)"
                @chose="
                  (value, value1) => (
                    (selectedOptionStatus = value),
                    (item.Status_Task.name = value1.name)
                  )
                "
              />
            </div>
            <button
              type="button"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
              @click="$emit('edit')"
              id="add"
            >
              <span>Chỉnh sửa</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-id {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}
.step-content {
  border-left: 1px solid var(--gray);
}
input {
  width: 100%;
}
.active-step {
  color: blue;
}
.btn-next {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-next:hover {
  background-color: green;
  color: white;
}

.btn-prev {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-prev:hover {
  background-color: red;
  color: white;
}
@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 200%;
    margin-left: -50%;
  }
}
</style>
