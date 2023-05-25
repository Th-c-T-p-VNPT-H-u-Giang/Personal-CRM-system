<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import Table from "../../components/table/table_dash_lananh.vue";
import Pagination from "../unit/form_table/pagination_lananh.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import Box from "../../components/box_lananh/box.vue";
import SelectOption from "../../components/box_lananh/select.vue";
export default {
  components: {
    apexchart: VueApexCharts,
    Table,
    Pagination,
    Search,
    Select,
    Box,
    SelectOption,
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
        return [value.cus_name].join("").toLocaleLowerCase();
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

    // table customer
    const overview = ref(true);
    const detail = ref(false);
    const takeCare = ref(false);
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
    // Chart
    const selectedOption = ref("week");
    const customerChart = ref(false);
    const staffChart = ref(false);
    const appointmentChart = ref(true);
    const showchart = ref("appointment");
    const chartOptions = ref({});
    const dataChart = reactive({ data: [] });
    const chartSeries = ref([]);
    dataChart.data.push(
      [30, 40, 45, 50, 49, 60, 70],
      [10, 50, 65, 20, 19, 65, 72]
    );
    const show = (nameChart, cycle) => {
      if (nameChart == "customer") {
        switch (cycle) {
          case "week": {
            console.log("weak+customer");
            dataChart.data[0] = [10, 40, 45, 50, 49, 60, 70];
            console.log(dataChart.data[0]);
            break;
          }
          case "month": {
            console.log("month+customer");

            break;
          }
        }
      } else if (nameChart == "staff") {
        switch (cycle) {
          case "weak": {
            console.log("weak+staff");
            break;
          }
          case "month": {
            console.log("month+staff");
            break;
          }
        }
      } else if (nameChart == "appointment") {
        switch (cycle) {
          case "week": {
            console.log("weak+appointment");
            dataChart.data[0] = [10, 40, 45, 50, 49, 60, 70];
            dataChart.data[1] = [10, 70, 65, 50, 49, 23, 104];
            break;
          }
          case "month": {
            console.log("month+appointment");
            break;
          }
        }
      }
    };
    // watch select_option
    watch([selectedOption], ([newValue1, oldValue1]) => {
      console.log("Dropdown value changed:", newValue1);
      show(showchart.value, newValue1);
    });

    chartOptions.value = {
      chart: {
        id: "basic-bar",
        type: "bar",
      },
      xaxis: {
        categories: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
        ],
      },
      colors: ["rgb(255, 99, 132)", "#3300cc"],
    };

    chartSeries.value = [
      {
        name: "Chưa chăm sóc",
        data: dataChart.data[0],
      },
      {
        name: "Đã chăm sóc",
        data: dataChart.data[1],
      },
    ];
    // **watch datachart
    watch(dataChart, (newValue, oldValue) => {
      // Gọi phương thức cập nhật biểu đồ khi dữ liệu thay đổi
      console.log("newvalue:", newValue, ":", dataChart.data[0]);
      console.log("Showchart", showchart.value);
      if (showchart.value == "customer") {
        chartOptions.value = {
          chart: {
            id: "basic-bar",
            type: "bar",
          },
          xaxis: {
            categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
          },
          colors: ["rgb(255, 99, 132)"],
        };

        chartSeries.value = [
          {
            name: "Khách hàng mới",
            data: newValue[0],
          },
        ];
      } else if (showchart.value == "appointment") {
        console.log("APP");
        chartOptions.value = {
          chart: {
            id: "basic-bar",
            type: "bar",
          },
          xaxis: {
            categories: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6"],
          },
          colors: ["rgb(255, 99, 132)", "#3300cc"],
        };

        chartSeries.value = [
          {
            name: "Chưa chăm sóc",
            data: dataChart.data[0],
          },
          {
            name: "Chưa chăm sóc",
            data: dataChart.data[1],
          },
        ];
      }
    });
    watch(showchart, (newValue, oldValue) => {
      console.log(showchart.value);
      show(showchart.value, selectedOption.value);
    });
    watch(takeCare, (newValue, oldValue) => {
      console.log("takecare", newValue);
    });
    onMounted(() => {
      data.items = [
        {
          cus_id: 1,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
        },
        {
          cus_id: 2,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
        },
        {
          cus_id: 3,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
        },
        {
          cus_id: 4,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
        },
        {
          cus_id: 5,
          cus_name: "Lan Anh",
          tas_service_day: "2023-1-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
        },
        {
          cus_id: 6,
          cus_name: "Hồng Diễm",
          tas_service_day: "2023-2-1",
          tas_service_content: "Giới thiệu dịch vụ mới abcdefgh,...",
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
      showchart,
      showCustomer,
      customerChart,
      staffChart,
      appointmentChart,
    };
  },
};
</script>
<template>
  <div class="border-box">
    <!-- select_option - overview+detail -->
    <div class="m-3 d-flex menu justify-content-end">
      <!-- select cycles -->
      <SelectOption
        :field="[
          { name: 'Tuần', value: 'week' },
          { name: 'Tháng', value: 'month' },
        ]"
        @option="
          (value) => {
            selectedOption = value;
          }
        "
      ></SelectOption>
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
          Tổng quan
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
          Chi tiết
        </button>
      </div>
    </div>
    <div class="border-hr mb-3"></div>
    <!-- Box -->
    <Box
      :showchart="showchart"
      @Chart="
        (value) => {
          showchart = value;
        }
      "
    ></Box>

    <!-- search, select, take care -->
    <div class="row ml-2 justify-content-between" v-if="detail">
      <div class="col-5 row">
        <Select
          class="col-md-2 col-4"
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
          class="col-md-6 col-8"
          :class="col"
          @update:searchText="(value) => (data.searchText = value)"
        />
      </div>
      <!-- @click="showCustomer" -->
      <div class="col-7 row justify-content-end mr-2">
        <button
          class="btn col-md-3 col-6 pad"
          :class="{ 'btn-primary': !takeCare }"
          @click="takeCare = !takeCare"
          v-if="showchart == 'appointment'"
        >
          Chưa chăm sóc</button
        ><button
          class="btn col-md-3 col-6 pad"
          :class="{ 'btn-primary': takeCare }"
          @click="takeCare = !takeCare"
          v-if="showchart == 'appointment'"
        >
          Đã chăm sóc
        </button>
      </div>
    </div>
    <div class="mb-5 mx-2">
      <apexchart
        :options="chartOptions"
        :series="chartSeries"
        v-if="overview"
        height="400"
      />

      <div v-if="detail" class="mx-2">
        <h4 class="text-center my-2">Danh sách khách hàng</h4>
        <Table
          :items="setPages"
          :fields="['Mã khách hàng', 'Họ tên ', 'Ngày', 'Nội dung']"
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

.pad {
  padding: 1px;
}
@media screen and (max-width: 739px) {
  apexchart {
    width: 500px;
  }
}
</style>
