<template>
    <div class="container">
        <img v-if="checkView" class="rounded-circle mx-auto d-block"
         alt="" height="100">
        <form @submit.prevent class="mt-2">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Name (<span style="color: red;">*</span>)</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Name" :disabled='checkView'>
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdate">Birthdate (<span style="color: red;">*</span>)</label>
                    <input type="date" class="form-control" id="birthdate" placeholder="Enter birthdate"
                        :disabled="checkView">
                </div>
            </div>
            <div class="form-group">
                <label for="address">Address (<span style="color: red;">*</span>)</label>
                <input type="text" class="form-control" id="address" placeholder="Enter address" :disabled="checkView">
            </div>
            <div class="form-group">
                <label for="phone">Phone (<span style="color: red;">*</span>)</label>
                <input type="text" class="form-control" id="phone" placeholder="Enter phone number" :disabled="checkView">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="email">Email (<span style="color: red;">*</span>)</label>
                    <input type="text" class="form-control" id="email" placeholder="Enter email" :disabled="checkView">
                </div>
                <div class="form-group col-md-6" v-if="!checkView">
                    <label for="type">Customer Type </label>
                    <select id="type" class="form-control">
                        <option selected>--Choose--</option>
                        <option>VIP</option>
                    </select>
                </div>
                <div class="form-group col-md-6" v-if="checkView">
                    <label for="">Customer Type </label>
                    <input type="text" name="" id="" class="form-control" disabled>
                </div>
            </div>
            <div class="form-group" v-if="!checkView">
                <input type="file" class="form-control" id="avatar" placeholder="Enter avatar">
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="wor_current_workplace">Current workplace</label>
                    <input type="text" class="form-control" id="wor_current_workplace" placeholder="Enter current workplace"
                        :disabled="checkView">
                </div>
                <div class="form-group col-md-6">
                    <label for="wor_current_position">Work current position</label>
                    <input type="text" class="form-control" id="wor_current_position"
                        placeholder="Enter work current position ..." :disabled="checkView">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="wor_work_history">Work history</label>
                    <input type="text" class="form-control" id="wor_work_history" placeholder="Enter work history"
                        :disabled="checkView">
                </div>
                <div class="form-group col-md-6">
                    <label for="wor_work_temp">Work temp</label>
                    <input type="text" class="form-control" id="wor_work_temp" placeholder="Enter work temp"
                        :disabled="checkView">
                </div>
            </div>

            <button v-if="!view" type="submit" class="btn btn-primary">{{ btnName }}</button>
        </form>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
export default {
    props: {
        title: {
            type: String
        },
        btnName: {
            type: String
        },
        view: {
            type: Boolean,
            default: false
        },
        item: {
            type: Object
        }
    },

    setup(props) {

        const checkView = computed(() => {
            return props.view ? true : false;
        })
        

        return {
            checkView,
        }
    }
}
</script>

<style></style>