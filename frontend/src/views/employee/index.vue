<script>
import Table from "../../components/table/table_employee.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "../../components/form/delete-all.vue";
import Add from "./add.vue";
import Edit from "./edit.vue";
import View from "./view.vue";
import { reactive, computed, watch, ref, onMounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
//***
import SelectOption from "../../components/box_lananh/select_cdu.vue";
import Center from "../../views/unit/center.vue";
import CenterServices from "../../services/center.services";
import departmentsServices from "../../services/dep.services";
import unitsServices from "../../services/unit.services";

// Vanh
import Employee from "../../services/employee.service";
import Position from "../../services/position.service";
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
} from "../../assets/js/common.alert";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    Add,
    DeleteAll,
    Edit,
    View,
    // ***
    SelectOption,
    Center,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        {
          _id: "",
          name: "",
          Position: {
            name: "",
          },
          Unit: {
            name: "",
            Department: { name: "", Center_VNPTHG: { name: "" } },
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
      itemAdd: {
        _id: "",
        name: "",
        birthday: "",
        address: "",
        phone: "",
        email: "",
        position: "",
        unit: "",
        department: "",
        center: "",
      },
      activeEdit: false,
      editValue: {
        _id: "",
        name: "",
        content: "",
      },
    });

    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase();
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
    });

    // methods
    // VAnh
    const create = async () => {
      console.log("creating");
      console.log("Data ItemAdd Employee: ", data.itemAdd);
      const result = await http_create(Employee, data.itemAdd);
      console.log("result", result);
      if (!result.error) {
        alert_success(
          `Thêm nhân viên`,
          `Nhân viên "${result.document.name}" đã được tạo thành công.`
        );
        refresh();
      } else if (result.error) {
        alert_error(`Thêm nhân viên`, `${result.msg}`);
      }
    };
    const update = (item) => {
      console.log("updating", item);
    };
    //Vanh
    const deleteOne = async (_id) => {
      console.log("Deleting", _id);
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
    //REFRESH
    const refresh = async () => {
      // data.units = await http_getAll(unitsServices);
      data.positions = await http_getAll(Position);
      data.items = await http_getAll(Employee);
    };
    const edit = () => {
      console.log("edit");
    };

    const router = useRouter();

    const view = (_id) => {
      console.log("view", _id);
      router.push({ name: "Event.view", params: { id: _id } });
    };

    // watch
    const activeMenu = ref(1);
    watch(activeMenu, (newValue, oldValue) => {
      router.push({ name: "Position" });
    });

    // ****** trung tâm ******
    const centers = reactive({ center: [] });
    const selectedOptionCenter = ref("Trung tâm");
    watch(selectedOptionCenter, async (newValue, oldValue) => {
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
      // console.log("Units:", units.unit);
      // if (newValue == "other") {
      //   console.log("Show model-center:");
      //   document.getElementById("model-center").style.display = "block";
      // }
    });
    const departments = reactive({ department: [] });
    const selectedOptionDepartment = ref("Phòng");
    watch(selectedOptionDepartment, async (newValue, oldValue) => {
      // console.log("New Department:", newValue);
      units.unit = await unitsServices.findAllUnitsOfADep(newValue);
    });

    const units = reactive({
      unit: [],
    });
    const selectedOptionUnit = ref("Đơn vị");
    watch(selectedOptionUnit, (newValue, oldValue) => {
      console.log("New Unit:", newValue);
    });

    onMounted(async () => {
      centers.center = await CenterServices.getAll();
      departments.department = await departmentsServices.getAll();
      units.unit = await unitsServices.getAll();
      await refresh();
      console.log("hi employee", data.items);
      console.log("hi position", data.positions);
      console.log("hi unit", data.units);
    });
    return {
      data,
      setPages,
      activeMenu,
      create,
      update,
      deleteOne,
      edit,
      view,
      //***
      centers,
      selectedOptionCenter,
      departments,
      selectedOptionDepartment,
      units,
      selectedOptionUnit,
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
          <!-- <select class="form-control">
            <option value="" disabled selected hidden>Chức vụ</option>
            <option v-for="positions in data.positions" :key="positions" :value="positions._id">{{ positions.name }}</option>
          </select>             -->
          <Select
            :title="`Chức vụ`"
            :options="data.positions"
            @update:entryValue="(value) => (data.entryValue = value)"
            :entryValue="data.entryValue"
          />
        </div>
        <!-- **** Lan Anh **** -->
        <div class="form-group w-100 ml-3">
          <SelectOption
            :title="`Trung tâm`"
            :selectedOption="selectedOptionCenter"
            :field="centers.center"
            :add="'center'"
            @option="
              (value) => {
                selectedOptionCenter = value;
              }
            "
          />
        </div>
        <div class="form-group w-100 ml-3">
          <SelectOption
            :title="`Phòng`"
            :selectedOption="selectedOptionDepartment"
            :field="departments.department"
            :add="'dep'"
            @option="
              (value) => {
                selectedOptionDepartment = value;
              }
            "
          />
        </div>
        <div class="form-group w-100 ml-3">
          <SelectOption
            :title="`Đơn vị`"
            :selectedOption="selectedOptionUnit"
            :field="units.unit"
            @option="
              (value) => {
                selectedOptionUnit = value;
              }
            "
          />
        </div>
        <!-- **** -->
        <div class="form-group"></div>
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
        <!-- <DeleteAll :items="data.items" /> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#model-add"
        >
          <span id="add" class="mx-2">Thêm</span>
        </button>
        <Add
          :item="data.itemAdd"
          :positions="data.positions"
          @create="create"
          @newCenter="
            (value) => {
              centers.center = value;
            }
          "
          @newDep="
            (value) => {
              departments.department = value;
            }
          "
          @newUnit="
            (value) => {
              units.unit = value;
            }
          "
        />
      </div>
    </div>
    <!-- Table -->
    <Table
      :items="setPages"
      :fields="[
        'Họ và tên',
        'Sđt',
        'Email',
        'Ngày sinh',
        'Chức vụ',
        'Đơn vị',
        'Phòng',
        'Trung tâm',
      ]"
      :labels="['name', 'phone', 'email', 'birthday']"
      @delete="(value) => deleteOne(value)"
      @edit="
        (value, value1) => (
          (data.editValue = value), (data.activeEdit = value1)
        )
      "
      @view="(value) => view(value)"
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
    />
    <View />
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
</style>
