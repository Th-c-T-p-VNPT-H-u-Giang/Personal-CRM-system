<template>
  <div>
    <div class="dropdown mx-2">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Cycles
      </button>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Weak</a>
        <a class="dropdown-item" href="#">Month</a>
        <a class="dropdown-item" href="#">Quater</a>
        <a class="dropdown-item" href="#">Years</a>
      </div>
    </div>
    <div class="row mb-5">
      <h1 class="col-12 text-center mb-5 mt-2">REPORT</h1>
      <canvas id="myChart" class="col-4" style="height: 150px"></canvas>
      <div class="col-8">
        <div class="my-2">
          <button class="btn btn-success mr-2">cared-for customer</button>
          <button class="btn btn-primary">Uncared-for customer</button>
        </div>
        <h4 class="text-center">Customer list</h4>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Time</th>
              <th scope="col">Content</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="index" v-for="(cus, index) in customers_takecare">
              <th>{{ cus.cus_name }}</th>
              <td>{{ cus.tas_service_day }}</td>
              <td>{{ cus.tas_service_content }}</td>
              <td>
                <span class="material-symbols-outlined"> acute </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import { onMounted } from "vue";
import { reactive } from "vue";
export default {
  setup() {
    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
      labels: labels,
      datasets: [
        {
          label: "cared",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: [0, 10, 5, 2, 20, 30, 45],
        },
        {
          label: "Uncared",
          backgroundColor: "rgb(0, 99, 132)",
          borderColor: "rgb(255, 50, 132)",
          data: [3, 10, 7, 2, 20, 30, 45],
        },
      ],
    };
    const config = {
      type: "bar",
      data: data,
      options: {},
    };
    onMounted(() => {
      const myChart = new Chart(document.getElementById("myChart"), config);
    });
    const customers_takecare = reactive([
      {
        cus_id: 1,
        cus_name: "Lan Anh",
        tas_service_day: "2023-1-1",
        tas_service_content: "introduct new a service",
      },
      {
        cus_id: 2,
        cus_name: "Hồng Diễm",
        tas_service_day: "2023-2-1",
        tas_service_content: "introduct new a service",
      },
    ]);
    return { customers_takecare };
  },
};
</script>
