<template>
  <div class="border-box p-2 ml-2">
    <!-- link to level and title  -->
    <div class="row mt-4 mb-2">
      <router-link
        class="col-md-3 col-1 ml-2"
        style="line-height: 60px"
        :to="{ name: 'Unit' }"
      >
        <span class="material-symbols-outlined"> arrow_back_ios </span>
      </router-link>
      <h1 class="col-md-9 col-11">INFORMATION OF A UNITS</h1>
    </div>
    <!-- btn dropdown levels and units -->
    <div class="row mb-2">
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
        <button class="btn btn-danger">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </div>
      <div class="col-7">
        <!-- btn levels -->
        <div class="dropdown">
          <button
            class="btn menu dropdown-toggle"
            style="border-right: 1px solid #9e9898 !important"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Level
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <router-link
              :to="{ name: 'UnitsofLevel', params: { id: lev.lev_id } }"
              class="dropdown-item"
              :key="index"
              v-for="(lev, index) in levels"
              >{{ lev.lev_name }}</router-link
            >
            <router-link :to="{ name: 'Units' }" class="dropdown-item"
              >All</router-link
            >
          </div>
        </div>
        <!-- btn units -->
        <router-link :to="{ name: 'Units' }">
          <button class="btn menu active-menu">Units</button>
        </router-link>
      </div>
    </div>
    <!-- Table Units of a level -->
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
        <tr :key="index" v-for="(unit, index) in lev_units">
          <th>
            <input type="checkbox" name="" id="" />
          </th>
          <th scope="row">{{ unit.uni_id }}</th>
          <td>{{ unit.uni_name }}</td>
          <td>
            <!-- Icon chỉnh sửa, lấy thông tin chỉnh sửa qua hàm getLevel với 2 tham số 1 id, index -->
            <span
              class="material-symbols-outlined"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="getUnit(unit.uni_id, index)"
            >
              border_color
            </span>
            &nbsp;
            <!-- icon xóa, thực hiện xóa qua hàm DeleteLevel -->
            <span
              class="material-symbols-outlined"
              @click="DeleteUnit(unit.uni_id, index)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Pagination -->
    <div>
      <Pagination_duy></Pagination_duy>
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
            <h5 class="modal-title" id="exampleModalLabel">UNITS</h5>
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
            <Form :unit="unit" @AddOrUpdate="AddOrUpdateUnit"></Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive, watch } from "vue";
import Swal from "./use/showSwal";
import { useRoute, useRouter } from "vue-router";
import Form from "./form_table/formUnit.vue";
import Pagination_duy from "../../components/table/pagination_duy.vue";

export default {
  name: "Levels",
  components: { Form, Pagination_duy },
  setup() {
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const units = reactive([
      { lev_id: 1, uni_id: 1, uni_name: "Tổng công ty VNPT " },
      { lev_id: 1, uni_id: 2, uni_name: "Phòng" },
      { lev_id: 2, uni_id: 1, uni_name: "Phòng Kinh doanh" },
    ]);
    const unit = reactive({ uni_id: "", uni_name: "", uni: "" });
    const lev_units = ref([]);

    //Export từ use/showSwal.js
    const { showDelete, showSuccess } = Swal();
    const route = useRoute();
    const params = ref({});
    const getUnitofLevel = (id) => {
      console.log("route:", id);
      lev_units.value = units.filter((uni, index) => uni.lev_id == id);
      console.log("new units a levels", lev_units.value);
    };
    watch(
      () => route.params,
      (newParams) => {
        // Xử lý giá trị mới của route.params
        params.value = newParams;
        console.log("New route params:", params.value);
        getUnitofLevel(params.value.id);
      },
      { immediate: true, deep: true }
    );

    //Lấy level
    const getUnit = async (id, index) => {
      // console.log("Get level:", id,index);
      unit.uni_id = units[index].uni_id;
      unit.uni_name = units[index].uni_name;
      unit.uni = "Update";
    };
    //Add or update
    const AddOrUpdateUnit = () => {
      console.log("Add or Update");
      if (unit.uni == "") {
        console.log("Add", unit);
        units[units.length] = { uni_id: unit.uni_id, uni_name: unit.uni_name };
      } else {
        console.log("Update", unit);
      }
      showSuccess();
      unit.uni_id = "";
      unit.uni_name = "";
      unit.uni = "";
    };
    //Hàm xóa đơn vị
    const DeleteUnit = async (id, index) => {
      console.log("xóa cấp:", id);
      units.splice(index, 1);
      showDelete();
    };

    return {
      lev_units,
      levels,
      units,
      unit,
      AddOrUpdateUnit,
      getUnit,
      DeleteUnit,
      params,
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

.row {
  flex-wrap: nowrap;
}
.dropdown {
  display: inline;
}
@media screen and (max-width: 739px) {
  .col-11 {
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .col-1 {
    margin: 0;
  }
}
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
span {
  cursor: pointer;
}
span:hover {
  opacity: 0.7;
}
</style>
