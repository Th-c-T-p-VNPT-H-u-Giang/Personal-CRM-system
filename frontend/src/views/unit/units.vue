<template>
    <!-- Bảng thông tin đơn vị -->
  
    <div>
      <!-- Quay về levels -->
        <div class="row my-3">
            <router-link :to="{name:'Unit'}" class="col-3">
                <span class="material-symbols-outlined " > 
                    arrow_back_ios
                </span>
            </router-link>
            <h1 class="col-9"   >
                INFORMATION OF UNITS
            </h1>
        </div>
        
    <!-- Btn thêm level -->
      <button class="btn btn-primary my-2">
        <span class="material-symbols-outlined" @click="AddUnit"> add </span>
      </button>
    <!-- Bảng levels -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="index" v-for="(unit, index) in units">
            <th scope="row">{{ unit.id }}</th>
            <td>{{ unit.name }}</td>
            <td>
              
           
              <span
                class="material-symbols-outlined"
                @click="UpdateUnit(unit.id)"
              >
                border_color
              </span>
              &nbsp;
              <span
                class="material-symbols-outlined"
                @click="DeleteUnit(unit.id)"
              >
                delete
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <script>
  import { ref, reactive } from "vue";
  import Swal from "./use/showSwal";
  export default {
    name: "Units",
    setup() {
      //Dữ liệu mẫu
      const units = reactive([
        { id: 1, name: "VNPT Hậu Giang" },
        { id: 2, name: "VNPT Tiền Giang" },
      ]);
      //export từ use/showSwal.js
      const { showFail, showSuccess } = Swal();
  
     //Hàm thêm đơn vị
      const AddUnit = async () => {
        console.log("thêm đơn vị");
        showSuccess ();
      };
      //Hàm cập nhật đơn vị
      const UpdateUnit = async (id) => {
        console.log("cập nhật đơn vị:", id);
        showSuccess ();
      };
      //Hàm xóa đơn vị
      const DeleteUnit = async (id) => {
        console.log("xóa đơn vị:", id);
        showSuccess ();
      };
  
      return { units, AddUnit, UpdateUnit, DeleteUnit };
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
  