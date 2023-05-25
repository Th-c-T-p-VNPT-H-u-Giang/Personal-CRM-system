<template>
      <div class="border-box d-flex flex-column ml-2">
        <!-- Menu -->
        <div class="d-flex menu my-3 mx-3 justify-content-end">
            <router-link to="/report" @click="handle"
                :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']">
                Khách hàng lâu chưa chăm sóc
            </router-link>
            <div class="mx-2"></div>
            <router-link to="/report-leader-employee" @click="handleActiveCustomerTypeTab"
                :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']">
                Nhân viên lãnh đạo phụ trách
            </router-link>
            <div class="mx-2"></div>
            <router-link to="/report-leader-customer" @click="handleActiveCustomerTypeTab"
                :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']">
                Khách hàng lãnh đạo phụ trách
            </router-link>
        </div>
        <!-- Filter -->
        <!-- Search -->
        <!-- <div class="border-hr mb-3"></div>
        <div class="d-flex justify-content-between mx-3 mb-3">
            <div class="d-flex justify-content-start">
                <Select class="d-flex justify-content-start" :options="options" @update:entryValue="handleUpdateEntryValue"
                    :entryValue="data.entryValue" />
                <Search class="ml-3" style="width: 300px" @update:searchText="handleUpdateSearchText" />
            </div>
            <div class="d-flex align-items-start">
                <button type="button" class="btn btn-primary" @click="handlePrintData">
                    <span id="add" class="mx-2">In</span>
                </button>
            </div>
        </div> -->

        <!-- Table -->
        <!-- <table-phuc-report id="table-report" :fields="['Tên', 'Email', 'Địa chỉ', 'Lần sử dụng gần nhất']" :items="setPages"
            :labels="['name', 'email', 'address', 'recent_using']" /> -->

        <!-- <pagination-phuc :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
            :endRow="data.endRow" :currentPage="data.currentPage"
            @update:currentPage="(value) => data.currentPage = value" /> -->
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup(){
    const data = reactive({
      activeMenu: 2
    })

    return {
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