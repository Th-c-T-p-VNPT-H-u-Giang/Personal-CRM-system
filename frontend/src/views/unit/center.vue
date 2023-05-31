<template>
  <div class="modal" id="model-center">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Tất cả trung tâm</h4>
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
                  data-toggle="modal3"
                  data-target="#model-add"
                  @click="display"
                >
                  <span id="add" class="mx-2">Thêm</span>
                </button>

                <Add :newData="newData" @addorupdate="addOrUpdatecenel()" />
              </div>
            </div>
            <!-- Table -->
            <!-- @update="getcenel" -->
            <Table
              :items="setPages"
              :fields="['Mã trung tâm', 'Tên trung tâm']"
              :labels="['cen_id', 'cen_name']"
              @update="getcenter"
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
import Add from "./form_table/add_update_center.vue";
import Form from "./form_table/formLevel.vue";
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
    Form,
  },
  setup(ctx) {
    const data = reactive({
      items: [{ cen_id: 1, cen_name: "VNPT Hậu Giang" }],
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
      cen_id: "",
      cen_name: "",
      cen: "",
    });
    const { showSuccess } = Swal();
    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [value.cen_name].join("").toLocaleLowerCase();
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
    const getcenter = async (value_id) => {
      document.getElementById("model-add").style.display = "block";
      newData.cen_id = value_id;
      newData.cen_name = data.items[value_id - 1].cen_name;
      newData.cen = "update";
    };
    const display = () => {
      document.getElementById("model-add").style.display = "block";
    };
    const emptyNewData = () => {
      newData["cen_id"] = "";
      newData["cen_name"] = "";
      newData["cen"] = "";
    };
    const addOrUpdatecenel = () => {
      if (newData.cen == "update") {
        console.log("UPDATE THU NGHIEM", newData.cen_id, newData.cen_name);
        emptyNewData();
        document.getElementById("model-add").style.display = "none";
        showSuccess();
      } else {
        console.log("ADD THU NGHIEM", newData.cen_name);
        data.items.push({ cen_id: 8, cen_name: newData.cen_name });
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
      addOrUpdatecenel,
      getcenter,
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
