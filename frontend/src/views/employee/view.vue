<script>
import { watch, ref } from "vue";
export default {
  props: {
    item: {
      type: Object,
    },
  },
  setup(props, context) {
    const isActive = ref(false);

    const handleActiveCus = () => {
      isActive.value = !isActive.value;
    };
    return {
      isActive,
      handleActiveCus,
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
          <h4 class="modal-title">Thông tin chi tiết nhân viên</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <div class="">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#personal-info"
              style="margin-bottom: 0"
              @click="handleActiveCus"
            >
              Thông tin cá nhân
            </button>
            <div
              v-if="isActive"
              id="personal-info"
              class="collapse m-3 border-all"
            >
              <div class="d-flex justify-content-around">
                <div class="mt-3">
                  <p>
                    <span class="font-weight-bold">Họ tên: </span>
                    {{ item.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Email: </span>
                    {{ item.birthday }}
                  </p>
                  <p>
                    <span class="font-weight-bold">SDT: </span>
                    {{ item.phone }}
                  </p>
                </div>
                <div class="mt-3">
                  <p>
                    <span class="font-weight-bold">Họ tên: </span>
                    {{ item.address }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Email: </span>
                    {{ item.email }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6 border-none"
              data-target="#customer-type"
              @click="handleActiveCus"
            >
              Công việc
            </button>
            <div v-if="isActive" id="customer-type" class="collapse border-all">
              <div
                class="d-flex justify-content-around align-items-center"
                style="height: 100px"
              >
                <div>
                  <p>
                    <span class="font-weight-bold">Chức vụ: </span>
                    {{ item.Position.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Trung tâm: </span>
                    {{ item.Unit.Department.Center_VNPTHG.name }}
                  </p>
                </div>
                <div>
                  <p>
                    <span class="font-weight-bold">Phòng: </span>
                    {{ item.Unit.Department.name }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Đơn vị: </span>
                    {{ item.Unit.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6"
              data-target="#assignment"
            >
              Danh sách chăm sóc khách hàng
            </button>
            <div id="assignment" class="collapse mx-2">
              Lorem ipsum dolor text....
            </div>
          </div>
          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6"
              data-target="#event"
            >
              Danh sách sự kiện
            </button>
            <div id="event" class="collapse mx-2">
              Lorem ipsum dolor text....
            </div>
          </div>
          <div class="mt-2">
            <button
              data-toggle="collapse"
              class="px-3 py-2 h6"
              data-target="#habit"
            >
              Danh sách thói quen khách hàng
            </button>
            <div id="habit" class="collapse mx-2">
              Lorem ipsum dolor text....
            </div>
          </div> -->
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
