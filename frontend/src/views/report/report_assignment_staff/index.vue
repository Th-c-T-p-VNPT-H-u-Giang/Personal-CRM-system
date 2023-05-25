<template>
    <div class="border-box d-flex flex-column ml-2">
      <!-- Menu -->
      <div class="d-flex menu my-3 mx-3 justify-content-end">
        <a
          @click="data.activeMenu = 1"
          :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
          href="./report"
          >Báo Cáo Phân Công</a
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
        <!-- <TableRp
          :items="setPages"
          :fields="[
            'Khách Hàng',
            'Loại Khách Hàng',
            'Nhân Viên',
            'Ngày Bắt Đầu',
            'Ngày Kết Thúc',
          ]"
          :labels="[
            'customers',
            'customerstype',
            'staff',
            'startdate',
            'enddate',
          ]"
          @view="(value) => view(value)"
        /> -->
      </div>
      <!-- Pagination -->
      <!-- <Pagination
        :numberOfPages="data.numberOfPages"
        :totalRow="data.totalRow"
        :startRow="data.startRow"
        :endRow="data.endRow"
        :currentPage="data.currentPage"
        @update:currentPage="(value) => (data.currentPage = value)"
        class="mx-3"
      /> -->
    </div>
  </template>
  <script>
import { reactive } from 'vue';

  export default {
    components: {
    },
    setup(ctx) {
      const data = reactive({
        items: [
          {
            _id: "1",
            customers: "Trần Tuyết Mỹ",
            customerstype: "VIP",
            staff: "Trương Thiết Long",
            startdate: "20/09/2022",
            enddate: "11/03/2025",
          },
          {
            _id: "2",
            customers: "Nguyễn Thị Vân Anh",
            customerstype: "VIP",
            staff: "Trương Thiết Long",
            startdate: "20/02/2023",
            enddate: "11/03/2024",
          },
        ],
        entryValue: 5,
        numberOfPages: 1,
        totalRow: 0,
        startRow: 0,
        endRow: 0,
        currentPage: 1,
        searchText: "",
        activeMenu: 1,
      });
  
      const printReport = () => {
        const table = document.getElementById("table-rp");
  
        // Chụp nội dung HTML thành ảnh sử dụng html2canvas
        html2canvas(table).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
  
          // Tạo tài liệu PDF và thêm ảnh vào
          const doc = new jsPDF({
            format: "a4",
          });
          const imgWidth = 240; // Đặt chiều rộng ảnh bằng chiều rộng trang A4
          const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tính toán chiều cao dựa trên tỷ lệ
  
          doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Đặt kích thước ảnh là kích thước trang PDF
          // Tải xuống tệp PDF
          doc.save("report.pdf");
        });
      };
  
      // computed
      const toString = computed(() => {
        console.log("Starting search");
        return data.items.map((value, index) => {
          return [value.customers].join("").toLocaleLowerCase();
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
      const router = useRouter();
  
      const view = (_id) => {
        console.log("view", _id);
        router.push({ name: "RpAssignedStaff", params: { id: _id } });
      };
      return {
        data,
        setPages,
        view,
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