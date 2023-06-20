<template>
  <div class="border-box d-flex flex-column ml-2">
    <!-- Menu -->
    <div class="d-flex menu my-3 mx-3 justify-content-end">
      <router-link to="/report" :class="[data.activeMenu == 2 ? 'active-menu' : 'none-active-menu']" class="size-18">
        Khách hàng lâu chưa chăm sóc
      </router-link>
      <div class="mx-1"></div>
      <router-link to="/report_assignment_staff" :class="[data.activeMenu == 1 ? 'active-menu' : 'none-active-menu']"
        class="size-18">
        Khách hàng do nhân viên chăm sóc
      </router-link>
      <div class="mx-1"></div>
      <router-link to="/report_customer_cycle" :class="[data.activeMenu == 0 ? 'active-menu' : 'none-active-menu']"
        class="size-18">
        Khách hàng tới chu kì nhưng chưa chăm sóc
      </router-link>
      <div class="mx-1"></div>
      <router-link to="/report_leader_customer" :class="[data.activeMenu == 3 ? 'active-menu' : 'none-active-menu']"
        class="size-18">
        Khách hàng do lảnh đạo phụ trách
      </router-link>
      <div class="mx-1"></div>
      <router-link to="/report_leader_staff" :class="[data.activeMenu == 4 ? 'active-menu' : 'none-active-menu']"
        class="size-18">
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
            @update:entryValue="handleUpdateEntryValue"
            :entryValue="data.entryValue"
          /> -->
        <!-- <Search
            class="ml-3"
            style="width: 300px"
            @update:searchText="handleUpdateSearchText"
          /> -->
      </div>
      <div class="d-flex align-items-start">
        <button class="btn btn-warning mx-2">
          <span id="delete-all" class="">Mail</span>
        </button>
        <button type="button" class="btn btn-primary" @click="handlePrintReport">
          <span id="add" class="">In</span>
        </button>
      </div>
    </div>

    <!-- Table -->
    <Table :items="data.items" :fields="['Tên', 'Email', 'Sdt', 'Công việc', 'Công ty', 'Loại khách hàng']"
      :labels="['nameCustomer', 'emailCustomer', 'phoneCustomer', 'current_position', 'nameCompany', 'nameCustomerType']"
      @delete="handleDelete" @edit="EditEmit" :showActionList="[true, false, false]" :startRow="0" @view="view"
      :isActiveCheckbox='false' />
    <!-- Pagination -->
    <Pagination :numberOfPages="data.numberOfPages" :totalRow="data.totalRow" :startRow="data.startRow"
      :endRow="data.endRow" :currentPage="data.currentPage" @update:currentPage="(value) => (data.currentPage = value)"
      class="mx-3" />
    

    <div class="container pdf-content" ref="pdfContent">
      <img src="../../assets/images/vnpt-logo1.png" class="rounded-circle" alt="Cinque Terre" style="height: 70px" />
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
    <!-- <view /> -->
    <div class="modal" id="model-view">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Thông tin chi tiết khách hàng</h4>
          <button type="button" class="close" data-dismiss="modal">
            &times;
          </button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
        </div>
      </div> 
    </div>
  </div>
  </div>

</template>
    
<script>
import { reactive, computed, ref, onBeforeMount } from "vue";
import Table from '../../components/table/table-report.vue'
import view from './modal/view-report.vue'
import {
  http_getAll,
  Pagination,
  Select,
  Search,
  Customer_Work,
} from "../common/import";


import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  components: {
    Table,
    Pagination,
    Select,
    Search,
    view
  },
  setup() {
    const data = reactive({
      items: [],
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



    const reFresh = async () => {
      const cusWork = await http_getAll(Customer_Work);
      data.items = cusWork.documents.filter((cusWork) => {
        const taskCusCared = cusWork.Customer.Tasks.filter((task) => {
          if (task.Status_Task.name == 'đã chăm sóc') {
            const cycle = task.Cycle.name
            let end_date = task.end_date
            // console.log(end_date);
            end_date = new Date(end_date)
            // console.log('end_date: ' + end_date);

            let numberOfCycle = cycle.replace(/\D/g, ""); // lấy số trong chuổi 

            numberOfCycle = +numberOfCycle // chuyển chuổi thành số nguyên

            var cycleDate = 0;
            var cycleMonth = 0;
            var cycleYear = 0;
            if (cycle.includes('ngày')) {
              cycleDate = numberOfCycle
            }
            if (cycle.includes('tháng')) {
              cycleMonth = numberOfCycle
            }
            if (cycle.includes('năm')) {
              cycleYear = numberOfCycle
            }

            end_date.setDate(end_date.getDate() + cycleDate);
            end_date.setMonth(end_date.getMonth() + cycleMonth);
            end_date.setFullYear(end_date.getFullYear() + cycleYear);

            const year = end_date.getFullYear()
            const month = end_date.getMonth() + 1
            const day = end_date.getDate()
            const dayStartNewCycle = year + '-' + month + '-' + day // ngày bắt đầu chu kì mới  
            task.dayStartNewCycle = dayStartNewCycle
            return task
          }
        })


        const rsTaskCusCared = taskCusCared.filter(value => {
          if (value.customerId == cusWork.Customer._id) {
            return cusWork.Customer.Tasks.filter((task) => {
              if (value.dayStartNewCycle == task.start_date) {
                console.log('Run');
              } else {
                // console.log('Value');
                return value
              }
            })


          }
        })

        if (rsTaskCusCared.length > 0) {
          return rsTaskCusCared
        }
      })


      // format lại data items 
      data.items = data.items.map((item) => {
        return {
          nameCustomer: item.Customer.name,
          emailCustomer: item.Customer.email,
          phoneCustomer: item.Customer.phone,
          current_position: item.current_position,
          nameCustomerType: item.Customer.Customer_Type.name,
          nameCompany: item.Company_KH.name, 
          Events: [...item.Customer.Events],
          Tasks: [...item.Customer.Tasks],
          Habits: {
          ...item.Customer.Habits,
          },
          ...item
        }
      })

      // data.viewCareCus = item.Customer.Tasks.map((value) => {
      //   console.log('Value:', value);
      //   return {
      //     start_date: value.start_date,
      //     end_date: value.end_date,
      //     content: value.content,
      //     customerName: item.Customer.name,
      //     cycleName: value.Cycle.name, // join bản sao
      //     statusName: value.Status_Task.name,
      //     EvaluateStar: value.Evaluate.star,
      //     comment: value.Comment == null ? 'Chưa cập nhật' : value.Comment.content
      //   }
      // })
    }

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
      console.log("Starting search");
      return data.items.map((value, index) => {
        return [value.nameCustomer].join("").toLocaleLowerCase();
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

    const view = (item) => {
      console.log('View: ' , item);
    }


    onBeforeMount(() => {
      reFresh()
    })
    return {
      data,
      setPages,
      options,
      handleUpdateEntryValue,
      handleUpdateSearchText,
      handlePrintReport,
      pdfContent,
      view
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
    