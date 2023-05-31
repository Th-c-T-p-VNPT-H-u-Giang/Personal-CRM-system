<template>
  <!-- The Modal -->
  <div class="modal" id="model-add-dep">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Phòng</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal1"
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
                >Tên phòng(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="newData.dep_name"
                required
              />
              <div style="color: red">
                {{ errors.dep_name }}
              </div>
            </div>
            <button
              v-if="newData.dep_id != ''"
              type="submit"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
            >
              Sửa
            </button>
            <button
              v-if="newData.dep_id == ''"
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
    const errors = reactive({
      dep_name: "",
    });
    const getCenter = (event) => {
      console.log("change:", event.target.value);
      newData.cen_id = event.target.value;
      console.log("cenid:", newData.cen_id);
    };
    const validate = () => {
      let valid = ref(true);
      errors.dep_name = "";

      if (newData.dep_name.trim() == "") {
        errors.dep_name = "Tên phòng không được bỏ trống";
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
      document.getElementById("model-add-dep").style.display = "none";
      newData.cen_id = "";
      newData.dep_name = "";
      newData.dep_id = "";
      newData.dep = "";
    };
    return { centers, getCenter, save, turn_off, errors };
  },
};
</script>
