<script>
import { reactive, computed } from "vue";

export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  setup(props, ctx) {
    const data = reactive({});
    const update = () => {
      if (
        props.item.fullname.length > 0 &&
        props.item.username.length > 0 &&
        props.item.email.length > 0 &&
        props.item.birthday.length > 0 &&
        props.item.registrationdate.length > 0
      ) {
        ctx.emit("update");
      }
    };
    return {
      update,
    };
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-view">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">Thông Tin Phân Công</h4>
          <button
            @click="$emit('cancel')"
            type="button"
            class="close"
            data-dismiss="modal"
          >
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form class="was-validated">
            <div class="form-group">
              <label for="name">Khách Hàng</label>
              
            </div>
            <div class="form-group">
              <label for="name">Loại Khách Hàng </label>
              
            </div>
            <div class="form-group">
              <label for="name">Nhân Viên Chăm Sóc</label>
              
            </div>
            <div class="form-group">
              <label for="name">Ngày Bắt Đầu</label>
              
            </div>
            <div class="form-group">
              <label for="name">Ngày Kết Thúc</label>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.show-modal {
  display: block;
  opacity: 1;
  pointer-events: auto;
}
</style>
