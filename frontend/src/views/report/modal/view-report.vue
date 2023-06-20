<script>
import { ref } from 'vue'
import Table from '../../../components/table/table_customer_types.vue'
export default {
  components: {
    Table
  },
  props: {
    item: {
      type: Object
    }
  },
  setup(props, context) {

    const isActive = ref(false)

    const handleActiveCus = () => {
      isActive.value = !isActive.value
    }
    
    return {
      isActive,
      handleActiveCus
    }
  }
}
</script>


<template>
  <div class="modal" id="model-view">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Thông tin chi tiết khách hàng</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
        </div>
      </div> 
    </div>
  </div>
</template>

<style scoped>
  .border-none {
    outline: none;
    border: none;
  }

  .border-all {
    border: 1px solid #ccc;
    border-radius: 5px;
  }
</style>