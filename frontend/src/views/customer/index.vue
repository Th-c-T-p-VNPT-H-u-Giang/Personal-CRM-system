<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link to="/customer" @click="handleActiveCustomerTab" :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']">
        Customer
      </router-link>
      <router-link to="/customer-types" @click="handleActiveCustomerTypeTab" :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']">
        Customer Types
      </router-link>
      
    </div>
    <!-- Filter -->
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
      <div class="d-flex justify-content-start">
        <Select class="d-flex justify-content-start" :options="options" @update:entryValue="handleUpdateEntryValue" :entryValue="data.entryValue" />
        <Search class="ml-3" style="width: 300px" @update:searchText="handleUpdateSearchText" />
        
      </div>
      <div class="d-flex align-items-start">
        <button type="button" class="btn btn-danger mr-3" data-toggle="modal" data-target="#model-delete-all">
          <span id="delete-all" class="mx-2">Delete All</span>
        </button>
        <delete-all :items="data.customers"/>
        <!-- <DeleteAll :items="data.customers" /> -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#model-add">
          <span id="add" class="mx-2">Add</span>
        </button> 
        <add />
      </div>
    </div>
    <!-- Table -->
    <table-phuc :fields="['Name','Email', 'Address', 'Work', 'Type']"
      :labels="['name', 'email', 'address', 'wor_current_position', 'type']" :items="setPages" :nameRoute="'customer'" />
    <!-- Pagination -->
    <pagination-phuc :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
      :endRow="data.endRow" :currentPage="data.currentPage" @update:currentPage="(value) => data.currentPage = value" />
  </div>
</template>

<script>
import { reactive, computed } from "vue";
import tablePhuc from "../../components/table/table-phuc.vue";
import PaginationPhuc from "../../components/table/pagination-phuc.vue";
import Search from '../../components/form/search.vue';
import Select from '../../components/form/select.vue';
import Add from './AddCustomer.vue';
import DeleteAll from '../../components/form/delete-all.vue';

export default {
  components: { tablePhuc, PaginationPhuc, Search, Select, Add, DeleteAll },
  setup() {
    let shortDate_1 = new Date("2021-08-08");
    const data = reactive({
      customers: [
        {
          id: 1,
          name: "Dang Van Phuc",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 2,
          name: "Pham Thanh Phong",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 3,
          name: "Nguyen Anh Nam",
          birthdate: shortDate_1
          ,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 4,
          name: "Le Quoc Thinh",
          birthdate: shortDate_1
          ,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 5,
          name: "Vo Van Thach",
          birthdate: shortDate_1
          ,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 6,
          name: "Tran Minh Sang",
          birthdate: shortDate_1
          ,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
        {
          id: 7,
          name: "Nguyen Hoang Trong Tien",
          birthdate: shortDate_1
          ,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: 'VNPT',
          wor_current_position: "Student",
          wor_work_temp: "HKII",
        },
      ],
      entryValue: 5, // total record in page
      numberOfPages: 1,
      totalRow: 0, // total row data
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 2,
    });
    
    const options = reactive([
            {
                name: 5,
                value: 5,
            },
            {
                name: 10,
                value: 10,
            },
            {
                name: 20,
                value: 20,
            },
            {
                name: 30,
                value: 30,
            },
            {
                name: 'All',
                value: 9999,
            },
        ])
 

    // handle update entry value 
    const handleUpdateEntryValue = (value) => {
      data.entryValue = value
    }
    

    //handle update search text 
    const handleUpdateSearchText = (value) => {
      data.searchText = value;
    }
    // // handle pagination
    const toString = computed(() => {
      return data.customers.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase(); // convert to array having is string
        // Example: ['Dang Van Phuc', 'Pham Thanh Phong', 'Nguyen Anh Nam', 'Le Quoc Thinh', 'Vo Van Thach', 'Tran Minh Sang', 'Nguyen Hoang Trong Tien']
      });
    });
    
    const filter = computed(() => {
      // filter array  objects having search text
      return data.customers.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase() //
        );
      });
    });



    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.customers.length;
        return data.customers;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });


    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    }); // get total pages

    const setPages = computed(() => {
      if (setNumberOfPages.value == 0 || data.entryValue == "All") {
        data.entryValue = data.items.length;
        data.numberOfPages = 1;
      } else data.numberOfPages = setNumberOfPages.value;
      data.startRow = (data.currentPage - 1) * data.entryValue + 1;
      data.endRow = data.currentPage * data.entryValue;
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.currentPage - 1) * data.entryValue &&
          index + 1 <= data.currentPage * data.entryValue
        );
      });
    });


    // handle active customer
    const handleActiveCustomerTab = () => {
      data.activeMenu = 2
    }

    //handle active customer type 
    const handleActiveCustomerTypeTab = () => {
      data.activeMenu = 1
    }

    return {
      data,
      setPages,
      options,
      handleUpdateEntryValue,
      handleUpdateSearchText,
      handleActiveCustomerTab,
      handleActiveCustomerTypeTab
    };
  },
};
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
