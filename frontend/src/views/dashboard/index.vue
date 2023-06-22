<script>
import { ref, reactive, computed, watch, onMounted } from "vue";
import VueApexCharts from "vue3-apexcharts";
import Table from "../../components/table/table_dash_lananh.vue";

import Pagination from "../../components/table/pagination_duy.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import Box from "../../components/box_lananh/box.vue";
import SelectOption from "../../components/box_lananh/select.vue";
import {
  Customer,
  Customer_Types,
  http_getAll,
  Task,
  Evaluate,
  Status_Task,
  Cycle,
  http_getOne,
  alert_success,
} from "../common/import";
import { Select_Advanced } from "../common/import";

export default {
  components: {
    apexchart: VueApexCharts,
    Table,
    Pagination,
    Search,
    Select,
    Box,
    SelectOption,
    Select_Advanced,
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
      lengthCustomer: 0,
      task: {},
      evaluate: {},
      statusTask: {},
      cycle: {},
      modelCycle: "tuần",
      progress: 0,
      task: [],
      days: 0,
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
      if (data.items.length > 0) {
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
      } else return data.items.value;
    });

    //refresh
    const refresh = async () => {
      data.customerType = await http_getAll(Customer_Types);
      data.customer = await http_getAll(Customer);
      data.lengthCustomer = data.customer.documents.length;
      data.task = await http_getAll(Task);
      data.evaluate = await http_getAll(Evaluate);
      data.statusTask = await http_getAll(Status_Task);
      data.task = await http_getAll(Task);
      abc("6 tháng");
      abc("1 năm");
      data.cycle = [
        { _id: "tuần", name: "tuần" },
        { _id: "tháng", name: "tháng" },
        { _id: "quý", name: "quý" },
        { _id: "năm", name: "năm" },
      ];
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
    const selectedOptionCycle = ref(""); //cycle
    const customerChart = ref(false);
    const appointmentChart = ref(true);
    const showchart = ref("appointment");

    //biểu đồ tròn của loại khách hàng
    const chartOptionsCustomerType = reactive({
      chart: {
        type: "pie",
      },
      labels: [],
      series: [],
      colors: ["#9FD7F0", "#3300cc", "#1CA7EC"],
    });
    const chartSeriesCustomerType = ref([]);

    //STAR
    //chart số lượng khách hàng đã phân công
    const chartOptionsStar = reactive({
      chart: {
        type: "pie", // Thay đổi loại biểu đồ thành "line"
      },
      labels: [],
      series: [],
      colors: ["#FFDD94", "#FD8F52", "#FFd700", "#FFC125", "#EEAD0F"],
    });
    const chartSeriesStar = ref([]);

    //bar chart , 3 trạng thái
    const chartOptionsAppointment = reactive({
      chart: {
        id: "basic-bar",
        type: "bar",
      },
      xaxis: {
        categories: ["Trạng thái"],
      },
      colors: ["rgb(255, 99, 132)", "#3300cc", "rgb(250, 90, 80)"],
    });
    const chartSeriesAppointment = reactive({
      data: [
        {
          name: "",
          data: [],
        },
      ],
    });
    //
    const chartOptionsAppointment1 = reactive({
      chart: {
        type: "pie", // Thay đổi loại biểu đồ thành "line"
      },
      labels: [],
      series: [],
      colors: ["#FFDD94", "#FD8F52", "#FFd700", "#FFC125", "#EEAD0F"],
    });
    const chartSeriesAppointment1 = ref([]);
    //Map tính lại chu kỳ tiếp theo cho tất cả trường hợp chu kỳ
    const abc = (nameCycle) => {
      var tach = nameCycle.split(" ");
      var so = tach[0];
      var chu = tach[1];
      var endDate = new Date();
      switch (chu) {
        case "tuần": {
          var daysToAdd = so * 7;
          var startDate = new Date("2023-12-31");
          endDate = new Date(
            startDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
          );
          console.log(
            "chu kỳ:",
            daysToAdd,
            "ngày tới chu kỳ:",
            endDate.toDateString()
          );
          break;
        }
        case "tháng": {
          var monthsToAdd = so;
          var startDate = new Date("2023-12-29");
          endDate = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + so,
            startDate.getDate()
          );
          //tháng 12
          if (startDate.getMonth() === 11) {
            var endDate = new Date(
              startDate.getFullYear() + 1,
              so - 1,
              startDate.getDate()
            );
          }
          console.log(
            "chu kỳ:",
            monthsToAdd + " tháng",
            "ngày tới chu kỳ:",
            endDate
          );
          break;
        }
        case "năm": {
          var yearsToAdd = so;
          var startDate = new Date("2023-01-29");

          endDate = new Date(
            startDate.getFullYear() + 1,
            startDate.getMonth(),
            startDate.getDate()
          );

          console.log(
            "chu kỳ:",
            yearsToAdd + " năm",
            "ngày tới chu kỳ:",
            endDate.toDateString()
          );
          break;
        }
      }
      console.log("KQ:", endDate);
    };
    const isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    // Lấy ngày cuối cùng của tháng
    const getLastDayOfMonth = (month, year) => {
      var date = new Date(year, month + 1, 0);
      return date.getDate();
    };
    // khởi tạo biểu đồ khi thay đổi lựa chọn tuần, ...
    const initChart = async (start, end) => {
      await refresh();
      data.progress = 0;
      data.task = data.task.filter((value, index) => {
        return value.start_date >= start && value.start_date <= end;
      });
      data.task = data.task.filter((item) => {
        return item.start_date >= start && item.start_date <= end;
      });
      console.log(data.task);
      for (let i = 0; i < data.statusTask.length; i++) {
        var count = 0;
        chartOptionsAppointment1.labels[i] = data.statusTask[i].name;
        chartSeriesAppointment1.value[i] = 0;

        for (let task of data.task) {
          if (task.StatusTaskId == data.statusTask[i]._id) {
            count++;
            chartSeriesAppointment1.value[i]++;
          }
        }
        if (data.statusTask[i].name == "đã chăm sóc") {
          data.progress = count;
        }

        chartSeriesAppointment.data[i] = {
          name: data.statusTask[i].name,
          data: [count],
        };
      }
      for (let i = 0; i < data.customerType.documents.length; i++) {
        chartOptionsCustomerType.labels[i] =
          data.customerType.documents[i].name;
        chartSeriesCustomerType.value[i] = 0;

        for (let j = 0; j < data.customer.documents.length; j++) {
          if (
            data.customerType.documents[i]._id ==
            data.customer.documents[j].customerTypesId
          ) {
            chartSeriesCustomerType.value[i]++;
          }
        }
      }
      data.progress = (data.progress / data.task.length) * 100;
      data.progress = data.progress.toFixed(2);
    };
    const show = async (nameChart, cycle) => {
      if (nameChart == "customer") {
        console.log("show chart customer");
        for (let i = 0; i < data.customerType.documents.length; i++) {
          chartOptionsCustomerType.labels[i] =
            data.customerType.documents[i].name;
          chartSeriesCustomerType.value[i] = 0;

          for (let j = 0; j < data.customer.documents.length; j++) {
            if (
              data.customerType.documents[i]._id ==
              data.customer.documents[j].customerTypesId
            ) {
              chartSeriesCustomerType.value[i]++;
            }
          }
        }
        for (let i = 0; i < data.evaluate.length; i++) {
          chartOptionsStar.labels[i] = data.evaluate[i].star;
          chartSeriesStar.value[i] = 0;
          for (let task of data.task) {
            if (task.EvaluateId == data.evaluate[i]._id) {
              chartSeriesStar.value[i]++;
            }
          }
        }
      } else if (nameChart == "appointment") {
        // var dataCycle = await http_getOne(Cycle, cycle);
        switch (cycle) {
          case "tuần": {
            console.log("weak+appointment");
            const week = getCurrentWeekDays();
            const firstDayOfWeek = week[0];
            const lastDayOfWeek = week[week.length - 1];
            initChart(firstDayOfWeek, lastDayOfWeek);
            break;
          }
          case "tháng": {
            console.log("month+appointment");
            const currentMonthDates = getCurrentMonthDates();
            console.log("Ngày bắt đầu của tháng:", currentMonthDates.start);
            console.log("Ngày kết thúc của tháng:", currentMonthDates.end);
            initChart(currentMonthDates.start, currentMonthDates.end);
            break;
          }
          case "quý": {
            console.log("aquarter+appointment");
            const currentQuarterDates = reactive({ data: {} });
            currentQuarterDates.data = getCurrentQuarterDates();
            initChart(
              currentQuarterDates.data.start,
              currentQuarterDates.data.end
            );
          }
          case "năm": {
            const getCurrentYearDates = getCurrentYear();
            initChart(getCurrentYearDates.start, getCurrentYearDates.end);
          }
        }
        console.log("chart appointment:", chartSeriesAppointment.data);
      } else if (nameChart == "customerCycle") {
        // alert_success("khách hàng gần tới chu kỳ", "");
      }
    };

    //Lấy tuần
    const getCurrentWeekDays = () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay(); // Lấy số thứ tự của ngày hiện tại (0 - Chủ nhật, 1 - Thứ 2, ..., 6 - Thứ 7)
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDay + 1); // Đặt ngày đầu tiên của tuần là ngày hiện tại trừ đi số ngày từ ngày đầu tuần đến ngày hiện tại và cộng thêm 1 ngày để đảm bảo nó là ngày thứ 2
      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(firstDayOfWeek);
        date.setDate(firstDayOfWeek.getDate() + i); // Đặt ngày tiếp theo của tuần bằng cách thêm i ngày từ ngày đầu tuần
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Thêm '0' vào đầu nếu tháng chỉ có 1 chữ số
        const day = date.getDate().toString().padStart(2, "0"); // Thêm '0' vào đầu nếu ngày chỉ có 1 chữ số
        const formattedDate = `${year}-${month}-${day}`;
        weekDays.push(formattedDate);
      }
      return weekDays;
    };
    //Tháng hiện tại
    const getCurrentMonthDates = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

      const formattedFirstDay = formatDate(firstDayOfMonth);
      const formattedLastDay = formatDate(lastDayOfMonth);

      return {
        start: formattedFirstDay,
        end: formattedLastDay,
      };
    };
    //Quý hiện tại
    const getCurrentQuarterDates = () => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;

      const firstDayOfQuarter = new Date(
        currentYear,
        (currentQuarter - 1) * 3,
        1
      );
      const lastDayOfQuarter = new Date(currentYear, currentQuarter * 3, 0);

      const formattedFirstDay = formatDate(firstDayOfQuarter);
      const formattedLastDay = formatDate(lastDayOfQuarter);

      return {
        start: formattedFirstDay,
        end: formattedLastDay,
      };
    };
    const getCurrentYear = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear(); // Lấy năm hiện tại

      // Lấy ngày bắt đầu của năm hiện tại
      const startDate = new Date(year, 0, 1); // Tháng được đánh số từ 0 (0 - Tháng 1, 1 - Tháng 2, ..., 11 - Tháng 12)
      const formattedStartDate = startDate.toISOString().slice(0, 10);

      // Lấy ngày kết thúc của năm hiện tại
      const endDate = new Date(year, 11, 31);
      const formattedEndDate = endDate.toISOString().slice(0, 10);

      return { start: formattedStartDate, end: formattedEndDate };
    };
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");

      return `${year}-${month}-${day}`;
    };
    // watch selectOptionCycle
    watch(selectedOptionCycle, (newValue, oldValue) => {
      console.log("Dropdown value changed cycles:", newValue);
      show(showchart.value, newValue);
    });
    //Watch chart
    watch(showchart, (newValue, oldValue) => {
      console.log("namechart:", showchart.value);
      show(showchart.value, selectedOptionCycle.value);
    });
    onMounted(async () => {
      await refresh();
      const week = getCurrentWeekDays();
      const firstDayOfWeek = week[0];
      const lastDayOfWeek = week[week.length - 1];
      data.task = data.task.filter((value, index) => {
        return (
          value.start_date >= firstDayOfWeek &&
          value.start_date <= lastDayOfWeek
        );
      });

      for (let i = 0; i < data.statusTask.length; i++) {
        var count = 0;
        chartOptionsAppointment1.labels[i] = data.statusTask[i].name;
        chartSeriesAppointment1.value[i] = 0;
        for (let task of data.task) {
          if (task.StatusTaskId == data.statusTask[i]._id) {
            count++;
            chartSeriesAppointment1.value[i]++;
          }
          if (data.statusTask[i].name == "đã chăm sóc") {
            data.progress = count;
          }
        }
        chartSeriesAppointment.data[i] = {
          name: data.statusTask[i].name,
          data: [count],
        };
      }

      data.progress = (data.progress / data.task.length) * 100;
      data.progress = data.progress.toFixed(2);
    });

    //****
    watch(takeCare, (newValue, oldValue) => {
      console.log("takecare", newValue);
    });
    return {
      data,
      overview,
      detail,
      takeCare,
      setPages,
      selectedOptionCycle,
      showchart,
      customerChart,
      appointmentChart,
      assign,
      isassign,
      chartOptionsCustomerType,
      chartSeriesCustomerType,
      chartOptionsStar,
      chartSeriesStar,

      chartOptionsAppointment,
      chartSeriesAppointment,
      chartOptionsAppointment1,
      chartSeriesAppointment1,
    };
  },
};
</script>
<template>
  <div class="border-box">
    <!-- select_option - overview+detail -->
    <div class="d-flex my-2 menu justify-content-end" style="border: none">
      <!-- select cycles -->
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
          class="btn mr-4"
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
      :customer="data.lengthCustomer"
      :progress="data.progress"
    ></Box>

    <!-- search, select, take care -->
    <div class="row justify-content-between" v-if="detail">
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
              (entryNameStatusTask = 'Trạng thái'),
                updateEntryValueStatusTask('')
            "
            style="height: 35px"
          />
        </div>
      </div>
      <!--  -->
      <div class="col-6 row justify-content-end mr-2">
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
      </div>
    </div>

    <!--CHART -->
    <div class="float-right mx-4" style="width: 100px">
      <Select_Advanced
        required
        :options="data.cycle"
        :modelValue="data.modelCycle"
        style="height: 40px"
        @searchSelect="
          async (value) => (
            await refresh(),
            (data.cycle = data.cycle.filter((value1, index) => {
              console.log(value1, value);
              return value1.name.includes(value) || value.length == 0;
            })),
            console.log('searchSlect', value.length)
          )
        "
        @chose="
          (value, value1) => (
            (selectedOptionCycle = value), (data.modelCycle = value1.name)
          )
        "
      />
    </div>
    <div class="mb-5 p-0 mx-4">
      <div class="mt-2" v-if="showchart == 'appointment'">
        <!-- CYCLE -->

        <!--Chart Appointment -->
        <div class="mt-5" v-if="overview && showchart == 'appointment'">
          <div class="border-box">
            <h5 class="text-center mt-2">
              Biểu đồ thể hiện trạng thái chăm sóc
            </h5>
            <apexchart
              :options="chartOptionsAppointment"
              :series="chartSeriesAppointment.data"
              v-if="overview && showchart == 'appointment'"
              height="400"
            />
          </div>
          <div class="mt-3 border-box">
            <apexchart
              class="mt-5"
              :options="chartOptionsAppointment1"
              :series="chartSeriesAppointment1"
              v-if="overview && showchart == 'appointment'"
              height="400"
            />
          </div>
        </div>
      </div>

      <!--Chart Customer -->
      <div
        class="row justify-content-around"
        v-if="overview && showchart == 'customer'"
      >
        <div class="col-6 mb-4">
          <div
            class="card border-left-primary shadow h-100 py-2"
            :class="{ 'box-active': name == 'customer' }"
          >
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <h5 class="mb-1">Biểu đồ phân loại khách hàng</h5>
                  <!-- Tròn -->
                  <apexchart
                    class=""
                    :options="chartOptionsCustomerType"
                    :series="chartSeriesCustomerType"
                    v-if="overview && showchart == 'customer'"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-6 mb-4">
          <div class="card border-left-primary shadow h-100 py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <!-- tròn sao -->
                  <h5 class="mb-1">Biểu đồ đánh giá của khách hàng</h5>
                  <apexchart
                    class=""
                    :options="chartOptionsStar"
                    :series="chartSeriesStar"
                    v-if="overview && showchart == 'customer'"
                    height="400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- End Chart -->

      <!--Detail -->
      <div v-if="detail">
        <h4 class="text-center my-2">Danh sách khách hàng</h4>
        <!--Table Task -->
        <Table
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
        />
        <!--End Table Task -->

        <!--Table Cus -->
        <Table
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
        />
        <!--End Table Cus -->

        <!-- Pagination -->
        <Pagination
          :numberOfPages="data.numberOfPages"
          :totalRow="data.totalRow"
          :startRow="data.startRow"
          :endRow="data.endRow"
          :currentPage="data.currentPage"
          @updateCurrentPage="(value) => (data.currentPage = value)"
          class="mx-3"
        />
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
