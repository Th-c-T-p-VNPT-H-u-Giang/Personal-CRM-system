<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
// import Table from "../../components/table/table_dash_lananh.vue";
import Table from "../../components/table/table_customer.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import Box from "../../components/box_lananh/box.vue";
import SelectOption from "../../components/box_lananh/select.vue";

//service
import Cycle from "../../services/cycle.service";
import { Customer, Customer_Types, http_getAll } from "../common/import";

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
      entryValue: 4,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 1,
      activeSelectAll: false,
      entryType: "",
      customerType: {},
      customer: {},
    });
     // computed
     const toString = computed(() => {
      console.log("Starting search");
      if (data.choseSearch == "nameCus") {
        return data.items.map((value, index) => {
          return [value.Customer.name].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "statustask") {
        return data.items.map((value, index) => {
          return [value.Status_Task.name].join("").toLocaleLowerCase();
        });
      } else if (data.choseSearch == "cycle") {
        return data.items.map((value, index) => {
          return [value.Cycle.name].join("").toLocaleLowerCase();
        });
      } else {
        return data.items.map((value, index) => {
          return [
            value.Customer.name,
            value.Status_Task.name,
            value.Cycle.name,
          ]
            .join("")
            .toLocaleLowerCase();
        });
      }
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


    //search
    const cycles = reactive({ cycle: [] });
    const entryValueStatusTask = ref(""); //id
    const entryNameStatusTask = ref("Trạng thái");
    const entryValueCycle = ref(""); //id
    const entryNameCycle = ref("Chu kỳ"); //name
    const updateEntryValueStatusTask = (value) => {
      entryValueStatusTask.value = value;
    };
    const updateEntryValueCycle= (value) => {
      entryValueCycle.value = value;
    };

    // table customer
    const overview = ref(true);
    const detail = ref(false);
    // !chăm sóc
    const takeCare = ref(false);
    // !phân công
    const assign = ref(false);
    const isassign = ref(true);
    // Chart
    const selectedOption = ref("week"); //cycle
    const customerChart = ref(false);
    const appointmentChart = ref(true);
    const showchart = ref("appointment");

    const chartOptions = ref({});
    const dataChart = reactive({ data: [] });
    const chartSeries = ref([]);
    const chartOptions1 = reactive({
      chart: {
        type: "pie",
      },
      labels: [],
      series: [],
      colors: ["#9FD7F0", "#3300cc", "#1CA7EC"],
    });
    const chartSeries1 = ref([]);
    const chartOptions2 = ref({
      chart: {
        type: "pie",
      },
      labels: ["Chưa phân công", "Đã phân công"],
      series: [],
      colors: ["#FFDD94", "#FD8F52"],
    });

    dataChart.data.push([1, 4, 5, 5], [2, 7, 5, 5]);
    chartOptions.value = {
      chart: {
        id: "basic-bar",
        type: "bar",
      },
      xaxis: {
        categories: ["Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"],
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
    // 16/6
    const show = async (nameChart, cycle) => {
      if (nameChart == "customer") {
      } else if (nameChart == "appointment") {
        switch (cycle) {
          case "week": {
            console.log("weak+appointment");
            dataChart.data[0] = [10, 40, 45, 50, 49];
            dataChart.data[1] = [10, 70, 65, 50, 49];
            break;
          }
          case "month": {
            console.log("month+appointment");
            dataChart.data[0] = [10, 40, 45, 50];
            dataChart.data[1] = [30, 40, 45, 50];
            break;
          }
        }
      }
    };
    // watch select_option
    watch([selectedOption], ([newValue, oldValue]) => {
      console.log("Dropdown value changed:", newValue);
      console.log(selectedOption);
      show(showchart.value, newValue);
    });

    // **watch datachart
    watch(dataChart, (newValue, oldValue) => {
      // Gọi phương thức cập nhật biểu đồ khi dữ liệu thay đổi
      console.log("Data chart", newValue, ":", dataChart.data);
      if (showchart.value == "customer") {
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
            name: "vip",
            data: dataChart.data[0],
          },
          {
            name: "thường",
            data: dataChart.data[1],
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
            name: "Đã chăm sóc",
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

    //refresh
    const refresh = async () => {
      data.customerType = await http_getAll(Customer_Types);
      data.customer = await http_getAll(Customer);
      data.items = await http_getAll(Customer);
      cycles.cycle = await http_getAll(Cycle);
      console.log("cycle",cycles.cycle)
    };

    const chartSeries2 = ref([30, 70]);
    onMounted(async () => {
      await refresh();
      console.log("s");
      for (let i = 0; i < data.customerType.documents.length; i++) {
        chartOptions1.labels[i] = data.customerType.documents[i].name;
        chartSeries1.value[i] = 0;
        for (let j = 0; j < data.customer.documents.length; j++) {
          if (
            data.customerType.documents[i]._id ==
            data.customer.documents[j].customerTypesId
          ) {
            chartSeries1.value[i]++;
          }
        }
      }
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
      customerChart,
      appointmentChart,
      assign,
      isassign,
      chartOptions1,
      chartSeries1,
      chartOptions2,
      chartSeries2,
      entryValueStatusTask,
      entryNameStatusTask,
      updateEntryValueStatusTask,
      entryValueCycle,
      entryNameCycle,
      updateEntryValueCycle,
      cycles,
    };
  },
};
</script>
<template>
  <div class="border-box" style="margin-left: 8px">
    <!-- select_option - overview+detail -->
      <div class="mb-3"></div>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex justify-content-start">
            <Select
            v-if="showchart == 'appointment'"
            :title="`Chu kỳ`"
            :entryValue="entryNameCycle"
            :options="cycles.cycle"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueCycle(value),
                (entryNameCycle = value1.name)
              )
            "
            @refresh="
              (entryNameCycle= 'Chu kỳ'), updateEntryValueCycle('')
            "
        style="height: 35px"/>
        </div>
        <div class="d-flex align-items-start">
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
      <div class="col-6 row">
        <div class="d-flex justify-content-start">
        <Select
          class="d-flex justify-content-start"
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
          ]"
          style="width: 125px"
          :title="`Số bản ghi`"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
          @refresh="data.entryValue = 'All'"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
          :entryValue="data.searchText"
          @choseSearch="
            async (value) => (
              console.log('search ........'),
              (data.choseSearch = value),
              (data.currentPage = 1)
            )
          "
          @refresh="(data.entryValue = 'All'), (data.currentPage = 1)"
          :options="[
            {
              _id: 'nameCus',
              name: 'Tìm kiếm theo tên khách hàng',
            },
            {
              _id: 'statustask',
              name: 'Tìm kiếm theo trạng thái',
            },
            {
              _id: 'cycle',
              name: 'Tìm kiếm theo chu kỳ',
            },
          ]"
        />
        <Select
            class="ml-3 w-100"
            :title="`Trạng thái`"
            :entryValue="entryNameStatusTask"
            @update:entryValue="
              (value, value1) => (
                updateEntryValueStatusTask(value),
                (entryNameStatusTask = value1.name)
              )
            "
            @refresh="
              (entryNameStatusTask = 'Trạng thái'), updateEntryValueStatusTask('')
            "
            style="height: 35px"
          />
        </div>
      </div>
     
      <!-- @click="showAssignment" -->
      <!-- <div class="col-6 row justify-content-end mr-2">
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
          :app_day="`false`"
        >
          Đã chăm sóc
        </button>
        <button
          class="btn col-md-3 col-6 pad"
          :class="{ 'btn-primary': !assign }"
          @click="assign = !assign"
          v-if="showchart == 'customer'"
        >
          Chưa phân công</button
        ><button
          class="btn col-md-3 col-6 pad"
          :class="{ 'btn-primary': assign }"
          @click="assign = !assign"
          v-if="showchart == 'customer'"
          :app_day="`false`"
        >
          Đã phân công
        </button>
      </div> -->
    </div>

    <div class="mb-5">
      <!--Chart -->
      <!--Chart Appointment -->
      <apexchart
        :options="chartOptions"
        :series="chartSeries"
        v-if="overview && showchart == 'appointment'"
        height="400"
      />
      <!--Chart Customer -->
      <div class="row">
        <apexchart
          class="col-md-6 col-12"
          :options="chartOptions1"
          :series="chartSeries1"
          v-if="overview && showchart == 'customer'"
          height="400"
        />
        <apexchart
          class="col-md-6 col-12"
          :options="chartOptions2"
          :series="chartSeries2"
          v-if="overview && showchart == 'customer'"
          height="400"
        />
      </div>
      <!-- End Chart -->

      <!--Detail -->
      <div v-if="detail">
        <h4 class="text-center my-2">Danh sách khách hàng</h4>

        <Table :items="setPages" :fields="[
            'Tên',
            'Email',
            'Sdt',
            'Công việc',
            'Công ty',
            'Loại khách hàng',
        ]" :selectAll="data.selectAll" :startRow="data.startRow" @selectAll="(value) => handleSelectAll(value)"
        @delete="handleDelete" @edit="edit" @view="view" />
        <!-- Pagination -->
        <Pagination 
        :numberOfPages="data.numberOfPages" 
        :totalRow="data.totalRow" :startRow="data.startRow"
        :endRow="data.endRow" 
        :currentPage="data.currentPage" 
        @update:currentPage="(value) => (data.currentPage = value)"
        class="mx-3" />


        <!--Table Task -->
        <!-- <Table
          v-if="showchart == 'appointment'"
          :items="setPages"
          :fields="[
            'Mã KH',
            'Họ tên ',
            'Loại KH',
            'Ngày bắt đầu',
            'Ngày kết thúc',
            'Lịch hẹn',
            'Nội dung',
          ]"
          :labels="[
            'cus_id',
            'cus_name',
            'typ_name',
            'tas_service_start',
            'tas_service_end',
            'app_day',
            'tas_service_content',
          ]"
          :take_care="takeCare"
          @update="getUnit"
          @onDelete="onDelete"
          @detail="detail"
          :name_id="'cus_id'"
        /> -->
        <!--End Table Task -->

        <!--Table Cus -->
        <!-- <Table
          v-if="showchart == 'customer'"
          :items="setPages"
          :fields="['Mã KH', 'Họ tên ', 'Loại KH']"
          :labels="['cus_id', 'cus_name', 'typ_name']"
          :isassign="isassign"
          :assign="assign"
          :showchart="showchart == 'customer'"
          @update="getUnit"
          @onDelete="onDelete"
          @detail="detail"
          :name_id="'cus_id'"
        /> -->
        <!--End Table Cus -->

        <!-- Pagination -->
        <!-- <Pagination
          :numberOfPages="data.numberOfPages"
          :totalRow="data.totalRow"
          :startRow="data.startRow"
          :endRow="data.endRow"
          :currentPage="data.currentPage"
          @updateCurrentPage="(value) => (data.currentPage = value)"
          class="mx-3"
        /> -->
      </div>
      <!--End Detail -->
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