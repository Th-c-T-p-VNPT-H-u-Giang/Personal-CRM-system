<template>
    <div>
      <!-- Other content in your view -->
  
      <TableRp
        v-if="items.length > 0"
        :items="items"
        :fields="['Customers', 'CustomersType', 'Staff', 'StartDate', 'EndDate']"
        :labels="['customers', 'customerstype', 'staff', 'startdate', 'enddate']"
        :activeActionView="false"
      />
  
      <!-- Other content in your view -->
    </div>
  </template>
  
  <script>
  import TableRp from "../../components/table/table_rp_long.vue";
  import { reactive, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  export default {
    components: {
      TableRp
    },
    setup() {
      const data = reactive({
        items: [],
      });
  
      const fetchData = async (id) => {
        try {
          const response = await axios.get(`http://localhost:5173/report/${id}`);
          data.items = response.data; 
        } catch (error) {
          console.error(error);
        }
      };
  
      const route = useRoute();
      const id = route.params.id; 
  
      onMounted(() => {
        fetchData(id); 
      });
  
      return {
        items: data.items,
      };
    },
  };
  </script>
  