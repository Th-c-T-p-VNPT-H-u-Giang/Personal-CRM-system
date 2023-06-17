<script>
import { reactive, ref, watch, onMounted, watchEffect } from "vue";
import { formatDateTime } from "../../assets/js/common";
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({
    });

    return {
      data,
      formatDateTime
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-noti">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">
            Chi tiết thông báo
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="activeStep = 1"
          >
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="model-body">
          <div class="d-flex">
            <div
              class="d-flex flex-grow-1 step-content px-3 my-3"
              style="width: 10000px"
            >
              <div class="d-flex justify-content-around">
                <div class="mt-3">
                  <p>
                    <span class="font-weight-bold">Từ: </span>
                    {{ item.sender }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Tiêu đề: </span>
                    {{ item.title }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Nội dung: </span>
                    {{ item.content }}
                  </p>
                  <p>
                    <span class="font-weight-bold">Được tạo lúc: </span>
                    {{ formatDateTime(item.createdAt) }}
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