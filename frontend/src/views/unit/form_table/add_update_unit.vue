<<<<<<< HEAD
<template>
  <!-- The Modal -->
  <div class="modal" id="model-add-unit">
=======
<script></script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-add">
>>>>>>> master
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
<<<<<<< HEAD
          <h4 class="modal-title" style="font-size: 15px">Đơn vị</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal2"
=======
          <h4 class="modal-title" style="font-size: 15px">Level</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
>>>>>>> master
            @click="turn_off"
          >
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form @submit.prevent="save" class="was-validated">
            <div class="form-group">
              <label for="name"
<<<<<<< HEAD
                >Tên trung tâm(<span style="color: red">*</span>):</label
              >
              <select
                class="pl-2 form-control"
                @change="getCenter"
=======
                >Tên cấp(<span style="color: red">*</span>):</label
              >
              <select
                class="pl-2 form-control"
                @change="getLevel"
>>>>>>> master
                v-model="selectValue"
                required
              >
                <option disabled selected hidden value="#"></option>
                <option
<<<<<<< HEAD
                  :value="`${value.cen_id}`"
                  :key="index"
                  v-for="(value, index) in centers"
                >
                  {{ value.cen_name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="name"
                >Tên trung tâm(<span style="color: red">*</span>):</label
              >
              <select
                class="pl-2 form-control"
                @change="getDep"
                v-model="selectValue"
                required
              >
                <option disabled selected hidden value="#"></option>
                <option
                  :value="`${value.dep_id}`"
                  :key="index"
                  v-for="(value, index) in departments"
                >
                  {{ value.dep_name }}
                </option>
              </select>
            </div>

=======
                  :value="`${value.lev_id}`"
                  :key="index"
                  v-for="(value, index) in levels"
                >
                  {{ value.lev_name }}
                </option>
              </select>
            </div>
>>>>>>> master
            <div class="form-group">
              <label for="name"
                >Tên đơn vị(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="newData.uni_name"
                required
              />
              <div style="color: red">
                {{ errors.uni_name }}
              </div>
            </div>
            <button
<<<<<<< HEAD
              v-if="newData.uni_id != ''"
              type="submit"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
            >
              Sửa
            </button>
            <button
              v-if="newData.uni_id == ''"
              type="submit"
=======
              type="submit"
              v-if="newData.uni_id == ''"
>>>>>>> master
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Thêm
            </button>
<<<<<<< HEAD
=======
            <button
              type="submit"
              v-if="newData.uni_id != ''"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Sửa
            </button>
>>>>>>> master
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD
import { reactive, ref } from "vue";
=======
import { ref, reactive } from "vue";
>>>>>>> master
export default {
  name: "Add",
  props: {
    newData: { type: Object },
  },
<<<<<<< HEAD

  setup({ newData }, ntx) {
    const centers = reactive([{ cen_id: 1, cen_name: "VNPT Hậu giang" }]);
    const departments = reactive([
      { dep_id: 1, dep_name: "Phòng chăm sóc khách hàng" },
      { dep_id: 2, dep_name: "Phòng tài chính" },
    ]);
    const errors = reactive({
      uni_name: "",
    });
    const getCenter = (event) => {
      console.log("change:", event.target.value);
      newData.cen_id = event.target.value;
      console.log("cenid:", newData.cen_id);
    };
    const getDep = (event) => {
      console.log("change:", event.target.value);
      newData.dep_id = event.target.value;
      console.log("depid:", newData.dep_id);
    };
    const validate = () => {
      let valid = ref(true);
      errors.uni_name = "";

      if (newData.uni_name.trim() == "") {
        errors.uni_name = "Tên đơn vị không được bỏ trống";
=======
  setup({ newData }, ntx) {
    const levels = reactive([
      { lev_id: 1, lev_name: "Tổng công ty VNPT " },
      { lev_id: 2, lev_name: "Phòng" },
    ]);
    const selectValue = ref("");
    const errors = reactive({
      lev_id: "",
      uni_name: "",
    });
    const getLevel = (event) => {
      console.log(event.target.value);
      newData.lev_id = event.target.value;
    };
    const validate = () => {
      let valid = ref(true);
      errors.lev_id = "";
      errors.uni_name = "";
      if (newData.lev_id.trim() == "") {
        errors.lev_id = "Level is not empty";
        valid.value = false;
      }
      if (newData.uni_name.trim() == "") {
        errors.uni_name = "Name is not empty";
>>>>>>> master
        valid.value = false;
      }
      console.log(errors);
      return valid;
    };
    const save = async () => {
      if (validate().value) {
<<<<<<< HEAD
        ntx.emit("addorupdate", newData);
=======
        console.log("save:", newData);
        ntx.emit("addorupdate", newData);
        selectValue.value = "";
>>>>>>> master
      } else {
        console.log("Data not empty");
      }
    };
    const turn_off = () => {
<<<<<<< HEAD
      document.getElementById("model-add-unit").style.display = "none";
      newData.cen_id = "";
      newData.dep_id = "";
      newData.uni_name = "";
      newData.uni_id = "";
      newData.uni = "";
    };
    return { centers, getCenter, departments, getDep, save, turn_off, errors };
=======
      document.getElementById("model-add").style.display = "none";
    };
    return { save, levels, getLevel, turn_off, selectValue, errors };
>>>>>>> master
  },
};
</script>
