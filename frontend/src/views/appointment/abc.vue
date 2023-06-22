<template>
  <div>
    {{ params }}
  </div>
</template>
<script>
import { useRouter, useRoute } from "vue-router";
import { ref, reactive, onMounted } from "vue";
import { Appointment } from "../common/import";
import {
  alert_success,
  alert_error,
  alert_delete,
  alert_warning,
  alert_delete_wide,
} from "../../assets/js/common.alert";
import {
  http_getAll,
  http_create,
  http_getOne,
  http_deleteOne,
  http_update,
} from "../../assets/js/common.http";
//Service
import { Task } from "../common/import";

export default {
  setup(ctx) {
    const route = useRoute();
    const router = useRouter();
    const params = route.params.id;

    const data = reactive({
      items: {},
      selectAll: [
        {
          checked: false,
        },
      ],
    });
    const arrayCheck = reactive({ data: [] });
    const refresh = async () => {
      //1*** data.items=await  hàm lấy ds appoinmet của 1 task
      data.items = data.items.map((value, index) => {
        return {
          ...value,
          value: value._id,
        };
      });
      for (let value of data.items) {
        value.checked = false;
      }
      arrayCheck.data = [];
      data.selectAll[0].checked = false;
    };
    const handleSelectAll = (value) => {
      arrayCheck.data = [];
      if (value == false) {
        for (let value1 of data.items) {
          value1.checked = true;
          arrayCheck.data.push(value1);
        }
      } else {
        for (let value1 of data.items) {
          value1.checked = false;
          const index = arrayCheck.data.indexOf(value1._id);
          if (index !== -1) {
            arrayCheck.data.splice(index, 1);
          }
        }
      }
      console.log("arrayCheck:", arrayCheck.data);
    };
    const handleSelectOne = (id, item) => {
      if (item.checked == false) {
        arrayCheck.data.push(item);
      } else {
        arrayCheck.data = arrayCheck.data.filter((value, index) => {
          console.log(value._id != id);
          return value._id != id;
        });
      }
      console.log("ArrayCheckOne:", arrayCheck.data, item.checked);
      data.selectAll[0].checked = false;
    };
    //XÓA 1
    const handleDelete = async (id, item) => {
      console.log("D id & item:", id, item);
      const isConfirmed = await alert_delete(
        "Xóa",
        `Bạn có chắc là xóa lịch hẹn này không!!`
      );
      if (isConfirmed) {
        // 1***** xem thay đổi Appoiment cho phù hợp
        const rsAppointment = await http_deleteOne(Appointment, id);
        console.log(rsAppointment);
        if (rsAppointment.error) {
          alert_error("Lỗi ", rsAppointment.msg);
        } else {
          await refresh();
          alert_success("Thành công", "Xóa lịch hẹn thành công");
        }
      }
    };
    //XÓA NHIỀU
    const deleteMany = async () => {
      console.log("delete many");
      try {
        //Mảng lịch hẹn sẽ xóa
        if (arrayCheck.data.length == 0) {
          alert_warning("Bạn chưa chọn lịch hẹn", "");
          return;
        }
        let contentAlert = `<p>Bạn có muốn xoá tất cả lịch hẹn này không?
          </p><p>Tổng số lịch hẹn sẽ xoá là:
           <span style="color: blue;">${arrayCheck.data.length}</span></p>
            <table class="table table-bordered">
        <thead>
          <tr>
            <th>Ngày hẹn</th>
            <th>Nội dung</th>
            <th>Địa điểm</th>
            <th>Chú thích</th>
            <th>Trạng thái</th>
          </tr>
        </thead> <tbody>`;
        for (let value of arrayCheck.data) {
          console.log(value);
          contentAlert += `<tr>
            <td>${value.date_time}</td>
            <td>${value.content}</td>
            <td>  ${value.place} </td>
            <td>  ${value.note}</td>
    //value.StatusApp.name cần thay đổi cho phù hợp vs DL trả về backend
            <td>  ${value.StatusApp.name}</td> 
          </tr>`;
        }
        contentAlert += `</tbody>
      </table>`;
        const isConfirmed = await alert_delete_wide(
          `Xoá nhiều lịch hẹn`,
          contentAlert
        );
        if (isConfirmed) {
          let checkDeleteAll = false;
          for (let valueDelete of arrayCheck.data) {
            // 1***** xem thay đổi Appoiment cho phù hợp
            const rsAppointment = await http_deleteOne(
              Appointment,
              valueDelete._id
            );
            if (rsAppointment.error) {
              alert_error("Lỗi ", rsAppointment.msg);
              checkDeleteAll = false;
            } else {
              checkDeleteAll = true;
            }
          }
          if (checkDeleteAll) {
            await refresh();
            alert_success("Thành công", "Xóa lịch hẹn thành công");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    onMounted = async () => {
      await refresh();
    };
    return {
      params,
      data,
      handleSelectAll,
      handleSelectOne,
      handleDelete,
      deleteMany,
    };
  },
};
</script>
