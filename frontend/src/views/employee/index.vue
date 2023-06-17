<script>
import Mail from "../../components/box_lananh/mail.vue";
import mailService from "../../services/mail.service";
/////
import Table from "../../components/table/table_employee.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import Add1 from "./add.vue";
// import Add from "./add.vue";
import Edit from "./edit.vue";
import View from "./view.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import { reactive, computed, watch, ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
//service
import Employee from "../../services/employee.service";
import Position from "../../services/position.service";
import CenterServices from "../../services/center_vnpt.service";
import departmentsServices from "../../services/department.service";
import unitsServices from "../../services/unit.service";
import Swal from "sweetalert2";
import FormWizard from "../../components/form/form-wizard.vue";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
} from "../../assets/js/common.http";
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
} from "../../assets/js/common.alert";
import SelectCDU from "../../components/box_lananh/select_cdu.vue";
import { Task } from "../common/import";
import employeeService from "../../services/employee.service";
import cycleService from "../../services/cycle.service";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    // Add,
    DeleteAll,
    Edit,
    View,

    Select_Advanced,
    Add1,
    Mail,
    FormWizard,
    SelectCDU,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        {
          _id: "",
          name: "",
          postionId: "",
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
          Tasks: {
            start_date: "",
            end_date: "",
            content: "",
            _id: "",
            customerId: "",
            cycleId: "",
            leaderId: "",
            Employee_Task: {
              TaskId: "",
              EmployeeId: "",
            },
            Cycles: {
              _id: "",
              name: "",
            },
            Customers: {
              _id: "",
              name: "",
              avatar: "",
            },
            Status: {
              _id: "",
              status: "",
              reason: "",
            },
          },
        },
      ],
      entryValue: 2,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeEdit: false,
      editValue: {},

      viewValue: {
        _id: "",
        name: "",
        birthday: "",
        // avatar: "",
        address: "",
        phone: "",
        email: "",
        Position: {
          _id: "",
          name: "",
        },
        Unit: {
          _id: "",
          name: "",
          Department: {
            _id: "",
            name: "",
            Center_VNPTHG: {
              name: "",
              _id: "",
            },
          },
        },
        Tasks: {
          start_date: "",
          end_date: "",
          content: "",
          _id: "",
          customerId: "",
          cycleId: "",
          leaderId: "",
          Employee_Task: {
            TaskId: "",
            EmployeeId: "",
          },
          Cycles: {
            _id: "",
            name: "",
          },
          Customers: {
            _id: "",
            name: "",
            phone: "",
            email: "",
            address: "",
            avatar: "",
          },
          Status: {
            _id: "",
            status: "",
            reason: "",
          },
        },
      },
      center: {},
      department: {},
      unit: {},
      position: {},

      modelPositon: "Chức vụ",
      modelValue: "Trung tâm",
      modelDep: "Phòng",
      modelUnit: "Tổ",
    });
    const view = async (value) => {
      console.log("data view:", value);
      // FIND ONE employee
      data.viewValue = await employeeService.get(value);

      for (let i = 0; i <= data.viewValue.Tasks.length; i++) {
        if (data.viewValue.Tasks[i].Status.status == true) {
          data.viewValue.Tasks[i].Status.status = "Thành công";
        } else data.viewValue.Tasks[i].Status.status = "Thất bại";
      }
    };
    // computed
    // computed
    const toString = computed(() => {
      console.log("Starting search");
      if (data.choseSearch == "name") {
        return data.items.map((value, index) => {
          return [value.name].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "email") {
        return data.items.map((value, index) => {
          return [value.email].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "phone") {
        return data.items.map((value, index) => {
          return [value.phone].join("").toLocaleLowerCase();
        });
      } else {
        return data.items.map((value, index) => {
          return [value.name, value.email, value.phone]
            .join("")
            .toLocaleLowerCase();
        });
      }
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.items.length;
        return data.items;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (data.items.length > 0) {
        if (setNumberOfPages.value == 0 || data.entryValue == "All") {
          data.entryValue = data.items.length;
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
      } else return data.items.value;
    });

    const entryValuePosition = ref(""); //id
    const entryNamePosition = ref("Chức vụ"); //name
    const entryValueCenter = ref("");
    const entryNameCenter = ref("Trung tâm");
    const entryValueDepartment = ref(""); //id
    const entryNameDepartment = ref("Phòng"); //name
    const entryValueUnit = ref("");
    const entryNameUnit = ref("Tổ");

    //FRESH
    const refresh = async () => {
      data.items = await http_getAll(Employee);
      for (let value of data.items) {
        value.checked = false;
      }
      data.position = await http_getAll(Position);

      data.center = await CenterServices.getAll();
      data.department = await departmentsServices.getAll();
      data.unit = await unitsServices.getAll();
      // console.log("refresh:", data.items);
      console.log("department:", data.department);

      data.position = data.position.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      data.center = data.center.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      data.department = data.department.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      data.unit = data.unit.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      console.log("position:", data.position);
      if (entryValuePosition.value.length > 0) {
        data.items = data.items.filter((pos) => {
          return pos.postionId == entryValuePosition.value;
        });
      }
    };
    const router = useRouter();

    // watch
    const activeMenu = ref(1);

    // methods
    const create = async () => {
      refresh();
    };

    const update = (item) => {
      console.log("updating", item);
    };

    const deleteOne = async (_id) => {
      const employee = await http_getOne(Employee, _id);
      console.log("deleting", employee);
      const isConfirmed = await alert_delete(
        `Xoá nhân viên`,
        `Bạn có chắc chắn muốn xoá nhân viên "${employee.name}" không ?`
      );
      console.log(isConfirmed);
      if (isConfirmed == true) {
        const result = await http_deleteOne(Employee, _id);
        alert_success(
          `Xoá nhân viên`,
          `Bạn đã xoá thành công nhân viên "${result.document.name}".`
        );
        refresh();
      }
    };

    const edit = async (editValue) => {
      console.log(editValue);

      const result = await http_update(Employee, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa nhân viên`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa nhân viên`, `${result.msg}`);
      }
    };

    // ****** trung tâm ******

    //POSITION
    const positions = reactive({ position: [] });
    watch(entryValuePosition, async (newValue, oldValue) => {
      if (newValue == "Chức vụ") {
        await refresh();
      } else {
        const docPosition = ref("");
        docPosition.value = await http_getOne(
          Position,
          entryValuePosition.value
        );
        data.modelPositon = docPosition.value.name;

        data.items = await http_getAll(Employee);

        if (
          entryValueCenter.value != "" &&
          entryValueDepartment.value != "" &&
          entryValueUnit.value != ""
        ) {
          data.items = data.items.filter((val, index) => {
            return (
              val.Position._id == entryValuePosition.value &&
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
              val.Unit.Department._id == entryValueDepartment.value &&
              val.unitId == entryValueUnit.value
            );
          });
        } else if (
          entryValueCenter.value != "" &&
          entryValueDepartment.value != ""
        ) {
          console.log(data.items);
          data.items = data.items.filter((val, index) => {
            return (
              val.Position._id == entryValuePosition.value &&
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
              val.Unit.Department._id == entryValueDepartment.value
            );
          });
        } else if (entryValueCenter.value != "") {
          console.log("3:", data.items);
          data.items = data.items.filter((val, index) => {
            return (
              val.postionId == entryValuePosition.value &&
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value
            );
          });
        } else {
          data.items = data.items.filter((val, index) => {
            return val.postionId == entryValuePosition.value;
          });
        }
      }
    });

    const updateEntryValuePosition = (value) => {
      entryValuePosition.value = value;
    };

    //  CENTER
    const centers = reactive({ center: [] });
    const updateEntryValueCenter = (value) => {
      console.log("center:", entryValueCenter.value, "**");
      entryValueCenter.value = value;
    };
    watch(entryValueCenter, async (newValue, oldValue) => {
      if (newValue == "Trung tâm") {
        await refresh();
      } else {
        console.log("Trung tâm", newValue);
        const doc = ref("");
        doc.value = await CenterServices.get(entryValueCenter.value);
        data.modelValue = doc.value.name;
        data.items = await http_getAll(Employee);
        if (entryValuePosition.value != "") {
          data.items = data.items.filter((val, index) => {
            return (
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
              val.Position._id == entryValuePosition.value
            );
          });
        } else {
          data.items = data.items.filter((val, index) => {
            return (
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value
            );
          });
          console.log("center new data.items", data.items);
        }
        data.department = await departmentsServices.findAllDepOfACenter(
          newValue
        );
        units.unit = [];
        for (let val of data.department) {
          var newData = await unitsServices.findAllUnitsOfADep(val._id);
          for (let value of newData) {
            data.unit.push(value);
          }
        }
      }
    });

    //DEP
    const departments = reactive({ department: [] });
    watch(entryValueDepartment, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      } else {
        const doc = ref("");
        doc.value = await CenterServices.get(entryValueCenter.value);
        data.modelValue = doc.value.name;
        const docDep = ref("");
        docDep.value = await departmentsServices.getOne(
          entryValueDepartment.value
        );
        data.modelDep = docDep.value.name;
        data.items = await http_getAll(Employee);
        if (entryValuePosition.value != "") {
          data.items = data.items.filter((val, index) => {
            return (
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
              val.Unit.Department._id == entryValueDepartment.value &&
              val.Position._id == entryValuePosition.value
            );
          });
        } else {
          data.items = data.items.filter((val, index) => {
            return (
              val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
              val.Unit.Department._id == entryValueDepartment.value
            );
          });
        }
        units.unit = await unitsServices.findAllUnitsOfADep(newValue);
      }
    });
    const updateEntryValueDepartment = (value) => {
      console.log("dep:", entryValueDepartment.value, "**");
      entryValueDepartment.value = value;
    };
    const updateEntryValueUnit = (value) => {
      console.log("dep:", entryValueUnit.value, "**");
      entryValueUnit.value = value;
    };

    //UNIT

    watch(entryValueUnit, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }
      const doc = ref("");
      doc.value = await CenterServices.get(entryValueCenter.value);
      data.modelValue = doc.value.name;
      // DEP
      const docDep = ref("");
      docDep.value = await departmentsServices.getOne(
        entryValueDepartment.value
      );
      //UNIT
      const docUnit = ref("");
      docUnit.value = await unitsServices.getOne(entryValueUnit.value);
      data.modelUnit = docUnit.value.name;

      data.items = await http_getAll(Employee);
      if (entryValuePosition.value != "") {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
            val.Unit.Department._id == entryValueDepartment.value &&
            val.unitId == entryValueUnit.value &&
            val.Position._id == entryValuePosition.value
          );
        });
      } else {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id == entryValueCenter.value &&
            val.Unit.Department._id == entryValueDepartment.value &&
            val.unitId == entryValueUnit.value
          );
        });
      }
    });

    const search = async (value) => {
      centers.center = await CenterServices.getAll();
      centers.center = centers.center.filter((value1, index) => {
        return value1.name.includes(value) || value.length == 0;
      });
      console.log("searchSelect", value.length);
    };

    const updateAdd = ref(false);

    const sendEmail = async (value) => {
      const dataMail = reactive({ title: "", content: "", mail: "" });
      const count = data.items.filter(
        (element) => element.checked === true
      ).length;
      if (count == 0) {
        alert_warning("Bạn chưa chọn nhân viên", "");
        return;
      }

      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].checked == true) {
          try {
            dataMail.title = value.title;
            dataMail.content = value.content;
            dataMail.mail = data.items[i].email;
            await mailService.sendmail(dataMail);
            console.log("NDMail:", dataMail);

            console.log("Email sent successfully.");
          } catch (error) {
            console.error("Error sending email:", error);
          }
        }
      }
      alert_success("Mail đã được gửi", "");
    };
    const updateDep = async (value) => {
      console.log("center:", entryValueCenter.value);
      if (entryValueCenter.value != "") {
        departments.department = await departmentsServices.findAllDepOfACenter(
          entryValueCenter.value
        );
        return;
      }
      departments.department = value;
    };
    const updateUnit = async (value) => {
      console.log("center:", entryValueDepartment.value);
      if (entryValueDepartment.value != "") {
        units.unit = await unitsServices.findAllUnitsOfADep(
          entryValueDepartment.value
        );
        return;
      }
      units.unit = value;
    };
    const mail = ref(false);
    const showMail = () => {
      const count = data.items.filter(
        (element) => element.checked === true
      ).length;
      console.log("c", count);
      if (count > 0) {
        mail.value = true;
      } else {
        mail.value = false;
        alert_warning("Bạn chưa chọn nhân viên", "");
      }
      console.log(mail.value);
    };

    //CHECKALL
    const checkAll = (value) => {
      console.log("index", value, data.items.length);

      var i;
      for (i = 0; i < data.items.length; i++) {
        data.items[i].checked = value;
      }
      console.log("check all:", data.items[0].checked);
    };
    onBeforeMount(async () => {
      await refresh();
    });

    return {
      data,
      setPages,
      activeMenu,
      create,
      update,
      deleteOne,
      edit,
      entryValueCenter,
      entryValueDepartment,
      entryValueUnit,
      search,
      refresh,

      updateAdd,
      positions,
      entryValuePosition,
      // mail,
      sendEmail,
      updateDep,
      updateUnit,
      mail,
      showMail,
      view,
      checkAll,
      //DUY
      entryValuePosition,
      entryNamePosition,
      entryValueCenter,
      entryNameCenter,
      entryValueDepartment,
      entryNameDepartment,
      entryValueUnit,
      entryNameUnit,

      updateEntryValuePosition,
      updateEntryValueCenter,
      updateEntryValueDepartment,
      updateEntryValueUnit,
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2">
    <div class="d-flex flex-column mt-3">
      <span class="mx-3 mb-3 h6">Lọc nhân viên</span>
      <div class="d-flex mx-3">
        <div class="form-group w-100">
          <Select
            :title="`Chức vụ`"
            :entryValue="entryNamePosition"
            :options="data.position"
            @update:entryValue="
              (value, value1) => (
                updateEntryValuePosition(value),
                (entryNamePosition = value1.name)
              )
            "
            @refresh="
              (entryNamePosition = 'Chọn chức vụ'), updateEntryValuePosition('')
            "
            style="height: 35px"
          />
        </div>
        <div class="form-group w-100">
          <Select
            :title="`Trung tâm`"
            :entryValue="entryNameCenter"
            :options="data.center"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueCenter(value), (entryNameCenter = value1.name)
              )
            "
            @refresh="
              (entryNameCenter = 'Chọn trung tâm'), updateEntryValueCenter('')
            "
            style="height: 35px"
          />
        </div>
        <div class="form-group w-100">
          <Select
            :title="`Phòng`"
            :entryValue="entryNameDepartment"
            :options="data.department"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueDepartment(value),
                (entryNameDepartment = value1.name)
              )
            "
            @refresh="
              (entryNameDepartment = 'Chọn chức vụ'),
                updateEntryValueDepartment('')
            "
            style="height: 35px"
          />
        </div>
        <div class="form-group w-100">
          <Select
            :title="`Tổ`"
            :entryValue="entryNameUnit"
            :options="data.unit"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueUnit(value), (entryNameUnit = value1.name)
              )
            "
            @refresh="(entryNameUnit = 'Chọn tổ'), updateEntryValueUnit('')"
            style="height: 35px"
          />
        </div>
      </div>
    </div>
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <Select
          class="d-flex justify-content-start"
          :options="[
            {
              name: 5,
              value: 5,
            },
            {
              name: 10,
              value: 10,
            },
            {
              name: 20,
              value: 20,
            },
            {
              name: 30,
              value: 30,
            },
          ]"
          style="width: 125px"
          :title="`Số bản ghi`"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
          @refresh="data.entryValue = 'All'"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText"
          @choseSearch="
            async (value) => (
              console.log('search ........'),
              (data.choseSearch = value),
              (data.currentPage = 1)
            )
          "
          @refresh="(data.entryValue = 'All'), (data.currentPage = 1)"
          :options="[
            {
              _id: 'name',
              name: 'Tìm kiếm theo tên',
            },
            {
              _id: 'email',
              name: 'Tìm kiếm theo email',
            },
            {
              _id: 'phone',
              name: 'Tìm kiếm theo số điện thoại',
            },
          ]"
        />
      </div>
      <div class="d-flex align-items-start">
        <button
          type="button"
          class="btn btn-danger mr-3"
          data-toggle="modal"
          data-target="#model-delete-all"
        >
          <span id="delete-all" class="mx-2">Xoá</span>
        </button>
        <!-- <DeleteAll :item="data.items" /> -->

        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#model-form-wizard"
        >
          <span id="add" class="mx-2">Thêm</span>
        </button>
        <Add1
          @create="create"
          :updateAdd="updateAdd"
          @restore="(value) => (updateAdd = value)"
          @newPosition="
            (value) => {
              positions.position = value;
            }
          "
          @newCenter="
            (value) => {
              centers.center = value;
            }
          "
          @newDep="(value) => updateDep(value)"
          @newUnit="(value) => updateUnit(value)"
        />
        <button
          type="button"
          class="btn btn-warning ml-3"
          data-toggle="modal"
          data-target="#model-form-mail"
          @click="showMail"
        >
          <span class="mx-2">Mail</span>
        </button>
        <Mail v-if="mail" @sendEmail="(value) => sendEmail(value)"></Mail>
      </div>
    </div>
    <!-- Table -->
    <Table
      :items="setPages"
      :fields="[
        'Tên',
        'Sđt',
        'Email',
        'Chức vụ',
        'Đơn vị',
        'Phòng',
        'Trung tâm',
      ]"
      :labels="['name', 'phone', 'email']"
      @delete="(value) => deleteOne(value)"
      @edit="
        (value, value1) => (
          (data.editValue = value), (data.activeEdit = value1)
        )
      "
      @view="
        (value) => {
          view(value);
        }
      "
      @selectAll="(value) => checkAll(value)"
    />
    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3"
    />
    <Edit
      :item="data.editValue"
      :class="[data.activeEdit ? 'show-modal' : 'd-none']"
      @cancel="data.activeEdit = false"
      :position="data.items.postionId"
      :unit="data.items.unitId"
      @edit="edit(data.editValue)"
      @refresh="
        async () => {
          await refresh();
        }
      "
    />

    <View :item="data.viewValue" />
  </div>
</template>

<style scoped>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}
.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}
.active-menu {
  color: blue;
}
.none-active-menu {
  color: var(--dark);
}
.border-hr {
  border-top: 1px solid var(--gray);
}
#add,
#delete-all {
  font-size: 14px;
}

.form-control {
  background-color: inherit;
  border: 1px solid var(--gray);
}
</style>
