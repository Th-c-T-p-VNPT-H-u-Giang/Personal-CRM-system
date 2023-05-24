<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import Table from "./table/table_dash.vue";
import Pagination from "../unit/form_table/pagination_lananh.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";

export default {
  components: {
    apexchart: VueApexCharts,
    Table,
    Pagination,
    Search,
    Select,
  },
  setup() {
    // Data customer
    const data = reactive({
      items: [],
      entryValue: 2,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
      activeSelectAll: false,
    });
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        console.log("value.name", value.lev_name);
        return [value.uni_name].join("").toLocaleLowerCase();
      });
    });
    const filter = computed(() => {
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase()
        );
      });
    });
    const filtered = computed(() => {
      if (!data.searchText) {
        data.totalRow = data.items.length;
        return data.items;
      } else {
        data.totalRow = filter.value.length;
        return filter.value;
      }
    });
    const setNumberOfPages = computed(() => {
      return Math.ceil(filtered.value.length / data.entryValue);
    });
    const setPages = computed(() => {
      if (setNumberOfPages.value == 0 || data.entryValue == "All") {
        data.entryValue = data.items.length;
        data.numberOfPages = 1;
      } else data.numberOfPages = setNumberOfPages.value;
      data.startRow = (data.currentPage - 1) * data.entryValue + 1;
      data.endRow = data.currentPage * data.entryValue;
      // console.log(data);
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.currentPage - 1) * data.entryValue &&
          index + 1 <= data.currentPage * data.entryValue
        );
      });
    });
    const overview = ref(true);
    const detail = ref(false);
    const takeCare = ref(false);
    const selectedOption = ref("");
    watch(selectedOption, (newValue, oldValue) => {
      console.log("Dropdown value changed:", newValue);
      switch (selectedOption.value) {
        case "weak": {
          console.log("weak");
          dataChart.data[1] = [1, 2, 3, 4, 5, 6, 8];
          console.log(dataChart.data[1]);
          data.items = [
            {
              cus_id: 1,
              cus_name: "Lan Anh",
              tas_service_day: "2023-1-1",
              tas_service_content:
                "introduct new a service,introduct new a service",
            },
            {
              cus_id: 2,
              cus_name: "Hồng Diễm",
              tas_service_day: "2023-2-1",
              tas_service_content: "introduct new a service",
            },
          ];
          break;
        }
        case "month": {
          console.log("month");
          data.items = [
            {
              cus_id: 3,
              cus_name: "Lan Anh",
              tas_service_day: "2023-1-1",
              tas_service_content:
                "introduct new a service,introduct new a service",
            },
            {
              cus_id: 4,
              cus_name: "Hồng Diễm",
              tas_service_day: "2023-2-1",
              tas_service_content: "introduct new a service",
            },
          ];
          break;
        }
        case "quarter": {
          console.log("quarter");
          data.items = [];
          break;
        }
        case "year": {
          console.log("year");
          data.items = [];
          break;
        }
      }
    });
    const showCustomer = () => {
      takeCare.value = !takeCare.value;
      if (takeCare.value) {
        console.log("customer taked");
        data.items = [];
      } else {
        console.log("customer untaked");
        data.items = [];
      }
    };

    const chartOptions = ref({});
    const dataChart = reactive({ data: [] });
    const chartSeries = ref([]);
    dataChart.data.push(
      [30, 40, 45, 50, 49, 60, 70],
      [10, 50, 65, 20, 19, 65, 72]
    );
    chartOptions.value = {
      chart: {
        id: "basic-bar",
        type: "bar",
        width: 500,
      },
      xaxis: {
        categories: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
      },
      colors: ["rgb(255, 99, 132)", "#3300cc"],
    };

    chartSeries.value = [
      {
        name: "uncare",
        data: dataChart.data[0],
      },
      {
        name: "cared",
        data: dataChart.data[1],
      },
    ];
    watch(dataChart, (newValue, oldValue) => {
      // Gọi phương thức cập nhật biểu đồ khi dữ liệu thay đổi
      console.log("newvalue:", newValue, chartSeries.value[1].data);
      chartSeries.value = [
        {
          name: "uncare",
          data: dataChart.data[0],
        },
        {
          name: "cared",
          data: dataChart.data[1],
        },
      ];
    });
    onMounted(() => {
      data.items = [
        {
          cus_id: 1,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content:
            "introduct new a service,introduct new a service",
        },
        {
          cus_id: 2,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "introduct new a service",
        },
        {
          cus_id: 3,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content: "introduct new a service",
        },
        {
          cus_id: 4,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "introduct new a service",
        },
        {
          cus_id: 5,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content: "introduct new a service",
        },
        {
          cus_id: 6,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "introduct new a service",
        },
      ];
    });
    return {
      dataChart,
      chartOptions,
      chartSeries,
      data,
      overview,
      detail,
      takeCare,
      setPages,
      selectedOption,
      showCustomer,
    };
  },
};
</script>
<template>
  <div class="border-box">
    <!-- select_option - overview+detail -->
    <div class="m-3 d-flex menu justify-content-end">
      <select class="pl-2 mr-2" v-model="selectedOption" style="padding: 5px">
        <option disabled selected hidden value="cycles">Cycles</option>
        <option value="weak">Weak</option>
        <option value="month">Month</option>
        <option value="quarter">Quarter</option>
        <option value="year">Year</option>
      </select>
      <div class="">
        <button
          class="btn m-0"
          :class="{ 'btn-primary': overview }"
          @click="
            () => {
              detail = false;
              overview = true;
            }
          "
        >
          Overview
        </button>
        <button
          class="btn m-0"
          @click="
            () => {
              detail = true;
              overview = false;
            }
          "
          :class="{ 'btn-primary': detail }"
        >
          Detail
        </button>
      </div>
    </div>
    <div class="border-hr mb-3"></div>
    <!-- search, select, take care -->
    <div class="row ml-2 justify-content-between" v-if="detail">
      <div class="col-6 row">
        <Select
          class="col-2"
          :options="[
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
              value: 'All',
            },
          ]"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
        />
        <Search
          class="col-6"
          @update:searchText="(value) => (data.searchText = value)"
        />
      </div>
      <div class="col-6 row justify-content-end mr-3">
        <button
          class="btn"
          :class="{ 'btn-primary': !takeCare }"
          @click="showCustomer"
        >
          Uncare</button
        ><button
          class="btn"
          :class="{ 'btn-primary': takeCare }"
          @click="showCustomer"
        >
          Cared
        </button>
      </div>
    </div>
    <div class="mb-5 mx-2">
      <!-- <h1 class="text-center mb-5 mt-2">REPORT</h1> -->
      <apexchart
        :options="chartOptions"
        :series="chartSeries"
        v-model="dataChart"
        v-if="overview"
        height="400"
      />
      <div v-if="detail" class="mx-2">
        <h4 class="text-center my-2">Customer list</h4>
        <Table
          :items="setPages"
          :fields="['Customer_id', 'Name', 'Date', 'Content']"
          :labels="[
            'cus_id',
            'cus_name',
            'tas_service_day',
            'tas_service_content',
          ]"
          @update="getUnit"
          @onDelete="onDelete"
          @detail="detail"
          :name_id="'cus_id'"
        />
        <!-- Pagination -->
        <Pagination
          :numberOfPages="data.numberOfPages"
          :totalRow="data.totalRow"
          :startRow="data.startRow"
          :endRow="data.endRow"
          @updateCurrentPage="(value) => (data.currentPage = value)"
          class="mx-3"
        />
      </div>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
.border-box {
  border: 1px solid var(--gray);
  border-radius: 5px;
}
.border-hr {
  border-top: 1px solid var(--gray);
}
.menu {
  /* border: 1px solid var(--gray); */
  border-collapse: collapse;
}
select {
  background-color: #f6f6f6;
  border: 1px solid #b8c2cc;
  font-size: 16px;
}
@media screen and (max-width: 739px) {
  .border-box {
    width: 580px;
  }
}
</style>
