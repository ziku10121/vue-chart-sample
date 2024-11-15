<script setup>
import Chart, { Colors } from "chart.js/auto";
import { onMounted, ref } from "vue";

const chartRef = ref(null);
const dataCount = ref(7);
const numberCFG = {
  count: dataCount.value,
  min: -10,
  max: 100,
};

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Fully Rounded",
      data: [[2, 5], 5, 3, 2, 12, 19],
      borderColor: "rgba(0,0,0,1)",
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      borderWidth: 2,
      borderRadius: 15,
      borderSkipped: false,
    },
    {
      label: "Number Votes",
      data: [12, [2, 19], 3, 5, 2, 3],
      color: "#000000",
      backgroundColor: "#36A2EB",
      borderWidth: 1,
    },
  ],
};

const options = {
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
};
const config = {
  type: "bar",
  data,
  options,
};

onMounted(() => {
  new Chart(chartRef.value, config);
});
</script>
<template>
  <!-- <h3>ChartJS</h3> -->
  <canvas ref="chartRef" height="400" width="600"></canvas>
</template>
<style lang="scss" scoped></style>
