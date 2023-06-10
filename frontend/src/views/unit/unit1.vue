<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "./form_table/add_update_unit.vue";
import { reactive, computed, onBeforeMount } from "vue";
import centerServices from "../../services/center_vnpt.service";
import departmentServices from "../../services/department.service";
import unitServices from "../../services/unit.service";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { http_getAll, http_getOne } from "../../assets/js/common.http";
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
  setup(ctx) {
    const route = useRoute();
    const router = useRouter();
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
        return [value.uni_name].join("").toLocaleLowerCase();
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
      // console.log(data);
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.currentPage - 1) * data.entryValue &&
          index + 1 <= data.currentPage * data.entryValue
        );
      });
    });
    //
    const refresh = async () => {
      if (route.params.id) {
        data.items = await unitServices.findAllUnitsOfADep(route.params.id);
        return;
      }
      data.items = await http_getAll(unitServices);
    };
    const centers = reactive({ center: [] });
    const departments = reactive({ department: [] });

    const update = async (value_id) => {
      console.log("UPDATE");
      let data = await unitServices.getOne(value_id);
      const showSweetAlert = async () => {
        const { value: formValues } = await Swal.fire({
          title: "Thêm phòng mới",
          html: `
      <select id="my-select-center" class="swal2-input  mx-2" style="width:92%">
        <option disabled selected hidden value="${
          data.Department.Center_VNPTHG._id
        }">${data.Department.Center_VNPTHG.name}</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}" >${option.name}</option>`
          )
          .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input  mx-2" style="width:92%" >
        <option disabled selected hidden value="${data.departmentId}">${
            data.Department.name
          }</option>
        
      </select>
      </select>
      <input id="my-input"  class="swal2-input form-control  m-3" value="${
        data.name
      }" style="width:92%" type="text" placeholder="Tên phòng">
    `,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            const selectedOptionCenter =
              document.getElementById("my-select-center").value;
            const selectedOptionDep =
              document.getElementById("my-select-dep").value;

            const inputValue = document.getElementById("my-input").value;
            if (!selectedOptionCenter || !inputValue || !selectedOptionDep) {
              Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
            }

            return {
              selectedOptionCenter,
              selectedOptionDep,
              inputValue,
            };
          },
          didOpen: () => {
            const center = document.getElementById("my-select-center");
            const dep = document.getElementById("my-select-dep");

            center.addEventListener("change", async () => {
              const Id = center.value;
              departments.department =
                (await departmentServices.findAllDepOfACenter(Id)) || [];

              dep.innerHTML = `
          <option value="">Select a product</option>
          ${departments.department
            .map(
              (option) =>
                `<option value="${option._id}">${option.name}</option>`
            )
            .join("")}
        `;
            });
          },
        });

        if (formValues) {
          // Xử lý giá trị selectedOption và giá trị inputValue
          console.log(
            "Selected Option Center:",
            formValues.selectedOptionCenter
          );
          console.log("Selected Option dep:", formValues.selectedOptionDep);
          console.log("Input Value:", formValues.inputValue);
          const documents = await unitServices.update(value_id, {
            departmentId: formValues.selectedOptionDep,
            name: formValues.inputValue,
          });
          if (documents.error) {
            alert_warning(`Đã tồn tại  `, `${formValues.inputValue}`);
            return;
          }
          alert_success(`Đã chỉnh sửa `, `${formValues.inputValue}`);

          await refresh();
        }
      };

      // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
      showSweetAlert();
    };
    const create = () => {
      const showSweetAlert = async () => {
        const { value: formValues } = await Swal.fire({
          title: "Thêm phòng mới",
          html: `
      <select id="my-select-center" class="swal2-input  mx-2" style="width:92%">
        <option value="">Trung tâm</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}" >${option.name}</option>`
          )
          .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input  mx-2" style="width:92%" >
        <option value="">Phòng</option>
        
      </select>
      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên phòng">
    `,
          focusConfirm: false,
          showCancelButton: true,
          preConfirm: () => {
            const selectedOptionCenter =
              document.getElementById("my-select-center").value;
            const selectedOptionDep =
              document.getElementById("my-select-dep").value;

            const inputValue = document.getElementById("my-input").value;
            if (!selectedOptionCenter || !inputValue || !selectedOptionDep) {
              Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
            }

            return {
              selectedOptionCenter,
              selectedOptionDep,
              inputValue,
            };
          },
          didOpen: () => {
            const center = document.getElementById("my-select-center");
            const dep = document.getElementById("my-select-dep");

            center.addEventListener("change", async () => {
              const Id = center.value;
              departments.department =
                (await departmentServices.findAllDepOfACenter(Id)) || [];

              dep.innerHTML = `
          <option value="">Select a product</option>
          ${departments.department
            .map(
              (option) =>
                `<option value="${option._id}">${option.name}</option>`
            )
            .join("")}
        `;
            });
          },
        });

        if (formValues) {
          // Xử lý giá trị selectedOption và giá trị inputValue
          console.log(
            "Selected Option Center:",
            formValues.selectedOptionCenter
          );
          // console.log("Selected Option dep:", formValues.selectedOptionDep);
          // console.log("Input Value:", formValues.inputValue);
          const documents = await unitServices.create({
            departmentId: formValues.selectedOptionDep,
            name: formValues.inputValue,
          });
          if (documents.error) {
            alert_warning(`Đã tồn tại  `, `${formValues.inputValue}`);
            return;
          }
          alert_success(`Đã thêm `, `${formValues.inputValue}`);
          await refresh();
        }
      };

      // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
      showSweetAlert();
    };

    const onDelete = async (data) => {
      const documents = await unitServices.getOne(data);
      const result = await alert_delete("Bạn muốn xóa", documents.name);
      if (result) {
        await unitServices.deleteOne(data);
        alert_success("Bạn đã xóa ", documents.name);
        refresh();
      }
    };
    const detail = (data) => {
      // console.log("detail", data);
    };
    onBeforeMount(async () => {
      centers.center = await centerServices.getAll();
      data.activeMenu = route.query.active;

      departments.department = await departmentServices.getAll();
      if (route.params.id) {
        data.items = await unitServices.findAllUnitsOfADep(route.params.id);
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
        <!-- Modal -->
        <button type="button" class="btn btn-primary" @click="create">
          <span id="add" class="mx-2">Thêm</span>
        </button>

        <!-- <Add :newData="newData" @addorupdate="addOrUpdateunit()" /> -->
      </div>
    </div>
    <!-- Table -->
    <!-- @update="getuniel" -->
    <Table
      :items="setPages"
      :fields="['', 'Tên đơn vị']"
      :labels="['_id', 'name']"
      @update="update"
      @onDelete="onDelete"
      @detail="detail"
      :name_id="'uni_id'"
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
