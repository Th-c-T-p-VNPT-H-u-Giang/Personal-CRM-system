<template>
  <div class="modal" id="model-unit">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Tất cả đơn vị</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
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
                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal2"
                  data-target="#model-add-unit"
                  @click="display"
                >
                  <span id="add" class="mx-2">Thêm</span>
                </button>

                <Add :newData="newData" @addorupdate="addOrUpdateunit()" />
              </div>
            </div>
            <!-- Table -->
            <!-- @update="getuniel" -->
            <Table
              :items="setPages"
              :fields="['Mã đơn vị', 'Tên đơn vị']"
              :labels="['uni_id', 'uni_name']"
              @update="getunit"
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "./form_table/add_update_unit.vue";
import { reactive, computed } from "vue";
import Swal from "./use/showSwal";
import swal from "sweetalert2";
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
    const data = reactive({
      items: [
        { uni_id: 1, uni_name: "tổ 1" },
        { uni_id: 2, uni_name: "tổ 2" },
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
      uni_id: "",
      uni_name: "",
      uni: "",
    });
    const { showSuccess } = Swal();
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
    const getunit = async (value_id) => {
      document.getElementById("model-add-unit").style.display = "block";
      newData.uni_id = value_id;
      newData.uni_name = data.items[value_id - 1].uni_name;
      newData.uni = "update";
    };
    const display = () => {
      document.getElementById("model-add-unit").style.display = "block";
    };
    const emptyNewData = () => {
      newData["uni_id"] = "";
      newData["uni_name"] = "";
      newData["uni"] = "";
    };
    const addOrUpdateunit = () => {
      if (newData.uni == "update") {
        console.log("UPDATE THU NGHIEM", newData.uni_id, newData.uni_name);
        emptyNewData();
        document.getElementById("model-add-unit").style.display = "none";
        showSuccess();
      } else {
        console.log("ADD THU NGHIEM", newData.uni_name);
        data.items.push({ uni_id: 8, uni_name: newData.uni_name });
        emptyNewData();
        showSuccess();
      }
    };
    const onDelete = (data) => {
      swal
        .fire({
          title: "Bạn có muốn xóa trung tâm này?",
          // showDenyButton: true,
          showCancelButton: true,
          cancelButtonText: "Không",
          confirmButtonText: "Xóa",
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
    return {
      data,
      setPages,
      newData,
      addOrUpdateunit,
      getunit,
      onDelete,
      detail,
      display,
    };
  },
};
</script>
<style>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
</style>
