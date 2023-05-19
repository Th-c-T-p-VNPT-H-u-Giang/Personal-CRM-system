<template>
  <!-- Bảng thông tin đơn vị -->

  <div>
    <h1 class="text-center my-3">INFORMATION OF LEVELS</h1>
    <button class="btn btn-primary my-2">
      <span class="material-symbols-outlined" @click="AddLevel"> add </span>
    </button>
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(level, index) in levels" @click="InfoUnits(level.id)">
          <th scope="row">{{ level.id }}</th>
          <td>{{ level.name }}</td>
          <td>
            <router-link :to="{ name: 'Units', params: { id: level.id } }">
              <span class="material-symbols-outlined"> info </span></router-link
            >
            &nbsp;
            <span
              class="material-symbols-outlined"
              @click="UpdateLevel(level.id)"
            >
              border_color
            </span>
            &nbsp;
            <span
              class="material-symbols-outlined"
              @click="DeleteLevel(level.id)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal update and add level -->

    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Launch demo modal
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
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import Swal from "./use/showSwal";
import router from "../../router";
export default {
  name: "Levels",
  setup() {
    const levels = reactive([
      { id: 1, name: "Tổng công ty VNPT " },
      { id: 2, name: "Phòng" },
    ]);
    //Export từ use/showSwal.js
    const { showFail, showSuccess } = Swal();
    //Hàm thông tin cấp
    const InfoUnits = async (id) => {
      console.log("chi tiết của cấp:", id);
      router.push({ name: 'Units', params: { id:id }})
    };
    //Hàm thêm cấp
    const AddLevel = async () => {
      console.log("thêm");
       showSuccess();
    };
    //Hàm cập nhật cấp
    const UpdateLevel = async (id) => {
      console.log("cập nhật cấp:", id);
      showSuccess();

    };
    //Hàm xóa cấp
    const DeleteLevel = async (id) => {
      console.log("xóa cấp:", id);
      showSuccess();

    };

    return { levels, AddLevel, UpdateLevel, DeleteLevel, InfoUnits };
  },
};
</script>
<style scoped>
span{
  cursor: pointer;
}
span:hover{
  opacity: .7;
}
</style>
