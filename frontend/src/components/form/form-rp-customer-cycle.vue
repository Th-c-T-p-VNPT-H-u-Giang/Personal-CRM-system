<template>

  <form class="was-validated">
    <div class="form-group">
      <label for="name">Tên khách hàng:</label>
      <input
        type="text"
        class="form-control"
        id="nameCT"
        name="nameCT"
        v-model="item.nameCT"
        readonly
      />
    </div>
    <div class="form-group">
      <label for="nameEM">Tên nhân viên:</label>
      <input
        type="text"
        class="form-control"
        id="nameEM"
        name="nameEM"
        v-model="item.nameEM"
        readonly
      />
    </div>
    <div class="form-group">
      <label for="date">Ngày:</label>
      <input
        type="date"
        class="form-control"
        id="date"
        name="date"
        v-model="item.date"
        readonly
      />
    </div>
    <div class="form-group">
      <label for="position">Chu kì:</label>
      <input
        type="text"
        class="form-control"
        id="cycle"
        name="cycle"
        v-model="item.cycle"
        readonly
      />
    </div>
  </form>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style>
</style>