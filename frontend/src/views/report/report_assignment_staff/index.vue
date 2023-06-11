<template>
    <div class="border-box d-flex flex-column ml-2">
      <!-- Menu -->
      <div class="d-flex menu my-3 mx-3 justify-content-end">
        <router-link
          to="/report"
          :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']"
        >
          Khách hàng lâu chưa chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_assignment_staff"
          :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
        >
          Khách hàng do nhân viên chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_customer_cycle"
          :class="[data.activeMenu == 0 ? 'active-menu' : 'none-active-menu']"
        >
          Khách hàng tới chu kì nhưng chưa chăm sóc
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_leader_customer"
          :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
        >
          Khách hàng do lảnh đạo phụ trách
        </router-link>
        <div class="mx-1"></div>
        <router-link
          to="/report_leader_staff"
          :class="[data.activeMenu == 4 ? 'active-menu' : 'none-active-menu']"
        >
          Nhân viên do lảnh đạo phụ trách
        </router-link>
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
          <button
            type="button"
            class="btn btn-primary"
            @click="handlePrintReport"
          >
            <span id="printrp" class="mx-2">In</span>
          </button>
        </div>
      </div>
      <!-- Table -->
      <div id="table-rp">
        <TableRp
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
        />
      </div>
      <!-- Pagination -->
      <pagination-phuc
        :numberOfPages="data.numberOfPages"
        :totalRow="data.totalRow"
        :startRow="data.startRow"
        :endRow="data.endRow"
        :currentPage="data.currentPage"
        @update:currentPage="(value) => (data.currentPage = value)"
        class="mx-3"
      />
  
      <div class="container pdf-content" v-show="true" ref="pdfContent">
        <img
          src="../../../assets/images/vnpt-logo1.png"
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
          <h3 class="font-weight-bold">Báo Cáo <br> Danh Sách Khách Hàng Thuộc Nhân Viên Phụ Trách</h3>
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
              <td>{{ item.customers }}</td>
              <td>{{ item.customerstype }}</td>
              <td>{{ item.staff }}</td>
              <td>{{ item.startdate }}</td>
              <td>{{ item.enddate }}</td>
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
  import { useRouter } from "vue-router";
  import TableRp from "../../../components/table/table_rp_long.vue";
  import PaginationPhuc from "../../../components/table/pagination-phuc.vue";
  import jsPDF from "jspdf";
  import html2canvas from "html2canvas";
  import Select from "../../../components/form/select.vue";
  import Search from "../../../components/form/search.vue";
  
  export default {
    components: {
      TableRp,
      PaginationPhuc,
      Select,
      Search,
    },
    setup(ctx) {
      const labels = [
        'STT',
        'Tên khách hàng',
        'Loại khách hàng',
        'Tên nhân viên',
        'Ngày bắt đầu',
        'Ngầy kết thúc'
      ]
  
  
      const data = reactive({
        items: [
          {
            _id: "1",
            customers: "Trần Tuyết Mỹ",
            customerstype: "VIP",
            staff: "Trương Thiết Long",
            startdate: "20/09/2022",
            enddate: "11/03/2025",
            appointment:
              "Name:Service Advisory\nDate: June 1, 2023\nTime: 10:00 AM - 11:00 AM\nLocation: Office A",
            content:
              "Theo dõi khách hàng\nChủ động phục vụ khách hàng\nCó chính sách ưu đãi cho khách hàng trung thành\nGiải quyết nhanh chóng khiếu nại của khách hàng",
          },
          {
            _id: "2",
            customers: "Nguyễn Thị Vân Anh",
            customerstype: "VIP",
            staff: "Trương Thiết Long",
            startdate: "20/02/2023",
            enddate: "11/03/2024",
            content: "Định kỳ gửi thông tin",
            appointment:
              "Name:Service Advisory\nDate: June 1, 2023\nTime: 15:00 PM - 16:00 PM\nLocation: The Coffee House",
            content:
              "Theo dõi khách hàng\nChủ động phục vụ khách hàng\nCó chính sách ưu đãi cho khách hàng trung thành\nGiải quyết nhanh chóng khiếu nại của khách hàng",
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
  
      const pdfContent = ref(null);
      const handlePrintReport = async () => {
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
              doc.save("BaoCaoKhachHangThuocNhanVienPhuTrach.pdf");
            };
  
            // Thiết lập nguồn dữ liệu cho hình ảnh và kích hoạt sự kiện onload
            image.src = imgData;
          });
        }
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
        router.push({ name: "ReportAssignmentView", params: { id: _id } });
      };
      return {
        data,
        setPages,
        view,
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
  </style>