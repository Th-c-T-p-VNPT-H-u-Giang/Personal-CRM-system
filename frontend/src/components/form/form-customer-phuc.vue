div<template>
  <div class="container">
    <!-- {{ item }} -->
    <form class="mt-2" method="post">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="name">Tên (<span style="color: red">*</span>)</label>
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="viewData.customerInfo.name"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="birthdate"
            >Ngày sinh (<span style="color: red">*</span>)</label
          >
          <input
            type="date"
            class="form-control"
            id="birthdate"
            v-model="viewData.customerInfo.birthday"
            required
          />
        </div>
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ (<span style="color: red">*</span>)</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="viewData.customerInfo.address"
          required
        />
      </div>
      <div class="form-group">
        <label for="phone">Sdt (<span style="color: red">*</span>)</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="viewData.customerInfo.phone"
          required
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="email">Email (<span style="color: red">*</span>)</label>
          <input
            type="text"
            class="form-control"
            id="email"
            v-model="viewData.customerInfo.email"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="type"> Loại khách hàng </label>
          <select
            id="type"
            class="form-control"
            v-model="viewData.customerInfo.customerTypesId"
            @click="handleAddCustometType"
          >
            <option value="1" style="">--Chọn--</option>
            <option
              v-for="(value, index) in data.dataSelect"
              :key="index"
              :value="value._id"
            >
              {{ value.name }}
            </option>
            <option value="Add">Thêm</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <input
          type="file"
          class="form-control"
          name="file"
          id="imageUpload"
          accept=".png, .jpg"
          :maxFileSize="1000000"
          ref="fileInput"
          @change="onFileChange"
        />
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="wor_current_workplace">Nơi đang công tác</label>
          <input
            type="text"
            class="form-control"
            id="wor_current_workplace"
            v-model="viewData.customerWork.current_workplace"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="wor_current_position">Chức vụ đang công tác</label>
          <input
            type="text"
            class="form-control"
            id="wor_current_position"
            v-model="viewData.customerWork.current_position"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="wor_work_history">Công ty</label>
          <input
            type="text"
            class="form-control"
            id="wor_work_history"
            v-model="viewData.customerCompany.name"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="wor_work_temp">Nhiệm kỳ</label>
          <input
            type="text"
            class="form-control"
            id="wor_work_temp"
            v-model="viewData.customerWork.work_temp"
            required
          />
        </div>
      </div>

      <div class="form">
        <div class="form-group">
          <label for="wor_work_history">Lịch sử công tác</label>
          <textarea
            name=""
            class="form-control"
            v-model="viewData.customerWork.work_history"
            required
          ></textarea>
        </div>
      </div>

      <button type="submit" @click="handleSubmit" class="btn btn-primary">
        {{ btnName }}
      </button>
    </form>

    <div class="btn btn-primary">
      <select-avanced
        :options="data.items"
        style="width: 300px; height: 100%"
        @searchSelect="
          async (value) => (
            await refresh(),
            (data.items = data.items.filter((value1, index) => {
              console.log(value1, value);
              return value1.name.includes(value) || value.length == 0;
            })),
            console.log('searchSlect', value.length)
          )
        "
        @delete="(value) => console.log('delete', value)"
        @choosed="(value) => console.log('choosed', value)"
      />
    </div>
  </div>
</template>

<script>
import { onBeforeMount, reactive, ref } from "vue";
import { http_getAll, http_create } from "../../assets/js/common.http";
// import {  alert_error } from "../../assets/js/common.alert";
import select_avanced from "./select_advanced.vue";

import CustomerType from "../../services/customerType.service";
import company_kh from "../../services/company.service";
import axios from "axios";
import Swal from "sweetalert2";

import {
  alert_success,
  alert_error,
  alert_warning,
} from "../../assets/js/common.alert";
import { Customer } from "../../views/common/import";
export default {
  components: {
    select_avanced,
  },
  props: {
    title: {
      type: String,
    },
    btnName: {
      type: String,
    },
    item: {
      type: Object,
    },
  },

  setup(props, context) {
    // data to add
    const viewData = reactive({
      customerInfo: {
        avatar: "",
        customerTypesId: 1,
        name: "",
        birthday: "",
        address: "",
        phone: "",
        email: "",
      },
      customerCompany: {
        name: "",
      },
      customerWork: {
        customerId: "",
        current_workplace: "",
        work_history: "",
        current_position: "",
        work_temp: "",
        companyId: "",
      },
    });

    // data of selection
    const data = reactive({
      dataSelect: [],
      items: [],
      customer: [],
    });

    // data of file image

    // method handle add data customer

    // method refresh data
    const reFreshSelect = async () => {
      const rs = await http_getAll(CustomerType);
      data.dataSelect = [...rs.documents];
      console.log(data.dataSelect);
      const customer = await http_getAll(Customer);
      data.customer = [...customer.documents];
    };

    const refresh = async () => {
      const rs = await http_getAll(company_kh);
      data.items = [
        {
          _id: "other",
          name: "other",
        },
        ...rs.documents,
      ];
    };

    // method add customer type
    const handleAddCustometType = async () => {
      if (viewData.customerInfo.customerTypesId === "Add") {
        const { value: customerType } = await Swal.fire({
          title: "Thêm loại khách hàng",
          input: "text",
          inputLabel: "Tên loại khách hàng",
          inputValidator: (value) => {
            if (!value) {
              return "Bạn không được phép để trường này trống!";
            }
          },
        });

        viewData.customerTypeId = 1;

        const res = await http_create(CustomerType, { name: customerType });
        if (res.error) {
          alert_error(`Thêm loại khách hàng`, `${res.msg}`);
        } else {
          reFreshSelect();
          alert_success(
            `Thêm loại khách hàng`,
            `Loại khách hàng ${customerType}  đã được tạo thành công.`
          );
        }
      }
    };

    // test handle process image
    const onFileChange = (event) => {
      viewData.customerInfo.avatar = event.target.files[0];
      console.log(viewData.customerInfo.avatar);
    };

    const handleSubmit = async (event) => {
      let isCheck = false;

      for (const value of data.customer) {
        if (
          value.name == viewData.customerInfo.name &&
          value.phone == viewData.customerInfo.phone &&
          value.email == viewData.customerInfo.email
        ) {
          isCheck = true;
        }
      }
      if (isCheck == true) {
        alert_error('Lổi', `Thong6 tin khách hàng ${viewData.customerInfo.name} đã có`)
      } else {
        event.preventDefault();
        const formData = new FormData();
        formData.append("avatar", viewData.customerInfo.avatar);
        formData.append("name", viewData.customerInfo.name);
        formData.append("birthday", viewData.customerInfo.birthday);
        formData.append("address", viewData.customerInfo.address);
        formData.append("phone", viewData.customerInfo.phone);
        formData.append("email", viewData.customerInfo.email);
        formData.append(
          "customerTypesId",
          viewData.customerInfo.customerTypesId
        );

        axios
          .post("http://localhost:3000/api/customers/", formData)
          .then((customer) => {
            console.log("Image uploaded successfully", customer);
            if (customer.data.error) {
              alert_error("Lỗi", customer.data.msg);
            } else {
              axios
                .post("http://localhost:3000/api/company_KHs/", {
                  name: viewData.customerCompany.name,
                })
                .then((customerCompanyRes) => {
                  console.log(
                    "Created company customer successfully",
                    customerCompanyRes.data
                  );
                  if (customerCompanyRes.data.error) {
                    alert_error("Lỗi", customerCompanyRes.data.msg);
                  } else {
                    const object = {
                      customerId: customer.data.document._id,
                      companyId: customerCompanyRes.data.document._id,
                      current_workplace:
                        viewData.customerWork.current_workplace,
                      work_history: viewData.customerWork.work_history,
                      current_position: viewData.customerWork.current_position,
                      work_temp: viewData.customerWork.work_temp,
                    };
                    axios
                      .post("http://localhost:3000/api/customer_works/", object)
                      .then((res) => {
                        alert_success("Thành công", res.data.msg);
                      })
                      .catch((error) => {
                        console.error("Error create company customer", error);
                        alert_error("Lỗi", error.message);

                        // Handle the error
                      });
                  }
                })
                .catch((error) => {
                  console.error("Error create company customer", error);
                  alert_error("Lỗi", error.message);

                  // Handle the error
                });;
            }
          })
          .catch((error) => {
            console.error("Error uploading image", error);
            alert_error("Lỗi", error.message);
            // Handle the error
          });
      }
    };

    onBeforeMount(() => {
      reFreshSelect();
      refresh();
    });

    return {
      viewData,
      handleAddCustometType,
      data,
      handleSubmit,
      onFileChange,
      refresh,
    };
  },
};
</script>

<style></style>
