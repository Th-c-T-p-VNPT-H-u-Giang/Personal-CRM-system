<script>
import { reactive, ref } from "vue";
import Add from "../form_table/add_level.vue";
export default {
  components: { Add },
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
  setup(props, ntx) {
    const newDataUpdate = reactive({ lev_id: "", lev_name: "" });
    const get = (data) => {
      newDataUpdate.lev_name = data;
      // console.log("get data:", data, newDataUpdate);
    };
    const UpdateLevel = async (data) => {
      console.log("update data từ emit:", data);
    };
    return { get, newDataUpdate, UpdateLevel };
  },
};
</script>

<template>
  <div>
    <table
      class="my-table mb-2"
      :class="[borderTableAll ? 'border-table-all' : '']"
    >
      <thead>
        <tr>
          <th></th>
          <th>Id</th>
          <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
          <th v-if="activeAction == true">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td><input type="checkbox" name="" id="" /></td>
          <td>{{ index + 1 }}</td>
          <td v-for="(label, index1) in labels" :key="index1">
            {{ item[label] }}
          </td>
          <td v-if="activeAction == true">
            <span id="view" class="material-symbols-outlined">
              visibility
            </span>

            <span
              class="material-symbols-outlined mx-2"
              data-toggle="modal"
              data-target="#model-edit"
              @click="get(item.lev_id)"
              id="edit"
            >
              edit
            </span>

            <span id="delete" class="material-symbols-outlined"> delete </span>
          </td>
        </tr>
      </tbody>
    </table>
    <Add :newDataUpdate="newDataUpdate" @update="UpdateLevel" />
  </div>
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
  font-size: 22px;
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
