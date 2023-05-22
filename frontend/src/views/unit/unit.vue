<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import DeleteAll from "./form_table/delete-all-lananh.vue";
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

    const data = reactive({
      items: [
        { lev_id: 1, lev_name: "Tổng công ty VNPT " },
        { lev_id: 1, lev_name: "Phòng" },
        { lev_id: 1, lev_name: "Tổng công ty VNPT " },
        { lev_id: 2, lev_name: "Phòng" },
        { lev_id: 2, lev_name: "Tổng công ty VNPT " },
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
    const newData = reactive({
      lev_id: "",
      lev_name: "",
      lev: "",
    });
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const { showSuccess } = Swal();
    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        console.log("value.name", value.lev_name);
        return [value.lev_name].join("").toLocaleLowerCase();
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

    const getLevel = async (value_id) => {
      document.getElementById("model-add").style.display = "block";
      newData.lev_id = value_id;
      newData.lev = "update";
    };
    const emptyNewData = () => {
      newData["lev_id"] = "";
      newData["lev_name"] = "";
      newData["lev"] = "";
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
    <h1>Units</h1>
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
      :fields="['Id_lev', 'Name']"
      :labels="['lev_id', 'lev_name']"
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
