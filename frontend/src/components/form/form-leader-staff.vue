<template>
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
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style>

</style>