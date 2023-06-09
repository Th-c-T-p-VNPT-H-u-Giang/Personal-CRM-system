<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
// import Pagination from "../../components/table/pagination_duy.vue";

import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "./form_table/add_update_center.vue";

import Form from "./form_table/formLevel.vue";
import { reactive, computed, ref, watch, onBeforeMount, onMounted } from "vue";
// import Swal from "./use/showSwal";
import centerServices from "../../services/center.services";
import { useRouter, useRoute } from "vue-router";

import { http_getAll } from "../../assets/js/common.http";
import CenterServices from "../../services/center.services";
import Swal from "sweetalert2";
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
    Form,
  },

  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    const data = reactive({
      items: [{ name: "", _id: "" }],
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

    // const { showSuccess } = Swal();
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
      // console.log("filtered:");

      if (!data.searchText) {
        // console.log("1");
        data.totalRow = data.items.length;
        return data.items;
      } else {
        // console.log("2");
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      // console.log("setNumberofpages");
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      // console.log("setpages");
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
    const detail = (data) => {
      router.push({
        name: "Center.view",
        params: { id: data },
        query: { active: 2 },
      });
      console.log("detail", data);
    };
    const update = async (value_id) => {
      let data = await centerServices.getOne(value_id);

      const { value: CenterName } = await Swal.fire({
        title: "Chỉnh sửa trung tâm",
        input: "text",
        inputLabel: "Tên trung tâm",
        inputValue: data.name,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Tên trung tâm không được bỏ trống";
          }
        },
      });

      if (CenterName) {
        const document = await centerServices.update(value_id, {
          name: CenterName,
        });
        console.log("error", document);
        if (document.error) {
          alert_warning("Bạn chưa chỉnh sửa trung tâm", `${CenterName}`);
          return;
        }
        alert_success(`Đã  chỉnh sửa trung tâm`, `${CenterName}`);
        await refresh("center");
      }
    };
    const onDelete = async (data) => {
      const documents = await centerServices.getOne(data);
      const result = await alert_delete("Bạn muốn xóa", documents.name);
      if (result) {
        await centerServices.deleteOne(data);
        alert_success("Bạn đã xóa trung tâm", documents.name);
        refresh();
      }
    };

    // ****REFRESH
    const refresh = async () => {
      data.items = await http_getAll(CenterServices);
    };
    //CENTERS
    const create = async () => {
      const { value: CenterName } = await Swal.fire({
        title: "Thêm mới trung tâm",
        input: "text",
        inputLabel: "Tên trung tâm",
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Tên trung tâm không được bỏ trống";
          }
        },
      });

      if (CenterName) {
        Swal.fire(`Tên trung tâm mới là ${CenterName}`);
        await centerServices.create({ name: CenterName });
        await refresh("center");
      }
    };

    onMounted(async () => {
      data.items = await centerServices.getAll();
      data.activeMenu = route.query.active;
      console.log("query", route.query.active);
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
      </div>
    </div>
    <!-- Table -->
    <!-- @update="getcenel" -->
    <Table
      :items="setPages"
      :fields="['Mã trung tâm', 'Tên trung tâm']"
      :labels="['_id', 'name']"
      @update="update"
      @onDelete="onDelete"
      @detail="detail"
      :name_id="'cen_id'"
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
  border-collapse: collapse;
}
.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
  width: 117px;
  text-align: center;
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
