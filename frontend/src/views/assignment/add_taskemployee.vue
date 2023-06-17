<script>
import { reactive, onBeforeMount, ref, watch, computed } from "vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Table from "../../components/table/table_task_employee.vue";
import SelectCDU from "../../components/box_lananh/select_cdu.vue";
import Pagination from "../../components/table/pagination_duy.vue";
//service
import Employee from "../../services/employee.service";
import Position from "../../services/position.service";
import CenterServices from "../../services/center_vnpt.service";
import departmentsServices from "../../services/department.service";
import unitsServices from "../../services/unit.service";
import EmployeeTask from "../../services/task_employee.service";
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
import { Task, TaskEmployee } from "../common/import";
import TaskEmployeeService from "../../services/task_employee.service";
export default {
  components: {
    Select_Advanced,
    Table,
    SelectCDU,
    Pagination,
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
      itemEm: [
        {
          _id: "",
          name: "",
          Position: {
            _id: "",
            name: "",
          },
          unitId: "",
          Unit: {
            _id: "",
            name: "",
            Department: {
              _id: "",
              name: "",
              Center_VNPTHG: {
                _id: "",
                name: "",
              },
            },
          },
        },
      ],
      modelValue: "",
      modelEm: "",
      modelPositon: "Chức vụ",
      modelValue: "Trung tâm",
      modelDep: "Phòng",
      modelUnit: "Tổ",
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      arrTaskEm: {},
    });

    const employees = reactive({ employee: [] });

    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.itemEm.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase();
      });
    });
    const filter = computed(() => {
      return data.itemEm.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.itemEm.length;
        return data.itemEm;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (data.itemEm.length > 0) {
        if (setNumberOfPages.value == 0 || data.entryValue == "All") {
          data.entryValue = data.itemEm.length;
          data.numberOfPages = 1;
        } else data.numberOfPages = setNumberOfPages.value;
        data.startRow = (data.currentPage - 1) * data.entryValue + 1;
        data.endRow = data.currentPage * data.entryValue;
        return filtered.value.filter((item, index) => {
          return (
            index + 1 > (data.currentPage - 1) * data.entryValue &&
            index + 1 <= data.currentPage * data.entryValue
          );
        });
      } else return data.itemEm.value;
    });

    //watch lọc nhân viên
    // ****** trung tâm ******
    const filters = async () => {
      employeeTask.data = await http_getOne(Task, props.item._id);
      var i;
      for (i = 0; i < data.itemEm.length; i++) {
        data.itemEm[i].checked = false;
      }
      for (i = 0; i < data.itemEm.length; i++) {
        for (var j = 0; j < employeeTask.data.Employees.length; j++) {
          if (data.itemEm[i]._id == employeeTask.data.Employees[j]._id) {
            data.itemEm[i].checked = true;
          }
        }
      }
    };

    const centers = reactive({ center: [] });
    const selectedOptionCenter = ref("");
    watch(selectedOptionCenter, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }

      const doc = ref("");
      doc.value = await CenterServices.get(selectedOptionCenter.value);
      data.modelValue = doc.value.name;
      data.itemEm = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id == selectedOptionCenter.value
          );
        });
      }
      departments.department = await departmentsServices.findAllDepOfACenter(
        newValue
      );
      units.unit = [];
      // departments.department.push({ _id: "other", name: "khác" });

      for (let val of departments.department) {
        var newData = await unitsServices.findAllUnitsOfADep(val._id);
        for (let value of newData) {
          units.unit.push(value);
        }
      }
      await filter();
    });

    //DEP
    const departments = reactive({ department: [] });
    const selectedOptionDepartment = ref("");
    watch(selectedOptionDepartment, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }
      const doc = ref("");
      doc.value = await CenterServices.get(selectedOptionCenter.value);
      data.modelValue = doc.value.name;
      const docDep = ref("");
      docDep.value = await departmentsServices.getOne(
        selectedOptionDepartment.value
      );
      data.modelDep = docDep.value.name;
      data.itemEm = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value
          );
        });
      }

      units.unit = await unitsServices.findAllUnitsOfADep(newValue);
      await filters();
    });

    //UNIT
    const units = reactive({
      unit: [],
    });
    const selectedOptionUnit = ref("");
    watch(selectedOptionUnit, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }
      const doc = ref("");
      doc.value = await CenterServices.get(selectedOptionCenter.value);
      data.modelValue = doc.value.name;
      // DEP
      const docDep = ref("");
      docDep.value = await departmentsServices.getOne(
        selectedOptionDepartment.value
      );
      //UNIT
      const docUnit = ref("");
      docUnit.value = await unitsServices.getOne(selectedOptionUnit.value);
      data.modelUnit = docUnit.value.name;

      data.itemEm = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.unitId == selectedOptionUnit.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.unitId == selectedOptionUnit.value
          );
        });
      }
      await filter();
    });

    //POSITION
    const positions = reactive({ position: [] });
    const selectedOptionPosition = ref("");
    watch(selectedOptionPosition, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }

      const docPosition = ref("");
      docPosition.value = await http_getOne(
        Position,
        selectedOptionPosition.value
      );
      data.modelPositon = docPosition.value.name;

      data.itemEm = await http_getAll(Employee);
      if (
        selectedOptionCenter.value != "" &&
        selectedOptionDepartment.value != "" &&
        selectedOptionUnit.value != ""
      ) {
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Position._id == selectedOptionPosition.value &&
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.unitId == selectedOptionUnit.value
          );
        });
      } else if (
        selectedOptionCenter.value != "" &&
        selectedOptionDepartment.value != ""
      ) {
        console.log(data.itemEm);
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Position._id == selectedOptionPosition.value &&
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value
          );
        });
      } else if (selectedOptionCenter.value != "") {
        console.log(data.itemEm);
        data.itemEm = data.itemEm.filter((val, index) => {
          return (
            val.Position._id == selectedOptionPosition.value &&
            val.Unit.Department.Center_VNPTHG._id == selectedOptionCenter.value
          );
        });
      } else {
        data.itemEm = data.itemEm.filter((val, index) => {
          return val.Position._id == selectedOptionPosition.value;
        });
      }
      await filters();
    });

    // method
    //***REFRESH
    const employeeTask = reactive({ data: [] });
    const refresh = async () => {
      // data.cycleSelect = [...rs];
      console.log("REFRESH");
      data.positions = await http_getAll(Position);
      data.itemEm = await http_getAll(Employee);

      employeeTask.data = await http_getOne(Task, props.item._id);

      var i;
      for (i = 0; i < data.itemEm.length; i++) {
        data.itemEm[i].checked = false;
      }
      for (i = 0; i < data.itemEm.length; i++) {
        for (var j = 0; j < employeeTask.data.Employees.length; j++) {
          if (data.itemEm[i]._id == employeeTask.data.Employees[j]._id) {
            data.itemEm[i].checked = true;
          }
        }
      }
      console.log("check:", data.itemEm);

      centers.center = await CenterServices.getAll();
      // centers.center.push({ _id: "other", name: "khác" });
      departments.department = await departmentsServices.getAll();
      // departments.department.push({ _id: "other", name: "khác" });

      units.unit = await unitsServices.getAll();
      // units.unit.push({ _id: "other", name: "khác" });
      positions.position = await http_getAll(Position);
      // positions.position.push({ _id: "other", name: "khác" });
      selectedOptionCenter.value = "";
      selectedOptionDepartment.value = "";
      selectedOptionUnit.value = "";
      selectedOptionPosition.value = "";
    };
    //giao việc cho nhân viên
    const createTaskEm = async () => {
      console.log("đây nè");
      console.log("id Task dang chon:", props.item._id);
      const newData = reactive({ TaskId: " ", EmployeeId: " " });
      newData.TaskId = props.item._id;
      console.log("số lượng nhân viên:", data.itemEm.length);
      const count = data.itemEm.filter(
        (element) => element.checked === true
      ).length;
      if (count == 0) {
        alert_warning("Bạn chưa chọn nhân viên", "");
        return;
      }

      var j;
      for (j = 0; j < employeeTask.data.Employees.length; j++) {
        const dataDel = reactive({
          data: {
            TaskId: props.item._id,
            EmployeeId: employeeTask.data.Employees[j]._id,
          },
        });
        const result = await TaskEmployeeService.deleteOne(dataDel.data);
      }
      for (let i = 0; i < data.itemEm.length; i++) {
        if (data.itemEm[i].checked == true) {
          // console.log("ss", data.itemEm[i]);
          try {
            newData.EmployeeId = data.itemEm[i]._id;
            const result = await http_create(EmployeeTask, newData);
            console.log("ss", data.itemEm[i]);
          } catch (error) {
            console.error("Lỗi tạo công việc:", error);
          }
        }
      }

      alert_success(
        `Thêm công việc`,
        `Phân công khách hàng ${props.item.Customer.name} đã được tạo thành công`
      );
      selectAll.selectAll = false;
      await refresh();
    };

    //CHECKALL
    const checkAll = async () => {
      var i;
      if (selectAll.selectAll == false) {
        for (i = 0; i < data.itemEm.length; i++) {
          data.itemEm[i].checked = true;
        }
      } else {
        for (i = 0; i < data.itemEm.length; i++) {
          data.itemEm[i].checked = false;
        }
        await refresh();
      }
    };

    const closeModal = async () => {
      console.log("close modal");

      await refresh();
      showModal.value = false;
    };
    const selectAll = reactive({ selectAll: false });

    onBeforeMount(() => {
      refresh();
    });

    return {
      setPages,
      createTaskEm,
      refresh,
      employees,
      data,
      centers,
      selectedOptionCenter,
      departments,
      selectedOptionDepartment,
      units,
      selectedOptionUnit,
      positions,
      selectedOptionPosition,
      checkAll,
      closeModal,
      selectAll,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-form-task_em">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">
            Thêm phân công cho nhân viên
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="closeModal"
          >
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="model-body">
          <div style="padding: 24px">
            <form action="" class="was-validated">
              <div class="form-group">
                <label for="name"
                  >Khách hàng(<span style="color: red">*</span>):</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  name="name"
                  v-model="item.Customer.name"
                  disabled
                />
              </div>
              <div class="form-group">
                <label for=""
                  >Nội dung chăm sóc(<span style="color: red">*</span>):</label
                >
                <textarea
                  class="form-control"
                  v-model="item.content"
                  required
                  disabled
                ></textarea>
              </div>
              <div class="border-box d-flex flex-column">
                <div class="d-flex mx-3">
                  <div class="form-group w-100">
                    <SelectCDU
                      class="d-flex justify-content-start"
                      :title="`Chức vụ`"
                      :field="positions.position"
                      :selectedOption="selectedOptionPosition"
                      @option="(value) => (selectedOptionPosition = value)"
                    />
                  </div>
                  <div class="form-group w-100">
                    <SelectCDU
                      class="d-flex justify-content-start"
                      :title="`Trung tâm`"
                      :field="centers.center"
                      :selectedOption="selectedOptionCenter"
                      @option="(value) => (selectedOptionCenter = value)"
                    />
                  </div>
                  <div class="form-group w-100">
                    <SelectCDU
                      class="d-flex justify-content-start"
                      :title="`Phòng`"
                      :field="departments.department"
                      :selectedOption="selectedOptionDepartment"
                      @option="(value) => (selectedOptionDepartment = value)"
                    />
                  </div>
                  <div class="form-group w-100">
                    <SelectCDU
                      class="d-flex justify-content-start"
                      :title="`Tổ`"
                      :selectedOption="selectedOptionUnit"
                      :field="units.unit"
                      @option="(value) => (selectedOptionUnit = value)"
                    />
                  </div>
                </div>
                <Table
                  @selectAll="checkAll()"
                  :selectAll="selectAll"
                  :items="setPages"
                  :fields="['Tên', 'Chức vụ', 'Đơn vị', 'Phòng', 'Trung tâm']"
                  :labels="['name']"
                />
                <Pagination
                  :numberOfPages="data.numberOfPages"
                  :totalRow="data.totalRow"
                  :startRow="data.startRow"
                  :endRow="data.endRow"
                  :currentPage="data.currentPage"
                  @update:currentPage="(value) => (data.currentPage = value)"
                  class="mx-3"
                />
              </div>

              <button
                type="button"
                class="btn btn-primary px-3 py-2"
                style="font-size: 14px; margin-right: 24px"
                @click="createTaskEm"
                id="add"
              >
                <span>Giao việc</span>
              </button>
              <button
                type="button"
                class="btn btn-secondary px-3 py-2"
                style="font-size: 14px"
                @click="refresh"
                id=""
              >
                <span>Tải lại</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
  padding-top: 10px;
  margin-bottom: 14px;
}
</style>
