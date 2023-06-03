<script>
import { reactive, ref, watch, onMounted } from "vue";
import Select from "../../components/form/select.vue";
//***
import SelectOption from "../../components/box_lananh/select_cdu.vue";
import Center from "../unit/center.vue";
import centerServices from "../../services/center.services";
import depServices from "../../services/dep.services";
import unitServices from "../../services/unit.services";
export default {
  components: {
    Select,
    // ***
    SelectOption,
    Center,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({});
    //***
    const centers = reactive({ center: [] });
    const selectedOptionCenter = ref("Trung tâm");
    watch(selectedOptionCenter, async (newValue, oldValue) => {
      console.log("New Center:", newValue);
      departments.department = await depServices.findAllDepOfACenter(newValue);
      units.unit = [];
      for (let val of departments.department) {
        let newUnits = await unitServices.findAllUnitsOfADep(val._id);
        for (let value of newUnits) {
          units.unit.push(value);
        }
      }
      if (newValue == "other") {
        console.log("Show model-center");
        document.getElementById("model-center").style.display = "block";
        // document.getElementById("model-add").style.display = "none";
      }
    });

    const departments = reactive({
      department: [],
    });
    const selectedOptionDepartment = ref("Phòng");
    watch(selectedOptionDepartment, (newValue, oldValue) => {
      console.log("New Department:", newValue);
    });

    const units = reactive({ unit: [] });
    const selectedOptionUnit = ref("Đơn vị");
    watch(selectedOptionUnit, (newValue, oldValue) => {
      console.log("New Unit:", newValue);
    });

    const clickAdd = () => {
      if (props.item.name.length > 0 && props.item.content.length > 0) {
        ctx.emit("create");
      }
    };
    const createCenter = (value) => {
      console.log("createCenter:");
      centers.center = value;
      ctx.emit("newCenter", centers.center);
    };
    onMounted(async () => {
      centers.center = await centerServices.findAll();
      departments.department = await depServices.findAll();
    });
    return {
      // create,
      clickAdd,
      //***
      centers,
      selectedOptionCenter,
      departments,
      selectedOptionDepartment,
      units,
      selectedOptionUnit,
      createCenter,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <!-- The Modal -->
  <div class="modal" id="model-add">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">
            Thêm thông tin nhân viên mới
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form action="/action_page.php" class="was-validated">
            <div class="form-group">
              <label for="name"
                >Họ và tên(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="item.name"
                required
              />
            </div>
            <div class="form-group">
              <label for="birthday"
                >Ngày sinh(<span style="color: red">*</span>):</label
              >
              <input
                type="date"
                class="form-control"
                id="birthday"
                name="birthday"
                v-model="item.birthday"
                required
              />
            </div>
            <div class="form-group">
              <label for="address"
                >Địa chỉ(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="address"
                name="address"
                v-model="item.address"
                required
              />
            </div>
            <div class="form-group">
              <label for="phone"
                >Số điện thoại(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="phone"
                name="phone"
                v-model="item.phone"
                required
              />
            </div>
            <div class="form-group">
              <label for="email"
                >Email(<span style="color: red">*</span>):</label
              >
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                v-model="item.email"
                required
              />
            </div>
            <div class="form-group">
              <label for="center"
                >Trung tâm(<span style="color: red">*</span>):</label
              >
              <SelectOption
                :title="`Trung tâm`"
                :selectedOption="selectedOptionCenter"
                :field="centers.center"
                :add="true"
                @option="
                  (value) => {
                    selectedOptionCenter = value;
                  }
                "
              />
            </div>
            <div class="form-group">
              <label for="department"
                >Phòng(<span style="color: red">*</span>):</label
              >
              <SelectOption
                :title="`Phòng`"
                :selectedOption="selectedOptionDepartment"
                :field="departments.department"
                @option="
                  (value) => {
                    selectedOptionDepartment = value;
                  }
                "
              />
            </div>
            <div class="form-group">
              <label for="department"
                >Đơn vị(<span style="color: red">*</span>):</label
              >
              <SelectOption
                :title="`Đơn vị`"
                :selectedOption="selectedOptionUnit"
                :field="units.unit"
                @option="
                  (value) => {
                    selectedOptionUnit = value;
                  }
                "
              />
            </div>
            <b-button
              type="submit"
              class="btn btn-primary px-3 py-2"
              style="font-size: 14px"
              @click="clickAdd"
              id="add"
              data-dismiss="modal"
            >
              <span>Thêm</span>
            </b-button>
          </form>
          <Center @newData="createCenter"></Center>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
