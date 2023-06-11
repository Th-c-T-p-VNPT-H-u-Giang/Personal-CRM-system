<script>
import { reactive, ref, watch, onMounted } from "vue";
import Select from "../../components/form/select.vue";
//***
import SelectOption from "../../components/box_lananh/select_cdu.vue";
import Center from "../unit/center.vue";
import centerServices from "../../services/center_vnpt.service";
import depServices from "../../services/department.service";
import unitServices from "../../services/unit.service";
import Department from "../../views/unit/department.vue";
export default {
  components: {
    Select,
    // ***
    SelectOption,
    Center,
    Department,
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
      // console.log("New Center:", newValue);
      let documents = await depServices.findAllDepOfACenter(newValue);
      departments.department = documents.document;

      units.unit = [];
      for (let val of departments.department) {
        var newUnits = await unitServices.findAllUnitsOfADep(val._id);
        for (let value of newUnits.document) {
          units.unit.push(value);
        }
      }
      if (newValue == "other") {
        // console.log("Show model-center");
        document.getElementById("model-center").style.display = "block";
        // document.getElementById("model-add").style.display = "none";
      }
    });
    // Dep
    const departments = reactive({
      department: [],
    });
    const selectedOptionDepartment = ref("Phòng");
    watch(selectedOptionDepartment, async (newValue, oldValue) => {
      // console.log("New Department:", newValue);
      let documents = await unitServices.findAllUnitsOfADep(newValue);
      units.unit = documents.document;

      if (newValue == "other") {
        document.getElementById("model-department").style.display = "block";
        // document.getElementById("model-add").style.display = "none";
      }
    });
    // Units
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
    const createDep = (value) => {
      console.log("createDep:");
      departments.department = value;
      ctx.emit("newDep", departments.department);
    };
    const searchCenter = async (value) => {
      console.log(value);
      centers.center = await CenterServices.getAll();
      centers.center = centers.center.filter((value1, index) => {
        console.log(value1, value);
        return value1.name.includes(value) || value.length == 0;
      });
      console.log("searchSlect", centers.center);
    };
    onMounted(async () => {
      let documents = await centerServices.findAll();
      centers.center = documents.document;
      let documents_dep = await depServices.findAll();
      departments.department = documents_dep.document;
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
      Department,
      createDep,
      searchCenter,
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
                :add="{ nameCDU: 'center' }"
                @option="
                  (value) => {
                    selectedOptionCenter = value;
                  }
                "
                @searchSelect="
                  (value) => {
                    searchCenter(value);
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
                :add="{ nameCDU: 'dep' }"
                @option="
                  (value) => {
                    selectedOptionDepartment = value;
                  }
                "
              />
            </div>
            <!-- Units -->
            <div class="form-group">
              <label for="department"
                >Đơn vị(<span style="color: red">*</span>):</label
              >
              <SelectOption
                :title="`Đơn vị`"
                :selectedOption="selectedOptionUnit"
                :field="units.unit"
                :add="true"
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
          <Department
            :selectedOptionCenter="selectedOptionCenter"
            :center="centers.center"
            @newData="createDep"
          ></Department>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
