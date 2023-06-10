<script>
import { reactive, onMounted } from "vue";
import Select_Advanced from "../../components/form/select_advanced.vue";
import CenterServices from "../../services/center_vnpt.service";
import departmentsServices from "../../services/department.service";
import unitsServices from "../../services/unit.service";
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  components: {
    Select_Advanced,
  },
  setup(props, ctx) {
    const data = reactive({
      stepList: [
        {
          _id: 1,
          name: "Thông tin nhân viên",
        },
        {
          _id: 2,
          name: "Phân công",
        },
      ],
      activeStep: 1,
    });
    const create = () => {
      ctx.emit("create");
    };
    const centers = reactive({
      center: [],
    });
    const departments = reactive({
      department: [],
    });
    const units = reactive({
      unit: [],
    });
    const refresh_add = async () => {
      centers.center = await CenterServices.getAll();
      centers.center.push({ _id: "other", name: "khác" });
      departments.department = await departmentsServices.getAll();
      departments.department.push({ _id: "other", name: "khác" });
      units.unit = await unitsServices.getAll();
      units.unit.push({ _id: "other", name: "khác" });
    };
    onMounted(async () => {
      await refresh_add();
    });
    return {
      create,
      data,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-form-wizard">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Thêm sự kiện mới</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="model-body">
          <div class="d-flex">
            <!-- steps -->
            <div class="d-flex flex-column" style="height: 100%">
              <div
                class="d-flex mt-3 mx-3"
                v-for="(value, index) in data.stepList"
                :key="index"
              >
                <span
                  @click="data.activeStep = index + 1"
                  class="step-id px-3 py-2"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']"
                  >{{ value._id }}</span
                >
                <span
                  class="d-flex align-items-center pl-3"
                  :class="[data.activeStep == index + 1 ? 'active-step' : '']"
                  >{{ value.name }}</span
                >
              </div>
            </div>
            <!-- form -->
            <div
              class="d-flex flex-grow-1 flex-column step-content px-3 my-3"
              style="width: 10000px"
            >
              <!-- page 1 -->
              <form
                v-if="data.activeStep == 1"
                action=""
                class="was-validated"
                style="width: 100%"
              >
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
              </form>
              <!-- page 2 -->
              <form
                v-if="data.activeStep == 2"
                action=""
                class="was-validated"
                style="width: 100%"
              >
                <div class="form-group">
                  <label for=""
                    >Chức vụ(<span style="color: red">*</span>):</label
                  >
                  <select
                    class="form-control"
                    required
                    v-model="item.postionId"
                  >
                    <!-- <option value="" disabled selected hidden>Chức vụ</option> -->
                    <option
                      v-for="positions in positions"
                      :key="positions"
                      :value="positions._id"
                    >
                      {{ positions.name }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for=""
                    >Trung tâm(<span style="color: red">*</span>):</label
                  >
                  <div class="form-group w-100">
                    <Select_Advanced
                      class="form-control"
                      required
                      :options="centers.center"
                      :modelValue="data.modelValue"
                      style="width: 100%; height: 100%"
                      @searchSelect="
                        async (value) => (
                          await refresh_add(),
                          (centers.center = centers.center.filter(
                            (value1, index) => {
                              console.log(value1, value);
                              return (
                                value1.name.includes(value) || value.length == 0
                              );
                            }
                          )),
                          console.log('searchSlect', value.length)
                        )
                      "
                      @delete="(value) => onDeleteCenter(value)"
                      @choosed="(value) => (selectedOptionCenter = value)"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for=""
                    >Phòng(<span style="color: red">*</span>):</label
                  >
                  <Select_Advanced
                    class="form-control"
                    required
                    :options="departments.department"
                    :modelValue="data.modelDep"
                    style="width: 100%; height: 100%"
                    @searchSelect="
                      async (value) => (
                        await refresh_add(),
                        (departments.department = departments.department.filter(
                          (value1, index) => {
                            console.log(value1, value);
                            return (
                              value1.name.includes(value) || value.length == 0
                            );
                          }
                        )),
                        console.log('searchSlect', value.length)
                      )
                    "
                    @delete="(value) => onDeleteDep(value)"
                    @choosed="(value) => (selectedOptionDepartment = value)"
                  />
                </div>
                <div class="form-group w-100">
                  <label for="">Tổ(<span style="color: red">*</span>):</label>
                  <Select_Advanced
                    class="form-control"
                    :options="units.unit"
                    :modelValue="data.modelUnit"
                    style="width: 100%; height: 100%"
                    @searchSelect="
                      async (value) => (
                        await refresh_add(),
                        (units.unit = units.unit.filter((value1, index) => {
                          console.log(value1, value);
                          return (
                            value1.name.includes(value) || value.length == 0
                          );
                        })),
                        console.log('searchSlect', value.length)
                      )
                    "
                    @delete="(value) => onDeleteUnit(value)"
                    @choosed="(value) => (selectedOptionUnit = value)"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary px-3 py-2"
                  style="font-size: 14px"
                  @click="$emit('create')"
                  id="add"
                >
                  <span>Thêm</span>
                </button>
              </form>
              <div class="d-flex justify-content-end mt-3">
                <span
                  v-if="
                    data.activeStep >= 1 &&
                    data.activeStep < data.stepList.length
                  "
                  class="btn-next d-flex align-items-center px-3 py-1"
                  @click="data.activeStep = 2"
                  >Next
                  <span
                    class="material-symbols-outlined d-flex align-items-center"
                  >
                    navigate_next
                  </span>
                </span>
                <span
                  v-if="
                    data.activeStep > 1 &&
                    data.activeStep <= data.stepList.length
                  "
                  class="btn-prev d-flex align-items-center px-3 py-1"
                  @click="data.activeStep = 1"
                  ><span
                    class="material-symbols-outlined d-flex align-items-center"
                  >
                    navigate_before </span
                  >Previous</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-id {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}
.step-content {
  border-left: 1px solid var(--gray);
}
input {
  width: 100%;
}
.active-step {
  color: blue;
}
.btn-next {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-next:hover {
  background-color: green;
  color: white;
}

.btn-prev {
  border: 1px solid var(--gray);
  border-radius: 5px;
  cursor: pointer;
}

.btn-prev:hover {
  background-color: red;
  color: white;
}
</style>
