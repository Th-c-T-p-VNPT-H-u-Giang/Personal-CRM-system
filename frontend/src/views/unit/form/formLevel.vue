<template>
    <form @submit.prevent="save">
        <div class="form-group isvalid">
          <label for="lev_id">ID</label>
          <input type="text" 
          class="form-control"
          id = "lev_id" aria-describedby = "lev_id"
          placeholder="ID level"
          v-model="level.lev_id"
        >
        <p v-if="errors.lev_id" class="isvalidfeedback" >{{errors.lev_id}}</p>
        </div>
        <div class="form-group">
            <label for="lev_name">Name</label>
            <input type="text" 
            class="form-control"
            id="lev_name" aria-describedby="lev_name"
            placeholder="Name level"
            v-model="level.lev_name"
            >
            <p v-if="errors.lev_name" class="isvalidfeedback" >{{errors.lev_name}}</p>
          </div>
       
        <button type="submit" class="btn btn-primary"  >Submit</button>
    </form>
</template>
<script>
import {reactive} from 'vue';
export default{
    name:"form",
    props:{level:{type:Object}},
    setup({level},{emit}){
        const errors=reactive({lev_id:'',lev_name:''});
        
        const validdate=()=>{
            errors.lev_id='';
            errors.lev_name='';
            
            var valid=true;
            if(!level.lev_id){
                errors.lev_id='ID is not empty';
                valid=false;
            }
            if(!level.lev_name){
                errors.lev_name='Name is not empty';
                valid=false;
            }
            return valid;
        }
        const save=()=>{
            if(validdate()){
                emit ("AddOrUpdate", level);
                return;
            }}
        return {errors,save};
    }
}
</script>
<style>
.isvalid{
    border-color:#cc0000 !important;
}
.isvalidfeedback{
    color:#cc0000 !important;
}
</style>