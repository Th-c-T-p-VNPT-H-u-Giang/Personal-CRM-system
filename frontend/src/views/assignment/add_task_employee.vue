<script>
import { reactive,onBeforeMount } from "vue";
import Employee from "../../services/employee.service";
import Select_Advanced from "../../components/form/select_advanced.vue";
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
      default: [],
    },
  },
  setup(props, ctx) {
    const data = reactive({
      itemAdd: {
        EmployeeId: "",
      },
      modelValue: "",
      modelEm:"",
    });
    const task_ems = reactive({ task_ems: [] });
    const create = () => {
      ctx.emit("create");
    };
    const employees = reactive({ employee: [] });

    const refresh = async () => {
      employees.employee = await http_getAll(Employee);
      // data.cycleSelect = [...rs];
    };

    onBeforeMount(() => {

      refresh();
    });

    return {
      create,
      refresh,
      employees,
      data,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-form-task_em">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Phân công nhân viên</h4>
          <!-- {{ item}} -->
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            
          <form action="" class="was-validated">
            <div class="form-group">
              <label for="name">Khách hàng(<span style="color: red">*</span>):</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="item.Customer.name"
                disabled
              />
              <!-- {{ item }} -->
            </div>
            <div class="form-group">
              <label for=""
                >Nhân viên(<span style="color: red">*</span>):</label
              >
              <Select_Advanced style="height: 40px;" required
              :add="false"
              :options="employees.employee"
                @searchSelect="
                  async (value) => (
                    await refresh(),
                    (employees.employee = employees.employee.filter((value1, index) => {
                      console.log(value1, value);
                      return value1.name.includes(value) || value.length == 0;
                    })),
                    console.log('searchSlect', value.length)
                  )
                "
                @chose="(value,value1) => (data.itemAdd.EmployeeId = value, data.modelEm = value1.name)"
              />
            </div>
            <button
              type="button"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
              @click="create"
              id="add"
            >
              <span>Thêm</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
