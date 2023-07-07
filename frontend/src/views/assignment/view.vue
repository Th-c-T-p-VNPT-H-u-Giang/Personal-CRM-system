<script>
import { ref } from "vue";
import Table from "../../components/table/table-appointment.vue";
import EditAppointment from "../../views/appointment/edit.vue";
import { formatDate } from "../common/import";
export default {
  components: {
    Table,
    EditAppointment,
  },
  props: {
    viewValue: {
      type: Object,
      default: {},
    },
  },
  setup(props, context) {
    const isActive = ref(false);

    const handleActiveCus = () => {
      isActive.value = !isActive.value;
    };
    const isActiveAssign = ref(true);
    const handleActiveAssign = () => {
      isActiveAssign.value = !isActiveAssign.value;
    };
    const isActiveEmploy = ref(false);
    const handleActiveEmploy = () => {
      isActiveEmploy.value = !isActiveEmploy.value;
    };
    const isActiveAppoint = ref(false);
    const handleActiveAppoint = () => {
      isActiveAppoint.value = !isActiveAppoint.value;
    };
    return {
      isActive,
      handleActiveCus,
      isActiveAssign,
      handleActiveAssign,
      isActiveEmploy,
      handleActiveEmploy,
      isActiveAppoint,
      handleActiveAppoint,
    };
  },
};
</script>

<template>
  <div class="modal" id="model-view">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 18px">
            Thông tin chi tiết phân công
          </h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#personal-info"
              style="margin-bottom: 0"
              @click="handleActiveAssign"
            >
              Thông tin phân công
            </button>
            <div
              v-if="isActiveAssign"
              id="personal-info"
              class="my-3 border-all"
            >
              <div
                class="d-flex justify-content-around row mx-2"
                style="margin-top: 12px"
              >
                <div class="col-6">
                  <p>
                    <span class="font-weight-bold">Khách hàng: </span>
                    {{ viewValue.Customer.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày bắt đầu: </span>
                    {{ viewValue.start_date }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày kết thúc: </span>
                    {{ viewValue.end_date }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Chu kỳ chăm sóc: </span>
                    {{ viewValue.Cycle.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Đánh giá: </span>
                    {{ viewValue.Evaluate.star }}
                  </p>
                </div>
                <div class="col-6">
                  <p>
                    <span class="font-weight-bold">Trạng thái: </span>
                    {{ viewValue.Status_Task.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Nội dung chăm sóc: </span>
                    {{ viewValue.content }}
                  </p>

                  <p>
                    <span class="font-weight-bold">Lưu ý: </span>
                    {{ viewValue.note }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Nhận xét: </span>
                    {{ viewValue.Comment.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#customer-work"
              @click="handleActiveCus"
              style="margin-bottom: 0"
            >
              Thông tin khách hàng
            </button>
            <div
              v-if="isActive"
              id="customer-work"
              class="collapse border-all my-3"
            >
              <img
                :src="viewValue.Customer.avatar"
                alt=""
                class="rounded-circle mx-auto d-block border border-dark my-3"
                height="100"
              />
              <div class="container">
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <p class="mb-0">
                        <span class="font-weight-bold">Họ tên: </span
                        >{{ viewValue.Customer.name }}
                      </p>
                      <p class="mb-0">
                        <span class="font-weight-bold">Ngày sinh: </span
                        >{{ viewValue.Customer.birthday }}
                      </p>
                      <p class="mb-0">
                        <span class="font-weight-bold">Loại khách hàng: </span
                        >{{ viewValue.Customer.Customer_Type.name }}
                      </p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <p class="mb-0">
                        <span class="font-weight-bold">Địa chỉ: </span
                        >{{ viewValue.Customer.address }}
                      </p>
                      <p class="mb-0">
                        <span class="font-weight-bold">SĐT: </span
                        >{{ viewValue.Customer.phone }}
                      </p>
                      <p class="mb-0">
                        <span class="font-weight-bold">Email: </span
                        >{{ viewValue.Customer.email }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <button
              style="margin-bottom: 0px"
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#assignment"
              @click="handleActiveEmploy"
            >
              Danh sách nhân viên phụ trách
            </button>
            <div v-if="isActiveEmploy" id="assignment" class="collapse my-3">
              <div class="table-responsive">
                <table class="my-table mb-2 table border-table-all">
                  <thead style="max-width: 100px; overflow: auto">
                    <tr>
                      <th>Stt</th>
                      <th>Họ tên</th>
                      <th>SĐT</th>
                      <th>Email</th>
                      <th>Chức vụ</th>
                      <th>Tổ</th>
                      <th>Phòng</th>
                      <th>Trung tâm</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in viewValue.Employees"
                      :key="index"
                    >
                      <td class="size-16">{{ Math.ceil(index) + 1 }}</td>
                      <td class="size-16">{{ item.name }}</td>
                      <td class="size-16">{{ item.phone }}</td>
                      <td class="size-16">{{ item.email }}</td>
                      <td class="size-16">{{ item.Position.name }}</td>
                      <td class="size-16">{{ item.Unit.name }}</td>
                      <td class="size-16">{{ item.Unit.Department.name }}</td>
                      <td class="size-16">
                        {{ item.Unit.Department.Center.name }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p
                  v-if="viewValue.Employees.length == 0"
                  class="text-center mt-2"
                >
                  Không tồn tại bản ghi.
                </p>
              </div>
            </div>
          </div>

          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#event"
              @click="handleActiveAppoint()"
            >
              Danh sách lịch hẹn
            </button>
            <div v-if="isActiveAppoint" id="event" class="collapse mt-2">
              <Table
                :items="viewValue.Appointments"
                :cus="viewValue.Customer.name"
                :fields="['Ngày hẹn', 'Địa điểm', 'Nội dung lịch hẹn']"
                :labels="['date_time_format', 'place', 'content']"
                :activeCheck="false"
                :borderTableAll="true"
                :activeAction="false"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-none {
  outline: none;
  border: none;
}

.border-table-all {
  border: 1px solid var(--gray);
}
.border-all {
  border: 1px solid #ccc;
  border-radius: 5px;
}
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
}
.modal-parent {
  position: relative;
}
@media screen and (min-width: 739px) and (max-width: 992px) {
  .modal-content {
    width: 200%;
    margin-left: -50%;
  }
}
</style>
