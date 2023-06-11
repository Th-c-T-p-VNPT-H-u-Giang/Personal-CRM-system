<template>
    <div class="modal" id="model-view">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title" style="font-size: 15px;">{{ title }}</h4>
                    <button type="button" class="close" data-dismiss="modal">
                        &times;
                    </button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <form-phuc-report v-if="isCustomerLongTime" :item="viewData" :checkView="true"/>
                    <form-rp-assignment v-if="isAssignmentCustomer" :item="viewData"/> 
                    <form-rp-customer-cycle v-if="isCustomerCycle" :item="viewData"/>
                    <form-leader-customer-rp v-if="isLeaderCustomer" :item="viewData"/>
                    <form-leader-staff v-if="isLeaderStaff" :item="viewData"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {  onBeforeUpdate, ref } from 'vue'
// import formCustomerPhuc from '../../components/form/form-customer-phuc.vue'
import FormPhucReport from '../../components/form/form-phuc-report.vue'
import FormRpAssignment from '../form/form-rp-assignment.vue'
import FormRpCustomerCycle from '../form/form-rp-customer-cycle.vue'
import FormLeaderCustomerRp from '../form/form-leader-customer-rp.vue'
import FormLeaderStaff from '../form/form-leader-staff.vue'
export default {
    components: {FormPhucReport, FormRpAssignment, FormRpCustomerCycle, FormLeaderCustomerRp, FormLeaderStaff},
    props: {
        item: {
            type: Object
        },
        title: {
            type: String
        },
        isCustomerLongTime: {
            type: Boolean,
            default: false
        },
        isAssignmentCustomer: {
            type: Boolean,
            default: false
        },
        isCustomerCycle: {
            type: Boolean,
            default:false
        },
        isLeaderCustomer: {
            type: Boolean,
            default:false
        },
        isLeaderStaff: {
            type: Boolean,
            default:false
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