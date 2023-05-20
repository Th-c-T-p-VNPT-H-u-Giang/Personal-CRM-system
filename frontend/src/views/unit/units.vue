<template>
  <div>
    <div class="row my-4">
      <router-link class="col-md-3 col-1 ml-2" style="line-height:60px;" :to="{name:'Unit'}">
        <span class="material-symbols-outlined ">
          arrow_back_ios
        </span>
      </router-link>
      
      <h1 class="  col-md-9 col-11">INFORMATION OF UNITS</h1>

    </div>
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
        <tr :key="index" v-for="(unit, index) in units" >
          <!-- <th>{{ index + 1 }} </th> -->
          <th scope="row">{{ unit.uni_id }}</th>
          <td >{{ unit.uni_name }}</td>
          <td>
            <!-- Icon chỉnh sửa, lấy thông tin chỉnh sửa qua hàm getLevel với 2 tham số 1 id, index -->
            <span
              class="material-symbols-outlined"
              data-toggle="modal"
              data-target="#exampleModal"
              @click="getUnit(unit.uni_id,index)">
              border_color
            </span>
            &nbsp;
            <!-- icon xóa, thực hiện xóa qua hàm DeleteLevel -->
            <span
              class="material-symbols-outlined"
              @click="DeleteUnit(unit.uni_id,index)"
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
            <Form :unit="unit"
            @AddOrUpdate="AddOrUpdateUnit"
                  
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
import Form from "./form/formUnit.vue"
export default {
  name: "Levels",
  components:{Form},
  setup() {
    const units = reactive([
      { uni_id: 1, uni_name: "Tổng công ty VNPT " },
      { uni_id: 2, uni_name: "Phòng" },
    ]);
    const unit=reactive({uni_id:'',uni_name:'',uni:''});
    //Export từ use/showSwal.js
    const { showDelete, showSuccess } = Swal();

   
    //Lấy level 
    const getUnit=  async (id,index) => {
      // console.log("Get level:", id,index);
      unit.uni_id=units[index].uni_id;
      unit.uni_name=units[index].uni_name;
      unit.uni='Update';
    };
    //Add or update 
    const AddOrUpdateUnit =() => {
      console.log("Add or Update");
      if(unit.uni==''){
        console.log('Add',unit);
        units[units.length]={uni_id:unit.uni_id,uni_name:unit.uni_name};
      }
      else{
        console.log('Update',unit);        
      }
      showSuccess();
      unit.uni_id='';
      unit.uni_name='';
      unit.uni='';
    };
    //Hàm xóa đơn vị
    const DeleteUnit = async (id,index) => {
      console.log("xóa cấp:", id);
      units.splice(index,1);
      showDelete();

    };

    return { 
      units,unit,
      AddOrUpdateUnit,
      getUnit,
      DeleteUnit
      };
  },
};
</script>
<style scoped>
.row{
  flex-wrap: nowrap;
}
@media screen and (max-width:739px) {
  .col-11{
    padding: 0;
    margin: 0;
    text-align: center;
  }
  .col-1{
    margin: 0;
    
  }
}
span{
  cursor: pointer;
}
span:hover{
  opacity: .7;
}
</style>
