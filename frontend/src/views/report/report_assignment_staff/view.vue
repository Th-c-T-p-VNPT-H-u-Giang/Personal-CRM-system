<script>
import { ref } from 'vue'
import Table from '../../../components/table/table_customer_types.vue'
export default {
  components: {
    Table
  },
  props: {
    item: {
      type: Object
    }
    ,
    itemViewCareCus: {
      type: Array
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
          <h4 class="modal-title">Thông tin chi tiết khách hàng</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="mb-2">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#personal-info"
              style="margin-bottom: 0;" @click="handleActiveCus">
              Thông tin cá nhân khách hàng
            </button>
            <div v-if="isActive" id="personal-info" class="collapse my-2 border-all">
              <img :src="item.Customer.avatar" alt="" class="rounded-circle mx-auto d-block border border-dark my-3"
                height="100">
              <div class="d-flex justify-content-around">
                <div>
                  <p><span class="font-weight-bold">Họ tên khách hàng: </span> {{ item.Customer.name }}</p>
                  <p><span class="font-weight-bold">Email mail khách hàng: </span> {{ item.Customer.email }}</p>
                  <p><span class="font-weight-bold">Số điện thoại khách hàng: </span> {{ item.Customer.phone }}</p>
                </div>
                <div>
                  <p><span class="font-weight-bold">Ngày sinh khách hàng: </span> {{ item.Customer.birthday }}</p>
                  <p><span class="font-weight-bold">Địa chỉ khách hàng: </span> {{ item.Customer.address }}</p>
                  <p><span class="font-weight-bold">Loại khách hàng: </span> {{ item.Customer_Type.name }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-2">
            <button data-toggle="collapse" style="margin-bottom: 0px;" class="px-3 py-2 h6 border-none"
              data-target="#customer-work" @click="handleActiveCus">
              Công việc
            </button>
            <div v-if="isActive" id="customer-work" class="collapse border-all my-2">
              <div class="d-flex justify-content-around align-items-center" style="height: 100px;"
                v-for="(item, index) in item.Customer_Works" :key="index">
                <div>
                  <p><span class="font-weight-bold">Công việc hiện tại: </span> {{ item.current_workplace }}</p>
                  <p><span class="font-weight-bold">Vị trí hiện tại: </span> {{ item.current_position }}</p>
                </div>
                <div>
                  <p><span class="font-weight-bold">Nhiệm kỳ: </span> {{ item.work_temp }}</p>
                  <p><span class="font-weight-bold">Lịch sử làm việc: </span> {{ item.work_history }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#assignment"
              @click="handleActiveCus">
              Danh sách chăm sóc khách hàng
            </button>
            <div v-if="isActive" id="assignment" class="collapse">
              <div class="table-responsive">
                <!-- <Table
                :items="itemViewCareCus"
                :fields="['Ngày bắt đầu', 'Ngày kết thúc', 'Nội dung chăm sóc', 'Tên khách hàng', 'Chu kì', 'Trạng thái' , 'Sao', 'Đánh giá']"
                :labels="['start_date','end_date', 'content' ,'customerName','cycleName','statusName','EvaluateStar', 'comment']" 
                :borderTableAll="true"
                :showActionList="[false, false, false]"
                :activeAction="false"
                :isActiveCheckbox="false"
                :startRow="0"
              /> -->
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Ngày bắt đầu</th>
                      <th>Ngày kết thúc</th>
                      <th>Nội dung chăm sóc</th>
                      <th>Tên khách hàng</th>
                      <th>Chu kì</th>
                      <th>Trạng thái</th>
                      <th>Số sao khách hàng đánh giá</th>
                      <th>Đánh giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ item.start_date }}</td>
                      <td>{{ item.end_date }}</td>
                      <td>{{ item.content }}</td>
                      <td>{{ item.Customer.name }}</td>
                      <td>{{ item.Cycle.name }}</td>
                      <td>{{ item.Status_Task.name }}</td>
                      <td>{{ item.Evaluate.star }}</td>
                      <td>{{ item.Comment == null ? 'Chưa đánh giá' : item.Comment.name }}</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <div v-for="(value, index) in item.Tasks" :key="index">
                <p> Ngày bắt đầu: {{ value.start_date }}</p>
                <p> Ngày kết thúc: {{ value.end_date }}</p>
                <p> Nội dung: {{ value.content }}</p>
              </div>
            </div>
          </div>
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#event" @click="handleActiveCus">
              Danh sách sự kiện
            </button>
            <div v-if="isActive" id="event" class="collapse">
              <Table :items="item.Events" :fields="['Tên sự kiện']" :labels="['name']" :borderTableAll="true"
                :showActionList="[false, false, false]" :activeAction="false" :isActiveCheckbox="false" />
            </div>
          </div>
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#habit" @click="handleActiveCus">
              Danh sách thói quen khách hàng
            </button>
            <div v-if="isActive" id="habit" class="collapse mt-2">
              <Table :items="item.Habits" :fields="['Tên thói quen']" :labels="['name']" :borderTableAll="true"
                :showActionList="[false, false, false]" :activeAction="false" :isActiveCheckbox="false" />
            </div>
          </div>
          <div class="">
            <button data-toggle="collapse" class="px-3 py-2 h6 border-none" data-target="#employee"
              @click="handleActiveCus">
              Thông tin nhân viên chăm sóc khách hàng
            </button>
            <div v-if="isActive" id="employee" class="collapse mt-2" style="border: 1px solid #ccc; border-radius: 3px;">
              <div class="d-flex justify-content-around">
                <div class="mt-3">
                  <p>
                    <span class="font-weight-bold">Họ tên nhân viên:  </span> {{ item.Employee.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Ngày sinh: </span> {{ item.Employee.birthday }}
                  </p>
                  <p> 
                    <span class="font-weight-bold">Số điện thoại:  </span> {{ item.Employee.phone }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Địa chỉ: </span>  {{ item.Employee.address }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Email: </span> {{ item.Employee.email }}
                  </p>
                </div>
                <div class="mt-3">
                  <p>
                    <span class="font-weight-bold">Chức vụ: </span>  {{ item.position }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Đơn vị: </span>   {{ item.unit }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Phòng: </span>  {{ item.department }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Trung tâm: </span>  {{ item.center }}
                  </p>
                </div>
              </div>
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

.border-all {
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>