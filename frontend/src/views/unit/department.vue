<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "../../components/box_lananh/select_cdu.vue";
import { reactive, computed, ref, onBeforeMount, onMounted } from "vue";

import departmentServices from "../../services/department.service";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { http_getAll, http_getOne } from "../../assets/js/common.http";
import centerServices from "../../services/center_vnpt.service";
import {
  alert_delete,
  alert_success,
  alert_warning,
} from "../../assets/js/common.alert";
export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    Add,
  },
  props: {
    center: { type: Array, default: [] },
    selectedOptionCenter: { type: String, default: "" },
  },
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();

    const data = reactive({
      items: [{ _id: "", name: "" }],
      entryValue: 10,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
      activeSelectAll: false,
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

    const centers = reactive({ center: [] });

    const refresh = async () => {
      if (route.params.id) {
        data.items = await departmentServices.findAllDepOfACenter(
          route.params.id
        );
        return;
      }
      data.items = await http_getAll(departmentServices);
    };

    const detail = (data) => {
      router.push({
        name: "Department.view",
        params: { id: data },
        query: { active: 3 },
      });
      // console.log("detail", data);
    };
    const onDelete = async (data) => {
      const documents = await departmentServices.getOne(data);
      const result = await alert_delete("Bạn muốn xóa", documents.name);
      if (result) {
        await departmentServices.deleteOne(data);
        alert_success("Bạn đã xóa phòng", documents.name);
        refresh();
      }
    };
    const create = async () => {
      const document = ref("");
      if (route.params.id) {
        document.value = await centerServices.getOne(route.params.id);
      }
      const showSweetAlert = async () => {
        const { value: formValues } = await Swal.fire({
          title: "Thêm phòng mới",
          html: `
      <select id="my-select" class="swal2-input  mx-2" style="width:92%" >
        <option value="">Trung tâm</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}"
            ${option._id == document.value._id ? "selected" : ""}
            >${option.name}</option>`
          )
          .join("")}
      </select>

      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên phòng">
    `,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const selectedOption = document.getElementById("my-select").value;
            const inputValue = document.getElementById("my-input").value;
            if (!selectedOption || !inputValue) {
              Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
            }

            return {
              selectedOption,
              inputValue,
            };
          },
        });

        if (formValues) {
          // Xử lý giá trị selectedOption và giá trị inputValue
          // console.log("Selected Option:", formValues.selectedOption);
          // console.log("Input Value:", formValues.inputValue);
          const documents = await departmentServices.create({
            centerVNPTHGId: formValues.selectedOption,
            name: formValues.inputValue,
          });
          if (documents.error) {
            alert_warning(`Đã tồn tại phòng `, `${formValues.inputValue}`);
            return;
          }
          alert_success(`Đã thêm phòng`, `${formValues.inputValue}`);
          await refresh();
        }
      };

      // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
      showSweetAlert();
    };
    const update = async (value_id) => {
      let data = await departmentServices.getOne(value_id);

      const showSweetAlert = async () => {
        const { value: formValues } = await Swal.fire({
          title: "Thêm phòng mới",
          html: `
      <select id="my-select" class="swal2-input  mx-2" >
        <option disabled selected hidden value="${data.centerVNPTHGId}">${
            data.Center_VNPTHG.name
          }</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}">${option.name}</option>`
          )
          .join("")}
      </select>

      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên phòng" value="${
        data.name
      }">
    `,
          showCancelButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const selectedOption = document.getElementById("my-select").value;
            const inputValue = document.getElementById("my-input").value;
            if (!selectedOption || !inputValue) {
              Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
            }

            return {
              selectedOption,
              inputValue,
            };
          },
        });

        if (formValues) {
          // Xử lý giá trị selectedOption và giá trị inputValue
          // console.log("Selected Option:", formValues.selectedOption);
          // console.log("Input Value:", formValues.inputValue);
          const documents = await departmentServices.update(value_id, {
            centerVNPTHGId: formValues.selectedOption,
            name: formValues.inputValue,
          });
          if (documents.error) {
            alert_warning(
              "Bạn chưa chỉnh sửa phòng",
              `${formValues.inputValue}`
            );
            return;
          }
          alert_success(`Đã  chỉnh sửa phòng`, `${formValues.inputValue}`);
          await refresh();
        }
      };

      // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
      showSweetAlert();
    };
    onMounted(async () => {
      centers.center = await centerServices.getAll();
      data.activeMenu = route.query.active;
      if (route.params.id) {
        data.items = await departmentServices.findAllDepOfACenter(
          route.params.id
        );
        return;
      }
      data.items = await departmentServices.getAll();
    });
    return {
      data,
      setPages,
      update,
      onDelete,
      detail,
      create,
    };
  },
};
</script>
<template>
  <div class="border-box">
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link
        :to="{ name: 'Center', query: { active: 1 } }"
        :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        Trung tâm</router-link
      >

      <router-link
        :to="{ name: 'Department', query: { active: 2 } }"
        :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
      >
        Phòng</router-link
      >

      <router-link
        :to="{ name: 'Unit', query: { active: 3 } }"
        :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
      >
        Tổ</router-link
      >
    </div>
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mr-2 mb-3 row">
      <div class="d-flex justify-content-start col-5">
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
      <!-- Thêm  -->
      <div>
        <!-- btn thêm -->
        <button type="button" class="btn btn-primary" @click="create">
          <span id="add" class="mx-2">Thêm</span>
        </button>
      </div>
    </div>
    <!-- Table -->
    <Table
      :items="setPages"
      :fields="['', 'Tên phòng']"
      :labels="['_id', 'name']"
      @update="update"
      @onDelete="onDelete"
      @detail="detail"
      :name_id="'dep_id'"
    />

    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @updateCurrentPage="(value) => (data.currentPage = value)"
      class="mx-3"
    />
  </div>
</template>
<style>
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
  width: 117px;
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
.show-modal {
  display: block;
  opacity: 1;
  background-color: var(--dark);
  /* pointer-events: auto; */
  z-index: 1;
}

.modal-cdu {
  width: calc(100% + 300px);
  left: -150px;
  right: -150px;
  top: -26px;
  height: 100%;
}
</style>
