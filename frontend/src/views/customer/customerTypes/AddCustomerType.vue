<template>
    <div class="modal" id="model-add">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px;">Add Customer Type</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
            <form-customer-type-phuc :title="'Add Customer Type'" :btnName="'Add'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormCustomerTypePhuc from '../../../components/form/form-customer-type-phuc.vue'
export default {
    components: {
        FormCustomerTypePhuc
    }

}
</script>

<style>

</style>
FormCustomerTypePhuc