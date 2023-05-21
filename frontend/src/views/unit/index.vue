<template>
  <div class="border-box p-2 ml-2">
    <h1 class="text-center mt-4">INFORMATION OF LEVELS</h1>
    <!-- btn add, delete, levels, units -->
    <div class="row mb-2">
      <!-- btn add, delete -->
      <div class="col-5">
        <!-- Button add trigger modal -->
        <button
          type="button"
          class="btn active-menu mr-1"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <span class="material-symbols-outlined"> add </span>
        </button>
        <!-- btn delete -->
        <button class="btn btn-danger" @click="deleteAll">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
      <!-- btn levels, units -->
      <div class="col-7">
        <!-- btn levels -->
        <button
          class="btn menu active-menu"
          style="border-right: 1px solid #9e9898 !important"
        >
          Levels
        </button>
        <!-- btn units -->
        <router-link :to="{ name: 'Units' }">
          <button class="btn menu">Units</button>
        </router-link>
      </div>
    </div>

    <!-- Bảng thông tin cấp -->
    <table class="table table-hover mb-5">
      <thead>
        <tr>
          <th>#</th>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(level, index) in newLevels">
          <td>
            <input
              type="checkbox"
              :id="`${level.lev_id}`"
              v-model="checkboxValues[index].checked"
            />
          </td>
          <td scope="row">{{ level.lev_id }}</td>
          <td @click="InfoUnits(level.lev_id)">{{ level.lev_name }}</td>
          <td>
            <!-- Link to units  -->
            <router-link
              :to="{ name: 'UnitsofLevel', params: { id: level.lev_id } }"
              class="display-hide"
            >
              <span class="material-symbols-outlined icon-info"> info </span>
            </router-link>
            &nbsp;
            <!-- Icon update, get information  by function getLevel with 2 params 1 id, index -->
            <span
              class="material-symbols-outlined icon-edit"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="getLevel(level.lev_id, index)"
            >
              border_color
            </span>
            &nbsp;
            <!-- icon xóa, thực hiện xóa qua hàm DeleteLevel -->
            <span
              class="material-symbols-outlined icon-delete"
              @click="DeleteLevel(level.lev_id, index)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <p>Checked count: {{ computedCheckedCount }}</p>

    <!-- Pagination -->
    <div class="d-flex justify-content-end">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>

          <li
            class="page-item"
            v-for="page in pagination.numberOfPages"
            :key="page"
          >
            <router-link
              class="page-link"
              :to="{ name: 'Unit', query: { page: page } }"
            >
              {{ page }}
            </router-link>
          </li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>

    <!-- Modal update and add level -->
    <!-- Modal-->
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
            <h5 class="modal-title" id="exampleModalLabel">LEVELS</h5>
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
            <Form :level="level" @AddOrUpdate="AddOrUpdateLevel"></Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, computed, watch } from "vue";
import Swal from "./use/showSwal";
import swal from "sweetalert2";

import { useRoute } from "vue-router";
import Form from "./form_table/formLevel.vue";
import Pagination_duy from "../../components/table/pagination_duy.vue";
export default {
  name: "Levels",
  components: { Form, Pagination_duy },
  setup() {
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
      { lev_id: 3, lev_name: "Phòng Tài chính" },
    ]);
    const level = reactive({ lev_id: "", lev_name: "", lev: "" });
    //Export from use/showSwal.js
    const { showDelete, showSuccess } = Swal();
    const newLevels = ref({});
    newLevels.value = levels;
    //information units of a level
    const InfoUnits = async (id) => {
      console.log("chi tiết của cấp:", id);
      router.push({ name: "UnitsofLevel", params: { id: id } });
    };
    //get a level
    const getLevel = async (id, index) => {
      // console.log("Get level:", id,index);
      level.lev_id = levels[index].lev_id;
      level.lev_name = levels[index].lev_name;
      level.lev = "Update";
    };
    //Add or update
    const AddOrUpdateLevel = () => {
      console.log("Add or Update");
      if (level.lev == "") {
        console.log("Add", level);
        levels[levels.length] = {
          lev_id: level.lev_id,
          lev_name: level.lev_name,
        };
      } else {
        console.log("Update", level);
      }
      showSuccess();
      level.lev_id = "";
      level.lev_name = "";
      level.lev = "";
    };
    //function delete a level
    const DeleteLevel = async (id, index) => {
      console.log("xóa cấp:", id);
      swal
        .fire({
          title: "Do you want to delete the level?",
          // showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Delete",
          confirmButtonColor: "#cc0000",
          // denyButtonText: `Delete`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            levels.splice(index, 1);
            swal.fire("Deleted!", "", "success");
          }
        });
    };
    const levelsCount = ref(levels.length);
    const checkboxValues = ref([]);
    checkboxValues.value = Array(levelsCount.value);
    for (let i = 0; i < levelsCount.value; i++) {
      checkboxValues.value[i] = { id: levels[i].lev_id, checked: false };
    }
    const computedCheckedCount = computed(() => {
      return checkboxValues.value.filter((value) => value.checked).length;
    });
    watch(checkboxValues.value, (newValues) => {
      console.log("Checkbox values changed:", checkboxValues.value, newValues);
    });

    const deleteAll = async () => {
      console.log("Delete All");
      var newArray = ref([]);

      checkboxValues.value.forEach((checkbox, index) => {
        if (checkbox.checked == true) {
          console.log("Delete ID:", checkboxValues.value[index].id);
          newLevels.value.splice(index, 1);
        }
      });
      console.log(newLevels);
      showDelete();
    };
    // Monitor newlevels after deletion
    watch(newLevels.value, (newValues) => {
      levelsCount.value = levels.length;
      for (let i = 0; i < levelsCount.value; i++) {
        checkboxValues.value[i] = {
          id: newValues.value[i].lev_id,
          checked: false,
        };
      }
    });
    // Pagination
    const route = useRoute();
    const pagination = {
      entryValue: 2,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
    };
    const setNumberOfPages = computed(() => {
      return Math.ceil(levels.length / pagination.entryValue);
    });
    const setPages = () => {
      pagination.numberOfPages = setNumberOfPages.value;
      if (route.query.page) pagination.currentPage = route.query.page;
      newLevels.value = levels.slice(0, pagination.entryValue);
    };
    setPages();
    watch(
      () => route.query,
      (newQuery, oldQuery) => {
        // Xử lý logic khi route.query thay đổi
        console.log("Route query changed:", newQuery);
        setPages();
        if (route.query.page > 0)
          newLevels.value = levels.slice(
            (route.query.page - 1) * pagination.entryValue,
            route.query.page * pagination.entryValue
          );
        else newLevels.value = levels.slice(0, pagination.entryValue);
      }
    );
    return {
      levels,
      level,
      AddOrUpdateLevel,
      getLevel,
      DeleteLevel,
      InfoUnits,
      checkboxValues,
      computedCheckedCount,
      deleteAll,
      pagination,
      setPages,
      newLevels,
    };
  },
};
</script>
<style scoped>
span {
  cursor: pointer;
}
span:hover {
  opacity: 0.7;
}
.icon-edit:hover {
  color: #e38205;
}
.icon-delete:hover {
  color: #dc3545;
}
.icon-info:hover {
  color: blue;
}
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.col-7 {
  text-align: end;
}
@media screen and (max-width: 739px) {
  .display-hide {
    display: none;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 12px;
  }
  .btn {
    padding: 8px;
    margin-right: 2px;
  }
}
.menu {
  padding: 8px 12px;
  font-size: 15px;
}

.active-menu {
  color: #fff;
  background-color: blue;
}
td {
  width: 10px;
}
</style>
