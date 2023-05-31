<template>
  <div class="row justify-content-around">
    <!-- center -->
    <div>
      <button
        type="button"
        class="btn btn-primary mr-3"
        data-toggle="modal"
        data-target="#model-center"
      >
        <span id="delete-all" class="mx-2">Tất cả trung tâm</span>
      </button>
      <Center></Center>
    </div>
    <!-- Department -->
    <div>
      <button
        type="button"
        class="btn btn-primary mr-3"
        data-toggle="modal"
        data-target="#model-department"
      >
        <span id="delete-all" class="mx-2">Tất cả phòng</span>
      </button>
      <Department></Department>
    </div>
    <!-- Unit -->
    <div>
      <button
        type="button"
        class="btn btn-primary mr-3"
        data-toggle="modal"
        data-target="#model-unit"
      >
        <span id="delete-all" class="mx-2">Tất cả đơn vị</span>
      </button>
      <Unit></Unit>
    </div>
  </div>
</template>
<script>
import Center from "./center.vue";
import Department from "./department.vue";
import Unit from "./unit1.vue";

export default {
  components: { Department, Center, Unit },
};
</script>
