<template>

            <!-- <table-phuc :items="customerTypes" :labels="['name']" :nameRoute="'customer-types'"/> -->
    <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link to="/customer" @click="data.activeMenu = 2" :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']">Customer</router-link>
      <router-link to="/customer-types"  @click="data.activeMenu = 1" :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']">
        Loại khách hàng
      </router-link>
      
    </div>
    <!-- Filter -->
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex align-items-start">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#model-add">
          <span id="add" class="mx-2">Thêm</span>
        </button>
        <add-customer-type />
      </div>
    </div>
    <!-- Table -->
    <table-phuc class="text-center" :isCustomer="false" :isCustomerType="true" :items="data.customerTypes" :fields="['Tên']" :labels="['name']" :nameRoute="'customer-types'" :isCheckBox="false"/>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Swal from "sweetalert2";
import tablePhuc from '../../../components/table/table-phuc.vue';
import PaginationPhuc from '../../../components/table/pagination-phuc.vue';
import AddCustomerType from './AddCustomerType.vue';

export default {
    components: { tablePhuc, PaginationPhuc, AddCustomerType },
    setup() {
        const data = reactive({
            customerTypes: [
            {
                id: 1,
                name: "Normal"
            },
            {
                id: 2,
                name: "VIP"
            },
      ],
      entryValue: 4, // total record in page
      numberOfPages: 1,
      totalRow: 0, // total row data
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
    });

        const handleDelete = (typeId) => {
            Swal.fire({
                title: 'Bạn có muốn xóa dòng dử liệu này không?',
                text: "Dòng dử liệu này không có khả năng hồi phục nha!!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Đã xóa!',
                        'Bạn đã xóa dòng dử liệu',
                        'success'
                    )
                }
            })
        }

        const handleDeleteSelected = () => {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }
            })
        }

        return {
            handleDelete,
            handleDeleteSelected,
            data
        }
    }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-size: 18px;
}

.navbar {
  margin-top: -8px;
}

.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}

.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}

.menu a {
  border: 1px solid var(--gray);
  border-collapse: collapse;
  padding: 8px 12px;
  font-size: 15px;
}

.active-menu {
  color: blue;
}

.none-active-menu {
  color: var(--dark);
}

.border-hr {
  border-top: 1px solid var(--gray);
}

#add,
#delete-all {
  font-size: 14px;
}
</style>