<template>
    <div class="modal" id="model-add">
    <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title" style="font-size: 15px;">Add A New Event</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
          <form-customer-phuc :btnName="'Add'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formCustomerPhuc from '../../components/form/form-customer-phuc.vue';

export default {
  components: {
    formCustomerPhuc
  }
}
</script>

<style>

</style>
