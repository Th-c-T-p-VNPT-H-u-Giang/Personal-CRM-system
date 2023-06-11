<template>
  <!-- The Modal -->
  <div class="modal" id="model-add-unit">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Đơn vị</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal2"
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
                >Tên trung tâm(<span style="color: red">*</span>):</label
              >
              <select
                class="pl-2 form-control"
                @change="getCenter"
                v-model="selectValue"
                required
              >
                <option disabled selected hidden value="#"></option>
                <option
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
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Thêm
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "Add",
  props: {
    newData: { type: Object },
  },

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
        valid.value = false;
      }
      console.log(errors);
      return valid;
    };
    const save = async () => {
      if (validate().value) {
        ntx.emit("addorupdate", newData);
      } else {
        console.log("Data not empty");
      }
    };
    const turn_off = () => {
      document.getElementById("model-add-unit").style.display = "none";
      newData.cen_id = "";
      newData.dep_id = "";
      newData.uni_name = "";
      newData.uni_id = "";
      newData.uni = "";
    };
    return { centers, getCenter, departments, getDep, save, turn_off, errors };
  },
};
</script>
