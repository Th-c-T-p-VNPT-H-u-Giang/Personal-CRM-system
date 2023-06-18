<script>
import { ref } from 'vue'
import Table from "../../components/table/table_duy.vue";
export default {
  components: {
    Table,
  },
  props: {
    viewValue: {
      type: Object,
      default: {},
    }
  },
  setup(props, context) {

    const isActive = ref(false)

    const handleActiveCus = () => {
      isActive.value = !isActive.value
    }
    
    return {
      isActive,
      handleActiveCus
    }
  }
}
</script>


<template>
  <div class="modal" id="model-view">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Thông tin chi tiết phân công</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#personal-info" style="margin-bottom: 0;" @click="handleActiveCus">
              Thông tin phân công
            </button>
            <div v-if="isActive" id="personal-info" class="collapse m-3 border-all">
              <div class="d-flex justify-content-around" style="margin-top:12px">
                <div>
                  <p><span class="font-weight-bold">Khách hàng: </span> {{ viewValue.Customer.name }}</p>
                  <p><span class="font-weight-bold">Ngày bắt đầu: </span> {{ viewValue.start_date }}</p>
                  <p><span class="font-weight-bold">Ngày kết thúc: </span> {{ viewValue.end_date }}</p>
                </div>
                <div>
                  <p><span class="font-weight-bold">Chu kỳ chăm sóc: </span> {{ viewValue.Cycle.name }}</p>
                  <p><span class="font-weight-bold">Nội dung chăm sóc: </span> {{ viewValue.content }}</p>
                  <p><span class="font-weight-bold">Trạng thái: </span> {{ viewValue.Status_Task.status == 'false' ? 'Thất bại' : 'Thành công' }}</p>
                  <p><span class="font-weight-bold">Nội dung trạng thái: </span> {{ viewValue.Status_Task.reason }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class=" mt-2">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#customer-work" @click="handleActiveCus">
             Thông tin khách hàng 
            </button>
            <div v-if="isActive" id="customer-work" class="collapse border-all">
              <img :src="viewValue.Customer.avatar" alt="" class="rounded-circle mx-auto d-block border border-dark my-3" height="100">
              <div class="d-flex justify-content-around align-items-center" style="height: 100px;">
                <div>
                  <p><span class="font-weight-bold">Khách hàng: </span> {{ viewValue.Customer.name }}</p>
                  <p><span class="font-weight-bold">Ngày sinh: </span> {{ viewValue.Customer.birthday }}</p>
                </div>
                <div>
                  <p><span class="font-weight-bold">Địa chỉ: </span> {{ viewValue.Customer.address }}</p>
                  <p><span class="font-weight-bold">Số điện thoại: </span> {{ viewValue.Customer.phone }}</p>
                  <p><span class="font-weight-bold">Email</span> {{ viewValue.Customer.email }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <button style="margin-bottom: 0px;" data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#assignment" @click="handleActiveCus">
              Danh sách nhân viên phụ trách
            </button>
            <div v-if="isActive" id="assignment" class="collapse my-3">
             <div class="table-responsive">
              <Table
                :items="viewValue.Employees"
                :fields="['Họ tên', 'Số điện thoại', 'Email', 'Chức vụ', 'Đơn vị']"
                :labels="['name','phone', 'email' ,'postionId','unitId']" 
                :borderTableAll="true"
                :showActionList="[false, false, false]"
                :activeAction="false"
                :isActiveCheckbox="false"
              />
             </div>
              
            </div>
          </div>
          <div class=" mt-2">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#event" @click="handleActiveCus">
              Danh sách lịch hẹn
            </button>
            <div v-if="isActive" id="event" class="collapse mx-2">
              <table
                class="my-table mb-2"
                :class="[borderTableAll ? 'border-table-all' : '']"
              >
                <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Khách hàng</th>
                    <th>Lịch hẹn</th>
                    <th>Nội dung</th>
                    <th>Trạng thái cuộc hẹn</th>
                    <th>Lý do</th>
                  </tr>
                </thead>
                <tbody>
                    <td>{{ viewValue.Appointments }}</td>
                    <td>{{ viewValue.Customer.name }}</td>
                    <td>{{ viewValue.Appointments.date_time }}</td>
                    <td>{{ viewValue.Appointments.content }}</td>
                    <!-- <td>{{ viewValue.Appointments.Status_App.status == 'false' ? 'Thất bại' : 'Thành công' }}</td>
                    <td>{{ viewValue.Appointments.Status_App.reason }}</td> -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#habit" @click="handleActiveCus">
              Feedback
            </button>
            <!-- <div v-if="isActive" id="habit" class="collapse mx-2">
              <Table
                :items="item.Habits"
                :fields="['Tên thói quen']"
                :labels="['name']" 
                :borderTableAll="true"
                :showActionList="[false, false, false]"
                :activeAction="false"
                :isActiveCheckbox="false"
              />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .border-none {
    outline: none;
  }

  .border-all {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>