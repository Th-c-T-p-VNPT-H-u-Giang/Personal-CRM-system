<template>
  <div>
    <!-- Hiển thị thông tin của item -->
    <h1>{{ item.customers }}</h1>
    <p>Customer Type: {{ item.customerstype }}</p>
    <p>Staff: {{ item.staff }}</p>
    <p>Start Date: {{ item.startdate }}</p>
    <p>End Date: {{ item.enddate }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      item: null, // Dữ liệu của item được truyền từ trang report.vue
    };
  },
  created() {
    // Truy cập vào tham số id từ URL
    const itemId = this.$route.params.id;
    // Tìm item tương ứng dựa trên itemId
    this.item = this.items.find((item) => item._id === itemId);
  },
};
</script>
