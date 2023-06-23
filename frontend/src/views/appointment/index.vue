<script>
import { useRouter, useRoute } from "vue-router";
import Table from "../../components/table/table-appointment.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import SelectFilter from "../../components/form/select_task_truc.vue";
import InputFilter from "../../components/form/form_filter_truc.vue";
import Add from "../appointment/add.vue";
import Edit from "./edit.vue";
import View from "./view.vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import Swal from "sweetalert2";
import { reactive, computed, watch, ref, onBeforeMount, onMounted } from "vue";
// services

import Task from "../../services/task.service";
import Cycle from "../../services/cycle.service";
import Employee from "../../services/employee.service";
import Customer from "../../services/customer.service";
import Employees_Task from "../../services/task_employee.service";
import Appointment from "../../services/appointment.service";
import StatusTask from "../../services/status_task.service";
import Evaluate from "../../services/evaluate.service";
import AddAppointment from "../appointment/add.vue";
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
  alert_delete_wide,
} from "../../assets/js/common.alert";
import { formatDate, formatDateTime } from "../../assets/js/common";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    SelectFilter,
    InputFilter,
    Select_Advanced,
    Add,
    Edit,
    View,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        {
          _id: "",
          date_time: "",
          content: "",
          note: "",
          place: "",
          StatusAppId: "",
          Status_App: {
            _id: "",
            name: "",
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
      selectAll: [
        {
          checked: false,
        },
      ],
      costomerName: "",
      editValue: {
        _id: "",
        date_time: "",
        place: "",
        content: "",
        note: "",
        StatusAppId: "",
        Status_App: {
          _id: "",
          name: "",
        },
      },
      customer: {
        name: "",
      },
    });
    const route = useRoute();
    const router = useRouter();
    const params = route.params.id;

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
          return [value.name, value.email, value.phone].join("").toLocaleLowerCase();
        });
      }
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(data.searchText.toLocaleLowerCase());
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

    // // methods
    const create = async () => {
      //await refresh();
      console.log("new task");
      await refresh();
    };

    const update = async (item) => {
      const result = await http_update(Task, editValue._id, editValue);
      if (!result.error) {
        alert_success(`Sửa phân công`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa phân công`, `${result.msg}`);
      }
    };
    const edit = async (editValue) => {
      console.log("edit", editValue);
      const result = await http_update(Appointment, editValue._id, editValue);
      console.log("ne", result);
      if (!result.error) {
        alert_success(`Sửa phân công`, `${result.msg}`);
        refresh();
      } else if (result.error) {
        alert_error(`Sửa phân công`, `${result.msg}`);
      }
    };

    const refresh = async () => {
      // data.evaluate = await http_getAll(Evaluate);
      data.customer = await http_getOne(Task, params);
      data.customer = data.customer.Customer.name;
      data.items = await Appointment.findAllAppointment(params);
      console.log("Dl", data.customer);

      // data.items = await data.items.Appointments;
      // console.log("lich hen", data.items.Status_App._id);
      // for (let value of data.items) {
      //   value.checked = false;
      // }
      for (const value of data.items) {
        value.date_time_format = formatDateTime(value.date_time);
      }
    };

    // handle http methods

    // Hàm callback được gọi trước khi component được mount (load)
    onMounted(async () => {
      await refresh();
    });

    return {
      params,
      create,
      update,
      edit,
      setPages,
      data,
    };
  },
};
</script>
<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Filter -->
    <!-- Search -->
    <!-- <div class="border-hr mb-3"></div> -->
    <div class="d-flex flex-column mt-3">
      <span class="mx-3 mb-3 h6">Lọc lịch hẹn</span>
      <div class="d-flex mx-3">
        <div class="form-group w-100"></div>
        <div class="form-group w-100 ml-3">
          <!-- <Select
            :title="`Trạng thái`"
            :entryValue="entryNameStatusTask"
            :options="status_tasks.status_task"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueStatusTask(value), (entryNameStatusTask = value1.name)
              )
            "
            @refresh="
              (entryNameStatusTask = 'Trạng thái'), updateEntryValueStatusTask('')
            "
            style="height: 35px"
          /> -->
        </div>
        <div class="form-group w-100 ml-3">
          <InputFilter
            @update:entryValue="(value) => (startdateValue = value)"
            :title="`Ngày bắt đầu`"
            :entryValue="`Ngày bắt đầu`"
            style="height: 35px"
          />
        </div>
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
              _id: 'nameCus',
              name: 'Tìm kiếm theo tên khách hàng',
            },
            {
              _id: 'statustask',
              name: 'Tìm kiếm theo trạng thái',
            },
            {
              _id: 'cycle',
              name: 'Tìm kiếm theo chu kỳ',
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
          @click="deleteMany()"
        >
          <span id="delete-all" class="mx-2">Xoá</span>
        </button>
        <!-- <DeleteAll :items="data.items" /> -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#modal-add"
        >
          <span id="add" class="mx-2">Thêm</span>
        </button>
        <Add @create="create" :taskId="params" :task="data.customer" />
      </div>
    </div>
    <!-- Table -->
    <Table
      :items="setPages"
      :cus="data.customer"
      :fields="['Ngày hẹn', 'Địa điểm', 'Nội dung lịch hẹn', 'Chú thích']"
      :labels="['date_time_format', 'place', 'content', 'note']"
      :selectAll="data.selectAll"
      @selectAll="(value) => handleSelectAll(value)"
      @selectOne="(id, item) => handlSelectOne(id, item)"
      @delete="handleDelete"
      @edit="(value, value1) => ((data.editValue = value), (data.activeEdit = value1))"
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
      @edit="edit(data.editValue)"
    />
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
