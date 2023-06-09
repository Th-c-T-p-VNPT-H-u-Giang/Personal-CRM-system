<script>
import { reactive, ref, watch, onMounted } from "vue";
import Select from "../../components/form/select.vue";
// ******
import SelectOption from "../../components/box_lananh/select_cdu.vue";
import CenterServices from "../../services/center.services";
import departmentsServices from "../../services/dep.services";
import unitsServices from "../../services/unit.services";
import Swal from "sweetalert2";

import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
} from "../../assets/js/common.alert";
import centerServices from "../../services/center.services";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
} from "../../assets/js/common.http";
export default {
  components: {
    Select,
    // ***
    SelectOption,
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    // VAnh
    positions: {
      type: Object,
      default: {},
    },
    units: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const create = () => {
      if (props.item.name.length > 0 && props.item.content.length > 0) {
        ctx.emit("create");
      }
    };
    // ****REFRESH
    const refresh = async (name) => {
      switch (name) {
        case "center": {
          centers.center = await http_getAll(CenterServices);
          break;
        }
        case "department": {
          departments.department = await http_getAll(departmentsServices);
          break;
        }
        case "unit": {
          units.unit = await http_getAll(unitsServices);
          break;
        }
      }
    };
    //CENTERS
    const centers = reactive({ center: [] });
    const selectedOptionCenter = ref("");
    watch(selectedOptionCenter, async (newValue, oldValue) => {
      departments.department = await departmentsServices.findAllDepOfACenter(
        newValue
      );
      units.unit = [];
      for (let val of departments.department) {
        var newData = await unitsServices.findAllUnitsOfADep(val._id);
        for (let value of newData) {
          units.unit.push(value);
        }
      }
      // Alert add center
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: CenterName } = await Swal.fire({
            title: "Thêm mới trung tâm",
            input: "text",
            inputLabel: "Tên trung tâm",
            inputValue: "",
            showCancelButton: true,
            inputValidator: (value) => {
              if (!value) {
                return "Tên trung tâm không được bỏ trống";
              }
            },
          });

          if (CenterName) {
            const document = await centerServices.create({ name: CenterName });
            if (document.error) {
              // Swal.fire({
              //   icon: "warning",
              //   title: `Đã tồn tại trung tâm `,
              //   text: `${CenterName}`,
              //   background: "#fff",
              //   confirmButtonText: "OK",
              // }).then((result) => {
              //   if (result.isConfirmed) {
              //     setTimeout(showSweetAlert, 300);
              //   }
              // });

              alert_warning(`Đã tồn tại trung tâm `, `${CenterName}`);
              return false;
            }
            alert_success(`Đã thêm trung tâm`, `${CenterName}`);
            await refresh("center");
            ctx.emit("newCenter", centers.center);
            selectedOptionCenter.value = document.document._id;
          }
          return true;
        };
        showSweetAlert();
      }
    });

    //DEPARTMENTS
    const departments = reactive({ department: [] });
    const selectedOptionDepartment = ref("Phòng");
    watch(selectedOptionDepartment, async (newValue, oldValue) => {
      units.unit = await unitsServices.findAllUnitsOfADep(newValue);
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm phòng mới",
            html: `
      <select id="my-select" class="swal2-input  mx-2" style="width:92%"  >
        <option value="">Trung tâm</option>
        ${centers.center
          .map(
            (option) =>
              `<option value="${option._id}" ${
                option._id == selectedOptionCenter.value ? "selected" : ""
              }
               > ${option.name}</option>`
          )
          .join("")}
      </select>

      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên phòng">
    `,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
              const selectedOption = document.getElementById("my-select").value;
              const inputValue = document.getElementById("my-input").value;
              if (!selectedOption || !inputValue) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOption,
                inputValue,
              };
            },
          });

          if (formValues) {
            // Xử lý giá trị selectedOption và giá trị inputValue
            // console.log("Selected Option:", formValues.selectedOption);
            // console.log("Input Value:", formValues.inputValue);
            const document = await departmentsServices.create({
              centerVNPTHGId: formValues.selectedOption,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại phòng `, `${formValues.inputValue}`);
            }
            alert_success(`Đã thêm phòng`, `${formValues.inputValue}`);
            await refresh("department");
            ctx.emit("newDep", departments.department);
            selectedOptionDepartment.value = document.document._id;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert

        showSweetAlert();
      }
    });

    //UNITS
    const units = reactive({
      unit: [],
    });
    const selectedOptionUnit = ref("Đơn vị");
    watch(selectedOptionUnit, (newValue, oldValue) => {
      console.log("New Unit:", newValue);
      if (newValue == "other") {
        const showSweetAlert = async () => {
          const { value: formValues } = await Swal.fire({
            title: "Thêm phòng mới",
            html: `
      <select id="my-select-center" class="swal2-input  mx-2" style="width:92%">
        <option value="">Trung tâm</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}"
            ${option._id == selectedOptionCenter.value ? "selected" : ""} 
            >${option.name}</option>`
          )
          .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input  mx-2" style="width:92%" >
        <option value="">Phòng</option>
        
      </select>
      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên tổ">
    `,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
              const selectedOptionCenter =
                document.getElementById("my-select-center").value;
              const selectedOptionDep =
                document.getElementById("my-select-dep").value;

              const inputValue = document.getElementById("my-input").value;
              if (!selectedOptionCenter || !inputValue || !selectedOptionDep) {
                Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin");
              }

              return {
                selectedOptionCenter,
                selectedOptionDep,
                inputValue,
              };
            },
            didOpen: async () => {
              const center = document.getElementById("my-select-center");
              const dep = document.getElementById("my-select-dep");

              const Id = center.value;
              departments.department =
                (await departmentsServices.findAllDepOfACenter(Id)) || [];

              dep.innerHTML = `
          <option value="">Phòng</option>
          ${departments.department
            .map(
              (option) =>
                `<option value="${option._id}"
                ${
                  option._id == selectedOptionDepartment.value ? "selected" : ""
                } 

                >${option.name}</option>`
            )
            .join("")}
        `;
              center.addEventListener("change", async () => {
                const Id = center.value;
                departments.department =
                  (await departmentsServices.findAllDepOfACenter(Id)) || [];

                dep.innerHTML = `
          <option value="">Select a product</option>
          ${departments.department
            .map(
              (option) =>
                `<option value="${option._id}"
                
                >${option.name}</option>`
            )
            .join("")}
        `;
              });
            },
          });

          if (formValues) {
            // Xử lý giá trị selectedOption và giá trị inputValue
            console.log(
              "Selected Option Center:",
              formValues.selectedOptionCenter
            );
            console.log("Selected Option dep:", formValues.selectedOptionDep);

            console.log("Input Value:", formValues.inputValue);
            const document = await unitsServices.create({
              departmentId: formValues.selectedOptionDep,
              name: formValues.inputValue,
            });
            if (document.error) {
              alert_warning(`Đã tồn tại  `, `${formValues.inputValue}`);
              return;
            }
            alert_success(`Đã thêm `, `${formValues.inputValue}`);

            await refresh("unit");
            ctx.emit("newUnit", units.unit);
            selectedOptionUnit.value = document.document._id;
          }
        };

        // Gọi hàm showSweetAlert khi bạn muốn hiển thị SweetAlert
        showSweetAlert();
      }
    });

    onMounted(async () => {
      centers.center = await CenterServices.getAll();
      departments.department = await departmentsServices.getAll();
      units.unit = await unitsServices.getAll();
    });

    return {
      create,
      // ***
      centers,
      selectedOptionCenter,
      departments,
      selectedOptionDepartment,
      units,
      selectedOptionUnit,
    };
  },
};
</script>

<template>
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
              <label for="">Chức vụ(<span style="color: red">*</span>):</label>
              <select class="form-control" required v-model="item.postionId">
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
              <label for="center"
                >Trung tâm(<span style="color: red">*</span>):</label
              >
              <!-- {{ newCenter }} -->
              <SelectOption
                :selectedOption="selectedOptionCenter"
                :field="centers.center"
                :add="{ nameCDU: 'center' }"
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
            <div class="form-group">
              <label for="department"
                >Đơn vị(<span style="color: red">*</span>):</label
              >
              <SelectOption
                :selectedOption="selectedOptionUnit"
                :field="units.unit"
                :add="{ nameCDU: 'unit' }"
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
              @click="create"
              id="add"
              data-dismiss="modal"
            >
              <span>Thêm</span>
            </b-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
