<script setup>
import { onMounted, ref, watch } from "vue";
import { Chart, registerables } from "chart.js";

const chartCanvas = ref(null);
const chartInstance = ref(null);

const dataCount = ref(7);
const bgColor = ref("#ff000080");

const numberCFG = {
  count: dataCount.value,
  min: -10,
  max: 100,
};

// registerables 是 Chart.js內建的所有可註冊模組集合(包含圖表類型、比例尺、插件等)
Chart.register(...registerables);

const createChart = () => {
  if (!chartCanvas.value) return;

  if (chartInstance.value) chartInstance.destroy(); // 銷毀舊圖表

  // 創建新圖表
  chartInstance.value = new Chart(chartCanvas.value, {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "Source A",
          data: [[2, 5], 5, 3, 2, 12, 19],
          borderColor: "rgba(0,0,0,1)",
          backgroundColor: bgColor.value,
          borderWidth: 2,
          borderRadius: 15,
          borderSkipped: false,
        },
        {
          label: "Source B",
          data: [12, [2, 19], 3, 5, 2, 3],
          color: "#000000",
          backgroundColor: "#36A2EB",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      // maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "left",
        },
        title: {
          display: true,
          text: "Chart.js text",
        },
      },
    },
  });
};

onMounted(() => {
  createChart();
});
</script>
<template>
  <div class="chart-container d-flex justify-content-center">
    <canvas ref="chartCanvas"></canvas>
  </div>
  <div>
    <div class="text-start">
      <label for="exampleColorInput" class="form-label">資料1 Color</label>
      <div>
        <input
          type="color"
          class="form-control form-control-color"
          id="exampleColorInput"
          v-model="bgColor"
          title="Choose your color"
        />
        <span>{{ bgColor }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.chart-container {
  max-height: 300px;
}
</style>
