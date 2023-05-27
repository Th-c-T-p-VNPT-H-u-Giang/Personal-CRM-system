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
          :options="options"
          @update:entryValue="handleUpdateEntryValue"
          :entryValue="data.entryValue"
        />
        <Search
          class="ml-3"
          style="width: 300px"
          @update:searchText="handleUpdateSearchText"
        />
      </div>
      <div class="d-flex align-items-start">
        <button
          type="button"
          class="btn btn-primary"
          @click="handlePrintReport"
        >
          <span id="add" class="mx-2">In</span>
        </button>
      </div>
    </div>

    <!-- Table -->
    <table-phuc-report
      id="table-report"
      :fields="['Tên', 'Email', 'Địa chỉ', 'Lần sử dụng gần nhất']"
      :items="setPages"
      :labels="['name', 'email', 'address', 'recent_using']"
      :isCustomerLongTime="true"
    />
    <!-- <table :fields="['Name','Email', 'Address', 'Work', 'Type']"
        :labels="['name', 'email', 'address', 'wor_current_position', 'type']" :items="setPages" :nameRoute="'report'" :isReport="true"/> -->
    <!-- Pagination -->
    <pagination-phuc
      :numberOfPages="data.numberOfPages"
      :totalRow="data.totalRow"
      :startRow="data.startRow"
      :endRow="data.endRow"
      :currentPage="data.currentPage"
      @update:currentPage="(value) => (data.currentPage = value)"
    />

    <div class="container pdf-content" ref="pdfContent">
      <img
        src="../../assets/images/vnpt-logo1.png"
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
        <h3 class="font-weight-bold text-center">
          Báo Cáo <br> Danh Sách Khách Hàng Đã Lâu Chưa Chăm Sóc
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
            <th v-for="(value, index) in labels" :key="index">{{ value }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.items" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.recent_using }}</td>
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
import PaginationPhuc from "../../components/table/pagination-phuc.vue";
import Search from "../../components/form/search.vue";
import Select from "../../components/form/select.vue";
import TablePhucReport from "../../components/table/table-phuc-report.vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  components: { PaginationPhuc, Search, Select, TablePhucReport },
  setup() {
    let shortDate_1 = new Date("2021-08-08");

    const labels = [
      "STT",
      "Tên khách hàng",
      "Email khách hàng",
      "SDT khách hàng",
      "Lần cuối sử dụng dịch vụ",
    ];

    const data = reactive({
      items: [
        {
          id: 1,
          name: "Dang Van Phuc",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 2,
          name: "Pham Thanh Phong",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 3,
          name: "Nguyen Anh Nam",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 4,
          name: "Le Quoc Thinh",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 5,
          name: "Vo Van Thach",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 6,
          name: "Tran Minh Sang",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
        {
          id: 7,
          name: "Nguyen Hoang Trong Tien",
          birthdate: shortDate_1,
          address: "Dong Thap",
          phone: "039977732",
          email: "phuc@gmail.com",
          type: "VIP",
          avatar:
            "https://i.pinimg.com/736x/ed/80/f7/ed80f704afb25270ea9dac456da6407a.jpg",
          wor_current_workplace: "CTU",
          wor_work_history: "VNPT",
          wor_current_position: "Student",
          recent_using: "20-10-2020",
          wor_work_temp: "HKII",
        },
      ],
      entryValue: 5, // total record in page
      numberOfPages: 1,
      totalRow: 0, // total row data
      startRow: 0,
      endRow: 0,
      currentPage: 1,
      searchText: "",
      activeMenu: 2,
    });

    const options = reactive([
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
        value: 9999,
      },
    ]);

    // handle update entry value
    const handleUpdateEntryValue = (value) => {
      data.entryValue = value;
    };

    //handle update search text
    const handleUpdateSearchText = (value) => {
      data.searchText = value;
    };
    // // handle pagination
    const toString = computed(() => {
      return data.items.map((value, index) => {
        return [value.name].join("").toLocaleLowerCase(); // convert to array having is string
        // Example: ['Dang Van Phuc', 'Pham Thanh Phong', 'Nguyen Anh Nam', 'Le Quoc Thinh', 'Vo Van Thach', 'Tran Minh Sang', 'Nguyen Hoang Trong Tien']
      });
    });

    const filter = computed(() => {
      // filter array  objects having search text
      return data.items.filter((value, index) => {
        return toString.value[index].includes(
          data.searchText.toLocaleLowerCase() //
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
    }); // get total pages

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

    // handle print data
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
            doc.save("DanhSachKhachHangLauChuaChamSoc.pdf");
          };

          // Thiết lập nguồn dữ liệu cho hình ảnh và kích hoạt sự kiện onload
          image.src = imgData;
        });
      }
    };
    return {
      data,
      setPages,
      options,
      handleUpdateEntryValue,
      handleUpdateSearchText,
      handlePrintReport,
      labels,
      pdfContent,
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
  