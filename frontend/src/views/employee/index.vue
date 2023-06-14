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
      entryValue: 5,
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
      },
      modelPositon: "Chức vụ",
      modelValue: "Trung tâm",
      modelDep: "Phòng",
      modelUnit: "Tổ",
    });

    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [
          value.name,
          value.phone,
          value.email,
          value.Position.name,
          value.Unit.name,
          value.Unit.Department.name,
          value.Unit.Department.Center_VNPTHG.name,
        ]
          .join("")
          .toLocaleLowerCase();
      });
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

    const refresh = async () => {
      data.positions = await http_getAll(Position);
      data.items = await http_getAll(Employee);
      centers.center = await CenterServices.getAll();
      departments.department = await departmentsServices.getAll();

      units.unit = await unitsServices.getAll();
      positions.position = await http_getAll(Position);
    };

    // ****** trung tâm ******
    const centers = reactive({ center: [] });
    const selectedOptionCenter = ref("");
    watch(selectedOptionCenter, async (newValue, oldValue) => {
      if (newValue == "") {
        return;
      }

      const doc = ref("");
      doc.value = await CenterServices.get(selectedOptionCenter.value);
      data.modelValue = doc.value.name;
      data.items = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id == selectedOptionCenter.value
          );
        });
      }
      departments.department = await departmentsServices.findAllDepOfACenter(
        newValue
      );
      units.unit = [];
      for (let val of departments.department) {
        var newData = await unitsServices.findAllUnitsOfADep(val._id);
        for (let value of newData) {
          units.unit.push(value);
        }
      }
      if (newValue == "all") {
        await refresh();
        selectedOptionCenter.value = "";
        selectedOptionDepartment.value = "";
        selectedOptionUnit.value = "";
        selectedOptionPosition.value = "";
      }
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
      data.items = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value
          );
        });
      }

      units.unit = await unitsServices.findAllUnitsOfADep(newValue);

      if (newValue == "all") {
        await refresh();
        selectedOptionCenter.value = "";
        selectedOptionDepartment.value = "";
        selectedOptionUnit.value = "";
        selectedOptionPosition.value = "";
      }
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

      data.items = await http_getAll(Employee);
      if (selectedOptionPosition.value != "") {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.unitId == selectedOptionUnit.value &&
            val.Position._id == selectedOptionPosition.value
          );
        });
      } else {
        data.items = data.items.filter((val, index) => {
          return (
            val.Unit.Department.Center_VNPTHG._id ==
              selectedOptionCenter.value &&
            val.Unit.Department._id == selectedOptionDepartment.value &&
            val.unitId == selectedOptionUnit.value
          );
        });
      }
      if (newValue == "all") {
        await refresh();
        selectedOptionCenter.value = "";
        selectedOptionDepartment.value = "";
        selectedOptionUnit.value = "";
        selectedOptionPosition.value = "";
      }
    });
    const search = async (value) => {
      centers.center = await CenterServices.getAll();
      centers.center = centers.center.filter((value1, index) => {
        return value1.name.includes(value) || value.length == 0;
      });
      console.log("searchSlect", value.length);
    };

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

      data.items = await http_getAll(Employee);
      if (newValue != "all") {
        if (
          selectedOptionCenter.value != "" &&
          selectedOptionDepartment.value != "" &&
          selectedOptionUnit.value != ""
        ) {
          data.items = data.items.filter((val, index) => {
            console.log("đủ 3");
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
          console.log(data.items);
          data.items = data.items.filter((val, index) => {
            return (
              val.Position._id == selectedOptionPosition.value &&
              val.Unit.Department.Center_VNPTHG._id ==
                selectedOptionCenter.value &&
              val.Unit.Department._id == selectedOptionDepartment.value
            );
          });
        } else if (selectedOptionCenter.value != "") {
          console.log(data.items);
          data.items = data.items.filter((val, index) => {
            return (
              val.Position._id == selectedOptionPosition.value &&
              val.Unit.Department.Center_VNPTHG._id ==
                selectedOptionCenter.value
            );
          });
        } else {
          console.log("đủ 1");
          data.items = data.items.filter((val, index) => {
            return val.Position._id == selectedOptionPosition.value;
          });
        }
      }
      // else if (newValue == "all") {
      //   await refresh();
      //   selectedOptionCenter.value = "";
      //   selectedOptionDepartment.value = "";
      //   selectedOptionUnit.value = "";
      //   // selectedOptionPosition.value = "";
      // }
    });

    const updateAdd = ref(false);
    const onDeletePosition = async (value) => {
      console.log("Value delete:", value);
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await Position.delete(value._id);
        alert_success("Bạn đã xóa chức vụ", value.name);
        await refresh();
      }
      updateAdd.value = true;
    };
    const onDeleteCenter = async (value) => {
      console.log("Value delete:", value);
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await CenterServices.delete(value._id);
        alert_success("Bạn đã xóa trung tâm", value.name);
        await refresh();
      }
      updateAdd.value = true;
    };
    const onDeleteDep = async (value) => {
      console.log("Value delete:", value);
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await departmentsServices.deleteOne(value._id);
        alert_success("Bạn đã xóa", value.name);
        await refresh();
      }
      updateAdd.value = true;
    };
    const onDeleteUnit = async (value) => {
      console.log("Value delete:", value);
      const result = await alert_delete("Bạn muốn xóa", value.name);
      if (result) {
        await unitsServices.deleteOne(value._id);
        alert_success("Bạn đã xóa ", value.name);
        await refresh();
      }
      updateAdd.value = true;
    };
    // const mail = reactive({ list: [] });
    // watch(mail, (newValue, oldValue) => {
    //   console.log("new mail:", mail.list);
    // });
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
            alert_success("Mail đã được gửi", "");
            dataMail.title = value.title;
            dataMail.content = value.content;
            dataMail.mail = data.items[i].email;
            await mailService.sendmail(dataMail);
            console.log("NDMail:", dataMail);

            console.log("Email sent successfully.");
          } catch (error) {
            console.error("Error sending email:", error);
          }
        } else {
          console.log("i=", i);
        }
      }
    };
    const updateDep = async (value) => {
      console.log("center:", selectedOptionCenter.value);
      if (selectedOptionCenter.value != "") {
        departments.department = await departmentsServices.findAllDepOfACenter(
          selectedOptionCenter.value
        );
        return;
      }
      departments.department = value;
    };
    const updateUnit = async (value) => {
      console.log("center:", selectedOptionDepartment.value);
      if (selectedOptionDepartment.value != "") {
        units.unit = await unitsServices.findAllUnitsOfADep(
          selectedOptionDepartment.value
        );
        return;
      }
      units.unit = value;
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

      centers,
      selectedOptionCenter,
      departments,
      selectedOptionDepartment,
      units,
      selectedOptionUnit,
      search,
      refresh,
      onDeletePosition,
      onDeleteCenter,
      onDeleteDep,
      onDeleteUnit,
      updateAdd,
      positions,
      selectedOptionPosition,
      // mail,
      sendEmail,
      updateDep,
      updateUnit,
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
          <label for="name">Chức vụ</label>
          <SelectCDU
            class="d-flex justify-content-start"
            :title="`Chức vụ`"
            :field="positions.position"
            :selectedOption="selectedOptionPosition"
            @option="(value) => (selectedOptionPosition = value)"
          />
        </div>
        <div class="form-group w-100">
          <label for="name">Trung tâm</label>

          <SelectCDU
            class="d-flex justify-content-start"
            :title="`Trung tâm`"
            :field="centers.center"
            :selectedOption="selectedOptionCenter"
            @option="(value) => (selectedOptionCenter = value)"
          />
        </div>
        <div class="form-group w-100">
          <label for="name">Phòng</label>

          <SelectCDU
            class="d-flex justify-content-start"
            :title="`Phòng`"
            :field="departments.department"
            :selectedOption="selectedOptionDepartment"
            @option="(value) => (selectedOptionDepartment = value)"
          />
        </div>
        <div class="form-group w-100">
          <label for="name">Tổ</label>

          <SelectCDU
            class="d-flex justify-content-start"
            :title="`Tổ`"
            :selectedOption="selectedOptionUnit"
            :field="units.unit"
            @option="(value) => (selectedOptionUnit = value)"
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
            {
              name: 'All',
              value: 'All',
            },
          ]"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
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
        >
          <span class="mx-2">Mail</span>
        </button>
        <Mail @sendEmail="(value) => sendEmail(value)"></Mail>
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
      @view="(value) => (data.viewValue = value)"
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
