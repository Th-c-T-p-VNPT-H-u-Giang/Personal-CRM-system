<template>
    <div class="container">
        <!-- {{ item }} -->
        <img class="rounded-circle mx-auto d-block" :src="item.avatar" alt="Avatar" height="100">
        <form @submit.prevent class="mt-2">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Họ tên (<span style="color: red;">*</span>)</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Name" disabled v-model="item.name">
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdate">Ngày sinh  (<span style="color: red;">*</span>)</label>
                    <input type="date" class="form-control" id="birthdate" placeholder="Enter birthdate" disabled v-model="item.birthdate">
                </div>
            </div>
            <div class="form-group">
                <label for="address">Địa chỉ (<span style="color: red;">*</span>)</label>
                <input type="text" class="form-control" id="address" placeholder="Enter address" disabled v-model="item.address">
            </div>
            <div class="form-group">
                <label for="phone">Số điện thoại (<span style="color: red;">*</span>)</label>
                <input type="text" class="form-control" id="phone" placeholder="Enter phone number" disabled v-model="item.phone">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email (<span style="color: red;">*</span>)</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter email" disabled v-model="item.email">
                </div>
                <div class="form-group col-md-6">
                    <label for="type">Loại khách hàng </label>
                    <select id="type" class="form-control" v-model="item.type" disabled>
                        <option selected>--Choose--</option>
                        <option>VIP</option>
                    </select>
                </div>
            </div>
            <div class="form-group" v-if="!checkView">
                <input type="file" class="form-control" id="avatar" placeholder="Enter avatar">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="wor_current_workplace">Công việc hiện tại</label>
                    <input type="text" class="form-control" id="wor_current_workplace"
                        placeholder="Enter current workplace" disabled v-model="item.wor_current_workplace">
                </div>
                <div class="form-group col-md-6">
                    <label for="wor_current_position">Vị trí công việc hiện tại</label>
                    <input type="text" class="form-control" id="wor_current_position"
                        placeholder="Enter work current position ..." disabled v-model="item.wor_current_position">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="wor_work_history">Lịch sử công việc</label>
                    <input type="text" class="form-control" id="wor_work_history" placeholder="Enter work history" disabled v-model="item.wor_work_history">
                </div>
                <div class="form-group col-md-6">
                    <label for="wor_work_temp">Nhiệm kì công việc</label>
                    <input type="text" class="form-control" id="wor_work_temp" placeholder="Enter work temp" disabled v-model="item.wor_work_temp">
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        },
        checkView: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style></style>