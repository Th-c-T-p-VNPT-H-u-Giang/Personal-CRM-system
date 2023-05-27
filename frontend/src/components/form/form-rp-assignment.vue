<template>
    <form class="was-validated">
        <div class="form-group">
            <label for="name">Khách Hàng:</label>
            <input type="text" class="form-control" id="customers" name="customers" v-model="item.customers" readonly />
        </div>
        <div class="form-group">
            <label for="name">Loại Khách Hàng:</label>
            <input type="text" class="form-control" id="customerstype" name="customerstype" v-model="item.customerstype"
                readonly />
        </div>
        <div class="form-group">
            <label for="name">Nhân Viên Phụ Trách Chăm Sóc:</label>
            <input type="text" class="form-control" id="staff" name="staff" v-model="item.staff" readonly />
        </div>
        <div class="form-group">
            <label for="name">Ngày Bắt Đầu Chăm Sóc:</label>
            <input type="text" class="form-control" id="startdate" name="startdate" v-model="item.startdate" readonly />
        </div>
        <div class="form-group">
            <label for="name">Ngày Kết Thúc Chăm Sóc:</label>
            <input type="text" class="form-control" id="enddate" name="enddate" v-model="item.enddate" readonly />
        </div>
        <div class="form-group">
            <label for="name">Lịch Hẹn:</label>
            <textarea class="form-control" id="appointment" name="appointment" v-model="item.appointment" readonly
                style="white-space: pre-wrap; word-break: break-word" rows="3"/>
        </div>
        <div class="form-group">
            <label for="name">Nội Dung Chăm Sóc:</label>
            <textarea class="form-control" id="content" name="content" v-model="item.content" readonly
                style="white-space: pre-wrap; word-break: break-word" rows="3" />
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

<style></style>