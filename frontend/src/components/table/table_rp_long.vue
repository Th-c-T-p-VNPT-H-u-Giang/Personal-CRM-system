<template>
  <table
    class="my-table mb-2"
    :class="[borderTableAll ? 'border-table-all' : '']"
  >
    <thead>
      <tr>
        <th>Id</th>
        <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
        <th v-if="activeActionView == true">Quản Lý</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ index + 1 }}</td>
        <td v-for="(label, index1) in labels" :key="index1">{{ item[label] }}</td>
        <td v-if="activeActionView == true" class="action-cell">
          <button type="button" @click="handleView(item)" class="mx-2 btn-view" data-toggle="modal" data-target="#model-view">
            <span id="view" class="material-symbols-outlined">
              visibility
            </span>
          </button>
          <!-- <viewReportAssignment :item="viewData"/>
           -->
          <view-modal :item="viewData" :isAssignmentCustomer="true" :title="'Thông tin khách hàng'"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref } from 'vue';
import ViewModal from '../modal/view-modal.vue';

export default {
  components: {
    ViewModal
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    actionList: {
      type: Array,
      default: [],
    },
    activeActionView: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    let viewData = ref(null)

    const handleView = (item) => {
      viewData.value = {
        ...item
      }

      // console.log(viewData.value);
    }
    return {
      handleView,
      viewData
    };
  },
};
</script>

<style scoped>
.my-table {
  width: 100%;
  border-collapse: collapse;
}

.border-table-all {
  border: 1px solid var(--gray);
}

.my-table th,
.my-table td {
  border: 1px solid var(--gray);
  border-left: 0;
  border-right: 0;
  padding: 8px;
}

.my-table th {
  font-weight: 900;
  font-size: 14px;
}

.my-table tbody tr:nth-child(even) {
  font-size: 13px;
}

#view {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}
#view:hover {
  color: var(--blue);
}

.btn-view{
  border: none;
  outline: none;
}

</style>