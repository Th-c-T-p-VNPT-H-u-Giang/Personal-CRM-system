<template>
    <div class="border-box d-flex flex-column ml-2">
      <!-- Menu -->
      <div class="d-flex menu my-3 mx-3 justify-content-end">
        <router-link
          to="/report"
          :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
          class="size-18"
        >
          Khách hàng lâu chưa chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_assignment_staff"
          :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
          class="size-18"
        >
          Khách hàng do nhân viên chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_customer_cycle"
          :class="[data.activeMenu == 0 ? 'active-menu' : 'none-active-menu']"
          class="size-18"
        >
          Khách hàng tới chu kì nhưng chưa chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_leader_customer"
          :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
          class="size-18"
        >
          Khách hàng do lảnh đạo phụ trách
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_leader_staff"
          :class="[data.activeMenu == 4 ? 'active-menu' : 'none-active-menu']"
          class="size-18"
        >
          Nhân viên do lảnh đạo phụ trách
        </router-link>
      </div>
      <!-- Filter -->
      <!-- Search -->
      <div class="border-hr mb-3"></div>
      <div class="d-flex justify-content-between mx-3 mb-3">
        <div class="d-flex justify-content-start">
          <!-- <Select
            class="d-flex justify-content-start"
            :options="options"
            @update:entryValue="(value) => (data.entryValue = value)"
            :entryValue="data.entryValue"
          />
          <Search
            class="ml-3"
            style="width: 300px"
            @update:searchText="handleUpdateSearchText"
          /> -->
        </div>
        <div class="d-flex align-items-start">
          <button class="btn btn-warning">
            <span id="delete-all" class="">Mail</span>
          </button>
          <button
            type="button"
            class="btn btn-primary mx-2"
            @click="handlePrintReport"
          >
            <span id="printrp" class="">In</span>
          </button>
        </div>
      </div>
      <!-- Table -->
<!--   
      <table-phuc-report
        :items="setPages"
        :fields="['Nhân Viên', 'Chức Vụ', 'Phòng Ban', 'Lãnh Đạo']"
        :labels="['staff', 'position', 'unit', 'leader']"
        :isLeaderStaff="true"
      /> -->
      <!-- <pagination-phuc
        :numberOfPages="data.numberOfPages"
        :totalRow="data.totalRow"
        :startRow="data.startRow"
        :endRow="data.endRow"
        :currentPage="data.currentPage"
        @update:currentPage="(value) => (data.currentPage = value)"
        class="mx-3"
      /> -->
  
      <div class="container pdf-content" v-show="true" ref="pdfContent">
        <img
          src="../../../../assets/images/vnpt-logo1.png"
          class="rounded-circle"
          alt="Cinque Terre"
          style="height: 70px"
        />
        <div class="d-flex justify-content-between mt-4">
          <p class="text-center ml-4 font-weight-bold">VNPT Hậu Giang</p>
          <div class="text-center font-weight-bold" style="margin-top: -40px">
            <p>CỘNG HÒA XÃ HỘI CHỦ NGHỈA VIỆT NAM</p>
            <p>Độc lập - Tự do - Hạnh phúc</p>
            <p>-----------------</p>
          </div>
        </div>
        <div class="float-right">
          <p>....ngày....tháng....năm</p>
        </div>
        <div class="text-center mt-4 font-weight-bold">
          <h3 class="font-weight-bold">
            Báo Cáo <br> Danh Sách Nhân Viên Do Lãnh Đạo Phụ Trách
          </h3>
        </div>
        <div class="">
          <span>Họ tên</span>
          <br />
          <span>Chức vụ</span>
          <br />
          <span>Bộ phận công tác</span>
        </div>
        <table class="table table-bordered mt-4">
          <thead>
            <tr>
              <th v-for="(value, index) in labels" :key="index">
                {{ value }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data.items" :key="index">
              <td>{{ item._id }}</td>
              <td>{{ item.staff }}</td>
              <td>{{ item.position }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.leader }}</td>
              <!-- <td>{{ item.task }}</td> -->
            </tr>
          </tbody>
        </table>
  
        <div class="d-flex justify-content-around mt-4">
          <p>Phụ trách bộ phận</p>
          <p>Người Báo Cáo</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, computed, ref } from "vue";
//   import Select from "../../../../components/form/select.vue";
//   import PaginationPhuc from "../../../../components/table/pagination-phuc.vue";
//   import Search from "../../../../components/form/search.vue";
//   import TablePhucReport from "../../../../components/table/table-phuc-report.vue";
  import jsPDF from "jspdf"; //in
  import html2canvas from "html2canvas";
  
  export default {
    components: {
    //   Select,
    //   PaginationPhuc,
    //   Search,
    //   TablePhucReport,
    },
    setup() {
      const labels = [
        'STT',
        'Tên nhân viên',
        'Vị trí',
        'Đơn vị',
        'Tên lãnh đạo'
      ]
      const options = [
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
          name: "All",
          value: "All",
        },
      ];
  
      const data = reactive({
        items: [
          {
            _id: "1",
            staff: "Trương Thiết Long",
            position: "Nhân Viên IT",
            unit: "Phòng IT",
            leader: "Phan Văn Rở",
            task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng.",
          },
          {
            _id: "2",
            staff: "Trương Thiết Long1",
            position: "Nhân Viên IT1",
            unit: "Phòng IT1",
            leader: "Phan Văn Rở1",
            task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng.",
          },
          {
            _id: "3",
            staff: "Trương Thiết Long3",
            position: "Nhân Viên IT3",
            unit: "Phòng IT3",
            leader: "Phan Văn Rở3",
            task: "Gọi điện, gửi email hoặc liên lạc trực tuyến với khách hàng.\nQuản lý thông tin khách hàng.\nGiải quyết khiếu nại.\nHỗ trợ kỹ thuật.\nTheo dõi phản hồi khách hàng.",
          },
        ],
        entryValue: 5,
        numberOfPages: 1,
        totalRow: 0,
        startRow: 0,
        endRow: 0,
        currentPage: 1,
        searchText: "",
        activeMenu: 4,
        deleteValue: {
          _id: "",
          nameCT: "",
          nameEM: "",
          date: "",
          cycle: "",
        },
      });
  
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
  
      // methods
      const update = (item) => {
        console.log("updating", item);
      };
  
      const handleUpdateSearchText = (value) => {
        data.searchText = value;
      };
  
      const pdfContent = ref(null);
      const handlePrintReport = () => {
        const doc = new jsPDF();
  
        if (pdfContent.value) {
          const content = pdfContent.value;
  
          // Chuyển đổi nội dung HTML thành ảnh sử dụng html2canvas
          html2canvas(content).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
  
            // Đợi cho hình ảnh tải hoàn toàn trước khi thêm vào tài liệu PDF
            const image = new Image();
            image.onload = function () {
              // Tạo tài liệu PDF và thêm ảnh vào
              const imgWidth = 210; // Đặt chiều rộng ảnh bằng chiều rộng trang A4
              const imgHeight = (canvas.height * imgWidth) / canvas.width; // Tính toán chiều cao dựa trên tỷ lệ
  
              doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Đặt kích thước ảnh là kích thước trang PDFF
  
              // Tải xuống tệp PDF
              doc.save("NhanVienDoLanhDaoPhuTrach.pdf");
            };
  
            // Thiết lập nguồn dữ liệu cho hình ảnh và kích hoạt sự kiện onload
            image.src = imgData;
          });
        }
      };
  
      return {
        options,
        data,
        setPages,
        handleUpdateSearchText,
        handlePrintReport,
        pdfContent,
        labels
      };
    },
  };
  </script>
  
  <style scoped>
  .pdf-content {
    position: absolute;
    left: -9999px;
    top: -9999px;
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
  
  .show-modal {
    display: block;
    opacity: 1;
    background-color: var(--dark);
    /* pointer-events: auto; */
    z-index: 1;
  }
  </style>