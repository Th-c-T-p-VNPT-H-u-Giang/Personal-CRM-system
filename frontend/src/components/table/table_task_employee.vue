<script>
import { reactive, watchEffect, ref, watch } from "vue";
export default {
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
    activeAction: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
  },
  setup(ctx,ntx) {
    const data = reactive({
      activeSelectAll: false
    })
    const selectAll = ref(false);
    watch(selectAll, (value) => {
      // for (let i = 0; i < props.items.length; i++) {
      //   props.items[i].checked = value;
      // }
      console.log("table_ selectAll", value);
      ntx.emit("selectAll", value);
    });


    return {
     selectAll,
    }
  }
  
  
};
</script>

<template>
  <table
    class="my-table mb-2"
    :class="[borderTableAll ? 'border-table-all' : '']"
  >
    <thead>
      <tr>
        <th><input type="checkbox" name="" id="" v-model="selectAll"
        /></th>
        <th>Stt</th>
        <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>
            <input 
            type="checkbox"
            v-model="item.checked"
        >
        </td>
        <td>{{ index + 1 }}</td>
        <td v-for="(label, index1) in labels" :key="index1">
          {{ item[label] }}
        </td>
        <td>{{ item.Position.name }}</td>
        <td>{{ item.Unit.name }}</td>
        <td>{{ item.Unit.Department.name }}</td>
        <td>{{ item.Unit.Department.Center_VNPTHG.name }}</td>
      </tr>
      <!-- <button @click="getSelectedCheckboxes()">Lấy các checkbox đã chọn</button> -->
    </tbody>
  </table>
</template>

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

#view,
#edit,
#delete {
  font-size: 18px;
  cursor: pointer;
  border: 1px solid var(--gray);
  border-radius: 4px;
  padding: 1px;
}
#view:hover {
  color: var(--blue);
}
#edit:hover {
  color: var(--yellow);
}
#delete:hover {
  color: var(--red);
}
</style>
