<template>
  <!-- <form-customer-type-phuc :title="'Update Customer Type'" :btnName="'Update'"/> -->
  <div class="modal" id="model-edit">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px;">Edit Customer Type</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form-customer-type-phuc :title="'Update Customer Type'" :btnName="'Update'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formCustomerTypePhuc from '../../../components/form/form-customer-type-phuc.vue'
export default {
  components: { formCustomerTypePhuc },


}
</script>

<style></style>