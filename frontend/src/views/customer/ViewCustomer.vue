<template>
    <!-- <form-customer-phuc :view="true" :title="'View Customer'"/> -->
    <div class="modal" id="model-view">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="modal-header">
        <h4 class="modal-title" style="font-size: 15px;">View Customer</h4>
        <button type="button" class="close" data-dismiss="modal">
          &times;
        </button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <form-customer-phuc :view="true" :item="viewData"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from 'vue'
import formCustomerPhuc from '../../components/form/form-customer-phuc.vue'
export default {
  components: { formCustomerPhuc },
  props: {
    item: {
      type: Object
    }
  },

  setup(props){
    const viewData = reactive({
      ...props.item
    })

    return {
      viewData
    }
  }
}
</script>

<style>

</style>