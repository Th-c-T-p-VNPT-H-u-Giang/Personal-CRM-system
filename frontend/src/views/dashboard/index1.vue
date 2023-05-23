<template>
  <div class="border-box">
    <div class="m-3 d-flex menu justify-content-end">
      <select class="pl-2" v-model="selectedOption" style="padding: 5px">
        <option disabled selected hidden value="cycles">Cycles</option>
        <option value="weak">Weak</option>
        <option value="month">Month</option>
        <option value="quarter">Quarter</option>
        <option value="year">Year</option>
      </select>
    </div>
    <div class="border-hr mb-3"></div>

    <div class="m-3 d-flex menu justify-content-end">
      <button
        class="btn"
        @click="
          () => {
            detail = false;
            overview = true;
          }
        "
        :class="{ 'btn-primary': overview }"
      >
        Overview
      </button>
      <button
        class="btn"
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
    <div class="mb-5 mx-2">
      <!-- <h1 class="text-center mb-5 mt-2">REPORT</h1> -->
      <apexchart
        :options="chartOptions"
        :series="chartSeries"
        v-if="overview"
        type="bar"
        height="400"
      />
      <div v-if="detail">
        <div class="float-right my-2">
          <button
            class="btn"
            :class="{ 'btn-primary': !takeCare }"
            @click="takeCare = !takeCare"
          >
            Uncare</button
          ><button
            class="btn"
            :class="{ 'btn-primary': takeCare }"
            @click="takeCare = !takeCare"
          >
            Cared
          </button>
        </div>
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

<script>
import { ref, reactive, computed, watch } from "vue";
import VueApexCharts from "vue3-apexcharts";
import Table from "./table/table_dash.vue";
import Pagination from "../unit/form_table/pagination_lananh.vue";

export default {
  components: {
    apexchart: VueApexCharts,
    Table,
    Pagination,
  },
  setup() {
    const chartOptions = ref({
      chart: {
        id: "basic-bar",
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
    });

    const chartSeries = ref([
      {
        name: "Series 1",
        data: [30, 40, 45, 50, 49, 60, 70],
      },
      {
        name: "Series 2",
        data: [10, 50, 65, 20, 19, 65, 72],
      },
    ]);
    // Data
    const data = reactive({
      items: [
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
      ],
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
    const selectedOption = ref("cycles");
    watch(selectedOption, (newValue, oldValue) => {
      console.log("Dropdown value changed:", newValue);
      // if (newValue != "cycles")
      // router.push({ name: "unit_level", params: { id: newValue } });
      // else if (newValue == "all") router.push({ name: "Unit" });
      // ****
      // selectedOption.value = "cycles";
    });
    return {
      chartOptions,
      chartSeries,
      data,
      overview,
      detail,
      takeCare,
      setPages,
      selectedOption,
    };
  },
};
</script>
<style>
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
