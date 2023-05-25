<template>
  <table class="my-table mb-2" :class="[borderTableAll ? 'border-table-all' : '']">
    <thead>
      <tr>
        <th v-if="isCheckBox"></th>
        <th>#</th>
        <th v-for="(value, index) in fields" :key="index">{{ value }}</th>
        <th v-if="activeAction">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-if="isCheckBox"><input type="checkbox" name="" id="" /></td>
        <td>{{ item.id }}</td>
        <td v-for="(label, index1) in labels" :key="index1">{{ item[label] }}</td>
        <td v-if="activeAction">
          <button v-if="!isCustomerType" @click="handleView(item)" type="button" class="btn-edit" data-toggle="modal" data-target="#model-view">
            <span id="view" class="material-symbols-outlined"> visibility </span>
          </button>
          <view-customer v-if="!isCustomerType" :item="viewData" />
          <button v-if="isCustomer" type="button" class="btn-edit" data-toggle="modal" data-target="#model-edit">
            <span id="edit" class="material-symbols-outlined mx-2"> edit </span>
          </button>
          <edit-customer v-if="isCustomer" :item="items[index]" />
          <button v-if="isCustomerType" type="button" class="btn-edit" data-toggle="modal" data-target="#model-edit">
            <span id="edit" class="material-symbols-outlined mx-2"> edit </span>
          </button>
          <edit-customer-type class="text-left" v-if="isCustomerType" :item="items[index]" />
          <span id="delete" class="material-symbols-outlined" @click="handleDelete"> delete </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
  


<script>
import Swal from "sweetalert2";
import EditCustomer from '../../views/customer/EditCustomer.vue';
import EditCustomerType from '../../views/customer/customerTypes/EditCustomerType.vue';
import ViewCustomer from '../../views/customer/ViewCustomer.vue';
import { ref } from 'vue';

export default {
  components: { EditCustomer, EditCustomerType, ViewCustomer },
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
    activeAction: {
      type: Boolean,
      default: true,
    },
    borderTableAll: {
      type: Boolean,
      default: false,
    },
    isCheckBox: {
      type: Boolean,
      default: true,
    },
    isCustomer: {
      type: Boolean,
      default: true
    },
    isCustomerType: {
      type: Boolean,
      default: false
    },
    
  },
  setup(props, ntx) {
    const handleDelete = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    };

    let viewData = ref(null)
    const handleView = (item) => {
      viewData.value = {
        ...item
      }
    }

    return {
      handleDelete,
      handleView,
      viewData
    }
  },
};
</script>


<style scoped>
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