<template>
    <div class="modal" id="model-view">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 15px;">Xem chi tiết khách hàng</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        &times;
                    </button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <form-phuc-report :item="viewData" :checkView="true"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {  onBeforeUpdate, ref } from 'vue'
// import formCustomerPhuc from '../../components/form/form-customer-phuc.vue'
import FormPhucReport from '../../components/form/form-phuc-report.vue'
export default {
    components: {FormPhucReport},
    props: {
        item: {
            type: Object
        }
    },

    setup(props) {
        let viewData = ref({})



        onBeforeUpdate(() => {
            viewData.value = {
                ...props.item
            }
        })
        
        return {
            viewData
        }
    }
}
</script>

<style></style>