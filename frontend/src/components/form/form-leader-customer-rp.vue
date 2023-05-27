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
              <label for="nameQT">Tên quản trị:</label>
              <input
                type="text"
                class="form-control"
                id="nameQT"
                name="nameQT"
                v-model="item.nameQT"
                readonly
              />
            </div>
            <div class="form-group">
              <label for="date">Ngày</label>
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
              <label for="position">Nội dung</label>
              <input
                type="text"
                class="form-control"
                id="content"
                name="content"
                v-model="item.content"
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