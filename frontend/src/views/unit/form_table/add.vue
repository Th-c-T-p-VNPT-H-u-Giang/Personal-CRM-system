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
  },
  setup(props, ctx) {
    const data = reactive({});
    // const create = () => {
    //   if (props.item.name.length > 0 && props.item.content.length > 0) {
    //     ctx.emit("create");
    //   }
    //   console.log(
    //     selectedOptionCenter,
    //     selectedOptionDepartment,
    //     selectedOptionUnit
    //   );
    // };
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
    const selectedOptionCenter = ref("Trung tâm");
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
          Swal.fire(`Tên trung tâm mới là ${CenterName}`);
          await centerServices.create({ name: CenterName });
          await refresh("center");
          ctx.emit("newCenter", centers.center);
        }
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
      <select id="my-select" class="swal2-input  mx-2" >
        <option value="">Trung tâm</option>
        ${centers.center
          .map(
            (option) => `<option value="${option._id}">${option.name}</option>`
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
            console.log("Selected Option:", formValues.selectedOption);
            console.log("Input Value:", formValues.inputValue);
            await departmentsServices.create({
              centerVNPTHGId: formValues.selectedOption,
              name: formValues.inputValue,
            });
            await refresh("department");
            ctx.emit("newDep", departments.department);
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
            (option) => `<option value="${option._id}" >${option.name}</option>`
          )
          .join("")}
      </select>
      <select id="my-select-dep" class="swal2-input  mx-2" style="width:92%" >
        <option value="">Phòng</option>
        
      </select>
      </select>
      <input id="my-input" class="swal2-input form-control  m-3" style="width:92%" type="text" placeholder="Tên phòng">
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
            didOpen: () => {
              const center = document.getElementById("my-select-center");
              const dep = document.getElementById("my-select-dep");

              center.addEventListener("change", async () => {
                const Id = center.value;
                departments.department =
                  (await departmentsServices.findAllDepOfACenter(Id)) || [];

                dep.innerHTML = `
          <option value="">Select a product</option>
          ${departments.department
            .map(
              (option) =>
                `<option value="${option._id}">${option.name}</option>`
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
            await unitsServices.create({
              departmentId: formValues.selectedOptionDep,
              name: formValues.inputValue,
            });
            await refresh("unit");
            ctx.emit("newUnit", units.unit);
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

<template></template>

<style scoped></style>
