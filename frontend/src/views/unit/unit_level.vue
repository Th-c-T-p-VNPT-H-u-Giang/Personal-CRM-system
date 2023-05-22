<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "./form_table/delete_all_unit.vue";
import Add from "./form_table/add_update_level.vue";
import Form from "./form_table/formLevel.vue";
import showSwal from "./use/showSwal";
import { reactive, ref, computed, watch, onMounted } from "vue";
import Swal from "./use/showSwal";
import swal from "sweetalert2";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    Table,
    Pagination,
    Dropdown,
    Select,
    Search,
    Add,
    DeleteAll,
    Form,
  },
  setup(ctx) {
    const route = useRoute();
    const router = useRouter();
    const data_copy = reactive({
      items: [
        { lev_id: 1, uni_id: 1, uni_name: "Tổng công ty VNPT " },
        { lev_id: 1, uni_id: 2, uni_name: "Phòng tài chính" },
        { lev_id: 1, uni_id: 3, uni_name: "Tổng công ty VNPT " },
        { lev_id: 2, uni_id: 4, uni_name: "Phòng chăm sóc" },
        { lev_id: 2, uni_id: 5, uni_name: "Tổng công ty VNPT " },
      ],
      entryValue: 2,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
      activeSelectAll: false,
    });
    const data = ref({});
    data.value = data_copy;
    const newData = reactive({
      lev_id: "",
      uni_id: "",
      uni_name: "",
      uni: "",
    });
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const { showSuccess } = Swal();
    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.value.items.map((value, index) => {
        console.log("value.name", value.lev_name);
        return [value.uni_name].join("").toLocaleLowerCase();
      });
    });
    const filter = computed(() => {
      return data.value.items.filter((value, index) => {
        return toString.value[index].includes(
          data.value.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.value.searchText) {
        data.value.totalRow = data.value.items.length;
        return data.value.items;
      } else {
        data.value.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.value.entryValue);
    });
    const setPages = computed(() => {
      if (setNumberOfPages.value == 0 || data.value.entryValue == "All") {
        data.value.entryValue = data.value.items.length;
        data.value.numberOfPages = 1;
      } else data.value.numberOfPages = setNumberOfPages.value;
      data.value.startRow =
        (data.value.currentPage - 1) * data.value.entryValue + 1;
      data.value.endRow = data.value.currentPage * data.value.entryValue;
      // console.log(data);
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.value.currentPage - 1) * data.value.entryValue &&
          index + 1 <= data.value.currentPage * data.value.entryValue
        );
      });
    });

    const getLevel = async (value_id) => {
      document.getElementById("model-add").style.display = "block";
      newData.lev_id = value_id;
      newData.lev = "update";
    };
    const emptyNewData = () => {
      newData["lev_id"] = "";
      newData["uni_id"] = "";
      newData["uni_name"] = "";
      newData["uni"] = "";
    };
    const addOrUpdateLevel = () => {
      if (newData.lev == "update") {
        console.log("UPDATE THU NGHIEM", newData.lev_id);
        emptyNewData();
        document.getElementById("model-add").style.display = "none";
        showSuccess();
      } else {
        console.log("ADD THU NGHIEM", newData.lev_name);
        emptyNewData();
        showSuccess();
      }
    };
    const onDelete = (data) => {
      swal
        .fire({
          title: "Do you want to delete the level?",
          // showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          confirmButtonColor: "#cc0000",
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // CODE API
            console.log("Delete", data);
            swal.fire("Deleted!", "", "success");
          }
        });
    };
    const detail = (data) => {
      console.log("detail", data);
    };

    const params = ref({});
    computed(() => {
      console.log("params", data.value.searchText);
      return data.value.searchText;
    });
    const data_root = ref({});
    data_root.value = data_copy;
    const getUnitofLevel = (id) => {
      console.log("route:", id, data_copy);
      data.value.items = data_copy.items.filter(
        (uni, index) => uni.lev_id == id
      );
      console.log("new units a levels", data.value);
    };
    watch(
      () => route.params,
      (newParams) => {
        // Xử lý giá trị mới của route.params
        params.value = newParams;
        console.log("New route params:", params.value, data.value.items.length);
        getUnitofLevel(params.value.id);
      },
      { immediate: true, deep: true }
    );

    const selectedOption = ref("Level");
    watch(selectedOption, (newValue, oldValue) => {
      console.log("Dropdown value changed:", newValue);
      if (newValue != "Level" && newValue != "all")
        router.push({ name: "unit_level", params: { id: newValue } });
      else if (newValue == "all") router.push({ name: "unit" });
      selectedOption.value = "Level";
    });

    return {
      data,
      setPages,
      newData,
      addOrUpdateLevel,
      getLevel,
      onDelete,
      detail,
      levels,
      selectedOption,
    };
  },
};
</script>

<template>
  <div class="border-box d-flex flex-column ml-2">
    <h1>unit levels</h1>
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <select
        class="pl-2"
        v-model="selectedOption"
        @click="data.activeMenu = 1"
        :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
      >
        <option disabled selected hidden value="Level">Level</option>
        <option
          :value="`${value.lev_id}`"
          :key="index"
          v-for="(value, index) in levels"
        >
          {{ value.lev_name }}
        </option>
        <option value="all">All</option>
      </select>
      <a
        @click="data.activeMenu = 2"
        :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
        href="#"
        >Unit</a
      >
    </div>
    <!-- Filter -->
    <!-- Search -->
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
          <span id="delete-all" class="mx-2">Delete All</span>
        </button>
        <DeleteAll :items="data.items" />
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#model-add"
        >
          <span id="add" class="mx-2">Add</span>
        </button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add a New Level
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <Form :level="newData" @AddOrUpdate="addOrUpdateLevel"></Form>
              </div>
            </div>
          </div>
        </div>
        <Add :newData="newData" @addorupdate="addOrUpdateLevel()" />
      </div>
    </div>
    <!-- Table -->
    <!-- @update="getLevel" -->
    <Table
      :items="setPages"
      :fields="['Uni_id', 'Name']"
      :labels="['uni_id', 'uni_name']"
      @update="getLevel"
      @onDelete="onDelete"
      @detail="detail"
    />

    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      @updateCurrentPage="(value) => (data.currentPage = value)"
      class="mx-3"
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
select {
  background-color: #f6f6f6;
  border: 1px solid #b8c2cc;
  width: 80px;
  font-size: 16px;
}
</style>
