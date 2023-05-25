<template>
  <table class="my-table mb-2" :class="[borderTableAll ? 'border-table-all' : '']">
    <thead>
      <tr>
        <th>#</th>
        <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
        <th>Quản lý</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.id }}</td>
        <td v-for="(label, index1) in labels" :key="index1">
          {{ item[label] }}
        </td>
        <td>
          <button type="button" @click="handleView(item)" class="mx-2 btn-view" data-toggle="modal" data-target="#model-view">
            <span id="view" class="material-symbols-outlined">
              visibility
            </span>
          </button>
          <view-report :item="viewData"/>
          <span id="mail" class="material-symbols-outlined"> mail </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
    
  
  
<script>
import { ref } from 'vue';
import ViewReport from '../../views/report/view-report.vue';


export default {
  components: {ViewReport  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      // default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    actionList: {
      type: Array,
      default: [],
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
    }
    return {
      handleView,
      viewData
    };
  },
};
</script>
  
  
<style scoped>
.btn-visibility {
  border: none;
  outline: none;
}

.btn-edit {
  border: none;
  outline: none;
}

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

#view,
#mail {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}

#view:hover {
  color: var(--blue);
}

#mail:hover {
  color: var(--yellow);
}

.btn-view {
  border: none;
  outline: none;
}
</style>