<template>
    <div class="container">
        <img v-if="checkView" class="rounded-circle"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3Bc4deiXhE3yesuj-lYwq_nZiTbnbmuxdRHRc8H8&s" alt="">

        <form class="">
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="name">Name (<span style="color: red;">*</span>)</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Name" :disabled='checkView'>
                </div>
                <div class="form-group col-md-6">
                    <label for="birthdate">Birthdate (<span style="color: red;">*</span>)</label>
                    <input type="date" class="form-control" id="birthdate" placeholder="Enter birthdate" value="yyyy-mm-dd"
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
                <div class="form-group col-md-6">
                    <label for="type">Customer Type </label>
                    <select id="type" class="form-control">
                        <option selected>--Choose--</option>
                        <option>VIP</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <input type="file" class="form-control" id="avatar" placeholder="Enter avatar" :disabled="checkView">
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
import { computed } from 'vue'
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
        }
    },

    setup(props) {

        const tagView = props.view
        const checkView = computed(() => {
            return props.view ? true : false;
        })

        console.log(tagView);

        return {
            checkView,
            tagView
        }
    }
}
</script>

<style></style>