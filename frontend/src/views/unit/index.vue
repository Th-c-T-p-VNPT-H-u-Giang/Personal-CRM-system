<template>
  <div >
    <h1 class="text-center mt-4">INFORMATION OF LEVELS</h1>
    <!-- Button add trigger modal -->
    <button
    type="button"
    class="btn btn-primary mb-2"
    data-toggle="modal"
    data-target="#exampleModal"
  >
  <span class="material-symbols-outlined mt-1"> add </span>
    </button>
   <!-- Bảng thông tin cấp -->
    <table class="table table-hover mb-5">
      <thead>
        <tr>
          <!-- <th>STT</th> -->
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="index" v-for="(level, index) in levels" >
          <!-- <th>{{ index + 1 }} </th> -->
          <th scope="row">{{ level.lev_id }}</th>
          <td @click="InfoUnits(level.lev_id)">{{ level.lev_name }}</td>
          <td>
            <!-- chuyển trang đến đơn vị  -->
            <router-link 
            :to="{ name: 'Units', params: { id: level.lev_id } }"
            class="display-hide"
            >
              <span class="material-symbols-outlined"> info </span>
            </router-link> &nbsp;
            <!-- Icon chỉnh sửa, lấy thông tin chỉnh sửa qua hàm getLevel với 2 tham số 1 id, index -->
            <span
              class="material-symbols-outlined"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="getLevel(level.lev_id,index)">
              border_color
            </span>
            &nbsp;
            <!-- icon xóa, thực hiện xóa qua hàm DeleteLevel -->
            <span
              class="material-symbols-outlined"
              @click="DeleteLevel(level.lev_id,index)"
            >
              delete
            </span>
          </td>
        </tr>
      </tbody>
    </table>
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
            <Form :level="level"
            @AddOrUpdate="AddOrUpdateLevel"
                  
            ></Form>
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
import Form from "./form/formLevel.vue"
export default {
  name: "Levels",
  components:{Form},
  setup() {
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const level=reactive({lev_id:'',lev_name:'',lev:''});
    //Export từ use/showSwal.js
    const { showDelete, showSuccess } = Swal();

    //Hàm thông tin cấp
    const InfoUnits = async (id) => {
      console.log("chi tiết của cấp:", id);
      router.push({ name: 'Units', params: { id:id }})
    };
    //Lấy level 
    const getLevel=  async (id,index) => {
      // console.log("Get level:", id,index);
      level.lev_id=levels[index].lev_id;
      level.lev_name=levels[index].lev_name;
      level.lev='Update';
    };
    //Add or update 
    const AddOrUpdateLevel =() => {
      console.log("Add or Update");
      if(level.lev==''){
        console.log('Add',level);
        levels[levels.length]={lev_id:level.lev_id,lev_name:level.lev_name};
      }
      else{
        console.log('Update',level);        
      }
      showSuccess();
      level.lev_id='';
      level.lev_name='';
      level.lev=''
    };
    //Hàm xóa cấp
    const DeleteLevel = async (id,index) => {
      console.log("xóa cấp:", id);
      levels.splice(index,1);
      showDelete();

    };

    return { 
      levels,level,
      AddOrUpdateLevel,
      getLevel,
      DeleteLevel, InfoUnits,
      };
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
@media screen and (max-width:739px){  .display-hide{
    display: none;
  }
}
</style>
