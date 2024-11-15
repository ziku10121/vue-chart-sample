<script setup>
import { Chart } from "chart.js";
import { ref, onMounted } from "vue";

const chartRef = ref(null);

// 渲染Border
const chartAreaBorder = {
  id: "chartAreaBorder",
  afterDraw(chart, args, options) {
    const {
      ctx,
      chartArea: { left, top, width, height },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

const data = {
  labels: ["2024/09/29", "2024/09/30", "2024/10/01"],
  datasets: [
    {
      label: "入口",
      data: [200, 300, 100],
      borderColor: "#fff000",
      backgroundColor: "rgba(0, 0, 255, 0.5)",
      /** pointStyle TYPES
       * 'circle':(預設)圈圈
       * 'cross':加號
       * 'crossRot':叉叉
       * 'dash': 一半的線
       * 'line':一條線
       * 'rect':正方形
       * 'rectRounded':圓角正方形
       * 'rectRot':菱形
       * 'star':星形
       * 'triangle':三角形
       */
      pointStyle: "star",
      //radius: 0, //point size
      pointBackgroundColor: "rgba(255,0,255,1)", //set point background color
      pointBorderColor: "rgba(255,0,255,1)", //set point border color
      fill: true,
      tension: 0.5, //數值越小越緊，越大越靈活
    },
    {
      label: "A區",
      data: [300, 550, 200],
      borderColor: "rgba(0,0,0,0.2)",
      backgroundColor: "rgba(255, 0, 0, 0.5)",
      fill: true,
      tension: 0.5,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    // legend 圖表圖例顯示有關圖表上出現的資料集的資料
    legend: {
      display: true,
    },
    // 圖表標題定義要在圖表頂部繪製的文本
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    chartAreaBorder: {
      borderColor: "#CCCCCC",
      borderWidth: 5,
      // borderDash: [5, 5],  //dash 線
      // borderDashOffset: 2, //dash 區隔
    },
  },
  interaction: {
    /** mode TYPES
     * nearest: 離滑鼠最近的資料點上
     * dataset: 停在某資料點上，顯示該資料整條資料集
     * point: 顯示滑鼠懸停在的特定點，不顯示其他資料集的點
     * x: 顯示滑鼠位置的 x 軸上所有資料集的數據
     * y: 顯示滑鼠位置的 y 軸上所有資料集的數據
     */
    mode: "dataset",
    intersect: true, // 滑鼠不必精確在點上
  },
  scales: {
    x: {
      display: false,
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      beginAtZero: true,
      max: 1000,
      display: false,
      title: {
        display: true,
        text: "People",
      },
    },
  },
};

const config = {
  type: "line",
  data,
  options,
  plugins: [chartAreaBorder],
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
