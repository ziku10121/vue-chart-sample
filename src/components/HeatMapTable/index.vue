<script setup>
import { Tooltip } from "bootstrap";
import Chart, { Legend, plugins } from "chart.js/auto";
import { callback } from "chart.js/helpers";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { onMounted, ref } from "vue";

Chart.register(MatrixController, MatrixElement);
const chartRef = ref(null);

const colors = [
  { value: 10, color: "#FFD8B7" },
  { value: 30, color: "#FFBB84" },
  { value: 60, color: "#FE9843" },
  { value: 80, color: "#FF7301" },
];

const apiData = {
  dateLabels: [
    "11/11(一)",
    "11/12(二)",
    "11/13(三)",
    // "11/14(四)",
    // "11/15(五)",
    // "11/16(六)",
    // "11/17(日)",
  ],
  timeLabels: [
    "10:00",
    "12:00",
    "14:00",
    //"16:00",
    //"18:00",
    //"20:00",
    //"22:00"
  ],
  data: [
    {
      date: "2024/11/11",
      time: "10:00",
      weekday: "一",
      value: 10,
    },
    {
      date: "2024/11/11",
      time: "12:00",
      weekday: "一",
      value: 50,
    },
    {
      date: "2024/11/11",
      time: "14:00",
      weekday: "一",
      value: 80,
    },
    {
      date: "2024/11/12",
      time: "10:00",
      weekday: "二",
      value: 50,
    },
    {
      date: "2024/11/12",
      time: "12:00",
      weekday: "二",
      value: 20,
    },
    {
      date: "2024/11/12",
      time: "14:00",
      weekday: "二",
      value: 80,
    },
    {
      date: "2024/11/13",
      time: "10:00",
      weekday: "三",
      value: 80,
    },
    {
      date: "2024/11/13",
      time: "12:00",
      weekday: "三",
      value: 80,
    },
    {
      date: "2024/11/13",
      time: "14:00",
      weekday: "三",
      value: 80,
    },
  ],
};
let newData = [];

const xLabels = apiData.dateLabels;
const yLabels = apiData.timeLabels;

const convertData = () => {
  return apiData.data.map((item) => {
    const [year, month, date] = item.date.split("/");
    return {
      x: `${month}/${date}(${item.weekday})`,
      y: item.time,
      value: item.value,
    };
  });
};
newData = convertData();

function getBackgroundColor(colors, value) {
  if (value >= colors[0].value) {
    const subColors = colors.filter((color) => value < color.value);

    if (subColors.length === 0) {
      return colors[colors.length - 1].color;
    } else {
      return subColors[0].color;
    }
  }
  return "#e5e5e5";
}

const data = {
  datasets: [
    {
      label: "Basic matrix",
      data: newData,
      borderWidth: 1,
      borderColor: "rgba(255,255,255)",
      backgroundColor: function (ctx) {
        const value = ctx.dataset.data[ctx.dataIndex].value;
        return getBackgroundColor(colors, value);
      },
      width: ({ chart }) => (chart.chartArea || {}).width / xLabels.length,
      height: ({ chart }) => (chart.chartArea || {}).height / yLabels.length,
    },
  ],
};

const options = {
  animation: {
    duration: 0,
  },
  scales: {
    x: {
      display: true,
      type: "category", //顯示類型(預設數字值)
      offset: true,
      position: "top",

      // min: 0.5,
      // max: 2.5,
      labels: xLabels,
      ticks: {
        //stepSize: 1, // forces step size to be X units
        autoSkip: true,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      display: true,
      type: "category", //顯示類型(預設數字值)
      reverse: false,
      offset: true,

      // min: 0.5,
      // max: 7.5,
      labels: yLabels,
      ticks: {
        // stepSize: 1,
        autoSkip: true,
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  plugins: {
    // Title
    title: {
      display: false,
      text: "Chart Title",
    },
    // 資料內容分類
    legend: false,
    tooltip: {
      callbacks: {
        title() {
          return "Tip Title";
        },
        label(ctx) {
          const data = ctx.dataset.data[ctx.dataIndex];
          return ["x: " + data.x, "y: " + data.y, "v: " + data.value];
        },
      },
    },
  },
  devicePixelRatio: 2,
};

const config = {
  type: "matrix",
  data,
  options,
};

onMounted(() => {
  new Chart(chartRef.value, config);
});
</script>
<template>
  <div>
    <canvas ref="chartRef" width="600" height="400"></canvas>
  </div>
</template>
<style lang="scss"></style>
