<template>
  <div>
    <div class="modal modal-cdu" id="model-center">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Tất cả trung tâm</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal_center"
              @click="turnOff"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
          <div class="modal-body">
            <div>
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
                    data-target="#model-add-center"
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
                :labels="['_id', 'name']"
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
  </div>
</template>
<script>
import Table from "./form_table/table_lananh.vue";
import Pagination from "./form_table/pagination_lananh.vue";
// import Pagination from "../../components/table/pagination_duy.vue";

import Dropdown from "../../components/form/dropdown.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import Add from "./form_table/add_update_center.vue";
import Form from "./form_table/formLevel.vue";
import { reactive, computed, onMounted, ref, watch } from "vue";
import Swal from "./use/showSwal";
import swal from "sweetalert2";
import centerServices from "../../services/center.services";
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
    const data = reactive({
      items: [{ name: "", _id: "" }],
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
      _id: "",
      name: "",
      cen: "",
    });
    const { showSuccess } = Swal();
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
    const getcenter = async (value_id) => {
      document.getElementById("model-add-center").style.display = "block";
      let centerEdit = await centerServices.findOne(value_id);
      newData._id = value_id;
      newData.name = centerEdit.document.name;
      newData.cen = "update";
    };
    const display = () => {
      document.getElementById("model-add-center").style.display = "block";
    };

    const turnOff = () => {
      console.log("turnoff");
      document.getElementById("model-center").style.display = "none";
    };
    const emptyNewData = () => {
      newData["_id"] = "";
      newData["name"] = "";
      newData["cen"] = "";
    };
    const init = async () => {
      let documents = await centerServices.findAll();
      data.items = documents.document;
      console.log("emit newData", data.items);
      ctx.emit("newData", data.items);
    };
    const addOrUpdatecenel = async () => {
      if (newData.cen == "update") {
        console.log("UPDATE THU NGHIEM", newData._id, newData.name);
        await centerServices.update(newData._id, newData);
        init();
        emptyNewData();
        document.getElementById("model-add-center").style.display = "none";
        showSuccess();
      } else {
        console.log("ADD THU NGHIEM", newData);
        await centerServices.create(newData);
        init();
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
        .then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            console.log("Delete", data);
            await centerServices.deleteOne(data);
            init();
            swal.fire("Deleted!", "", "success");
          }
        });
    };
    const detail = (data) => {
      console.log("detail", data);
    };

    onMounted(async () => {
      let documents = await centerServices.findAll();
      data.items = documents.document;
      console.log("Mounted length:", data.items.length, "Data:", data.items);
    });
    return {
      data,
      setPages,
      newData,
      addOrUpdatecenel,
      getcenter,
      onDelete,
      detail,
      display,
      turnOff,
    };
  },
};
</script>
<style>
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.modal-cdu {
  width: calc(100% + 300px);
  left: -150px;
  right: -150px;
  top: -26px;
  height: 100%;
}
</style>
