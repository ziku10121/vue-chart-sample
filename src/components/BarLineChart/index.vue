<script setup>
import { Chart, plugins } from "chart.js";
import { onMounted, ref } from "vue";
const chartRef = ref(null);
const rounderData = ref([
  {
    label: "男",
    data: [1, 1, 2, 5, 3],
    borderColor: "0000ff",
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    type: "bar",
  },
  {
    label: "女",
    data: [1, 5, 2, 3, 3],
    borderColor: "ff0000",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    type: "bar",
  },
  {
    label: "總人數",
    data: [2, 6, 4, 8, 6],
    borderColor: "rgb(155, 207, 245, 1)",
    backgroundColor: "rgb(155, 207, 245, 0.5)",
    tension: 0.3,
    stack: "combined",
  },
]);
let chartInstance = null;

const data = {
  labels: [
    "2024/09/30",
    "2024/10/01",
    "2024/10/02",
    "2024/10/03",
    "2024/10/04",
  ],
  datasets: rounderData.value,
};

const options = {
  plugins: {
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      min: 0,
      stack: true,
    },
  },
};

const config = {
  type: "line",
  data,
  options,
};

const changeRounded = () => {
  rounderData.value = [
    {
      label: "男",
      data: [1, 1, 2, 5, 3],
      borderColor: "0000ff",
      backgroundColor: "rgba(0, 0, 255, 0.5)",
      borderWidth: 1,
      borderRadius: 20,
      borderSkipped: false, //跳過繪製邊框，true、false、top、bottom、right、left。
      type: "bar",
    },
    {
      label: "女",
      data: [1, 5, 2, 3, 3],
      borderColor: "ff0000",
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      borderWidth: 1,
      borderRadius: 20,
      borderSkipped: false, //跳過繪製邊框，true、false、top、bottom、right、left。
      type: "bar",
    },
    {
      label: "總人數",
      data: [2, 6, 4, 8, 6],
      borderColor: "rgb(155, 207, 245, 1)",
      backgroundColor: "rgb(155, 207, 245, 0.5)",
      tension: 0.3,
      stack: "combined",
    },
  ];
  data.datasets = rounderData.value;
  chartInstance.update();
};

onMounted(() => {
  chartInstance = new Chart(chartRef.value, config);
});
</script>
<template>
  <div class="chart-container d-flex justify-content-center">
    <canvas ref="chartRef"></canvas>
  </div>
  <button class="mt-2 btn btn-primary" @click="changeRounded">Change</button>
</template>
<style lang="scss" scoped>
.chart-container {
  max-height: 300px;
}
</style>
