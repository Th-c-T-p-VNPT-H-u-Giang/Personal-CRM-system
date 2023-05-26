<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
};
</script>

<template>
  <!-- The Modal -->
  <div class="modal" id="model-viewpc">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px">
            Báo Cáo Quản Lý Nhân Viên
          </h4>
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
              <label for="name">Nhân Viên:</label>
              <input
                type="text"
                class="form-control"
                id="staff"
                name="staff"
                v-model="item.staff"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="name">Chức Vụ:</label>
              <input
                type="text"
                class="form-control"
                id="position"
                name="position"
                v-model="item.position"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="name">Phòng Ban:</label>
              <input
                type="text"
                class="form-control"
                id="unit"
                name="unit"
                v-model="item.unit"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="name">Lãnh Đạo Phụ Trách Quản Lý:</label>
              <input
                type="text"
                class="form-control"
                id="leader"
                name="leader"
                v-model="item.leader"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="name">Phân Công Công Việc:</label>
              <textarea
                type="text"
                class="form-control"
                id="task"
                name="task"
                v-model="item.task"
                readonly
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
label {
  font-weight: bold;
}

/* CSS cho trường input */
input.form-control,
textarea.form-control {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box; /* Ensure padding and border don't increase the element's total width */
}

textarea.form-control {
  height: 100px; /* Độ cao cho textarea */
  resize: vertical; /* Cho phép chỉnh kích thước theo chiều dọc */
  background-color: #f7f7f7;
  cursor: not-allowed;
}

/* CSS cho trường input chỉ đọc */
input.form-control[readonly] {
  background-color: #f7f7f7;
  cursor: not-allowed;
}

/* CSS cho modal */
.modal {
  display: none; /* Ẩn modal mặc định */
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 4px;
  width: 100%;
}

.modal-header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #eaf5ff;
}

.modal-title {
  margin: 0;
  font-size: 15px;
}

.modal-body {
  padding: 10px;
}

.close {
  float: right;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: red;
  text-decoration: none;
  outline: none;
}

.show-modal {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

/* Additional CSS for form layout */
.form-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 15px;
}

.form-group label {
  flex-basis: 30%; /* Adjust the width of the labels */
  margin-bottom: 0;
}

.form-group input.form-control,
.form-group textarea.form-control {
  flex-basis: 70%; /* Adjust the width of the input fields */
  margin-bottom: 0;
}

@media (max-width: 768px) {
  /* Adjust the form layout for smaller screens */
  .form-group label {
    flex-basis: 100%;
  }

  .form-group input.form-control,
  .form-group textarea.form-control {
    flex-basis: 100%;
  }
}
</style>

