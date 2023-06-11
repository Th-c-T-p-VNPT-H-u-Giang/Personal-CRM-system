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
              <!-- -->
              <select
                class="pl-2 form-control"
                @change="getCenter"
                v-model="selectedOption"
                required
              >
                <option
                  disabled
                  :selected="newData.Center_VNPTHG"
                  hidden
                  v-if="newData.Center_VNPTHG"
                  value=""
                >
                  {{ newData.Center_VNPTHG }}
                </option>
                <option
                  :value="`${value._id}`"
                  :key="index"
                  v-for="(value, index) in centers.center"
                >
                  {{ value.name }}
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
                v-model="newData.name"
                required
              />
              <div style="color: red">
                {{ errors.dep_name }}
              </div>
            </div>
            <button
              v-if="newData._id != ''"
              type="submit"
              class="btn btn-warning px-3 py-2"
              style="font-size: 14px"
            >
              Sửa
            </button>
            <button
              v-if="newData._id == ''"
              type="submit"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
            >
              Thêm
            </button>
            {{ center }}
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import centerServices from "../../../services/center_vnpt.service";
export default {
  name: "Add",
  props: {
    newData: { type: Object },
    center: { type: Array, default: [] },
  },

  setup({ newData, center }, ntx) {
    const centers = reactive({ center: [] });
    centers.center = center;
    const errors = reactive({
      dep_name: "",
      centerVNPTHGId: "",
    });
    const getCenter = (event) => {
      console.log("change:", event.target.value);
      newData.centerVNPTHGId = event.target.value;
      console.log("cenid:", newData.centerVNPTHGId);
    };
    const selectedOption = ref("");

    const validate = () => {
      let valid = ref(true);
      errors.dep_name = "";
      if (selectedOption.value == "#") {
        errors.centerVNPTHGId = "Tên trung tâm không được bỏ trống";
        valid.value = false;
      }
      if (newData.name.trim() == "") {
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
      newData.centerVNPTHGId = "";
      newData.name = "";
      newData._id = "";
      newData.dep = "";
      newData.centerVNPTHGId = "";
      newData.Center_VNPTHG = "";
      selectedOption.value = "";
      // name.value = "";
    };
    onMounted(async () => {
      let documents = await centerServices.getAll();
      centers.center = documents.document;
      // console.log("app_update_dep.vue");
    });
    return {
      centers,
      getCenter,
      selectedOption,
      save,
      turn_off,
      errors,
    };
  },
};
</script>
