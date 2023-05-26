<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <a
        @click="data.activeMenu = 1"
        :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
        href="./report"
        >Phân Công</a
      >
      <a
        @click="data.activeMenu = 2"
        :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
        href="./staffassignedbyleader"
        >Lãnh Đạo</a
      >
    </div>
   
    <!-- Filter -->
    <!-- Search -->
    <div class="border-hr mb-3"></div>
    <div class="d-flex justify-content-between mx-3 mb-3">
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
            {
              name: 'All',
              value: 'All',
            },
          ]"
          @update:entryValue="(value) => (data.entryValue = value)"
          :entryValue="data.entryValue"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="(value) => (data.searchText = value)"
        />
      </div>
      <div class="d-flex align-items-start">
        <button type="button" class="btn btn-primary" @click="printReport">
          <span id="printrp" class="mx-2">In</span>
        </button>
      </div>
    </div>
    <!-- Table -->
    <div id="table-rp">
      <TableRp
        :items="setPages"
        :fields="[
          'Nhân Viên',
          'Chức Vụ',
          'Phòng Ban',
          'Lãnh Đạo'
        ]"
        :labels="[
          'staff',
          'position',
          'unit',
          'leader',
        ]"
        @visibility="
          (value, value1) => (
            (data.viewValue = value), (data.activeView = value1)
          )
        "
      />
    </div>
    <!-- Pagination -->
    <Pagination
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3"
    />
    <ViewRp
      :item="data.viewValue"
      :class="[data.activeView ? 'show-modal' : 'd-none']"
      @cancel="data.activeView = false"
    />
  </div>
</template>
<script>
import TableRp from "../../components/table/table_rp_long.vue";
import Pagination from "../../components/table/pagination_duy.vue";
import Select from "../../components/form/select.vue";
import Search from "../../components/form/search.vue";
import { reactive, computed } from "vue";
import jsPDF from "jspdf"; //in
import ViewRp from "./View_qlnv.vue";
import "jspdf-autotable";
import fontFile from "../../assets/arial.ttf";
export default {
  components: {
    TableRp,
    Pagination,
    Select,
    Search,
    ViewRp,
  },
  setup(ctx) {
    const data = reactive({
      items: [
        {
          _id: "1",
          staff: "Trương Thiết Long",
          position: "Nhân Viên IT",
          unit: "Phòng IT",
          leader: "Phan Văn Rở",
          task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng."
        },
        {
          _id: "2",
          staff: "Trương Thiết Long1",
          position: "Nhân Viên IT1",
          unit: "Phòng IT1",
          leader: "Phan Văn Rở1",
          task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng."
        },
        {
          _id: "3",
          staff: "Trương Thiết Long3",
          position: "Nhân Viên IT3",
          unit: "Phòng IT3",
          leader: "Phan Văn Rở3",
          task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng."
        },
      ],
      entryValue: 5,
      numberOfPages: 1,
      totalRow: 0,
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 2,
    });

    // ...

    const printReport = () => {
      const doc = new jsPDF();
      doc.addFont(fontFile, "Arial", "normal");
      // Define the column headers
      const columns = [
        { header: "ID", dataKey: "id" },
        { header: "Nhân Viên", dataKey: "staff" },
        { header: "Chức Vụ", dataKey: "position" },
        { header: "Phòng Ban", dataKey: "unit" },
        { header: "Lãnh Đạo", dataKey: "leader" },
      ];
      doc.setFont("Arial"); // Set the active font
      doc.setFontSize(12);
      doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: data.items.map((item) => Object.values(item)),
        startY: 20,
        styles: {
          font: "Arial",
          fontSize: 12,
        },
      });
      // Save the PDF file
      doc.save("vietnamese_table.pdf");
    };

    // ...

    // computed
    const toString = computed(() => {
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [value.staff].join("").toLocaleLowerCase();
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
      return filtered.value.filter((item, index) => {
        return (
          index + 1 > (data.currentPage - 1) * data.entryValue &&
          index + 1 <= data.currentPage * data.entryValue
        );
      });
    });

    return {
      data,
      setPages,
      printReport,
    };
  },
};
</script>

<style scoped>
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
</style>
