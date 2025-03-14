<script setup>
import { Chart, plugins, Tooltip } from "chart.js";
import { onMounted, ref } from "vue";

const chartRef = ref(null);

// 渲染Border
const centerText = {
  id: "centerText",
  afterDatasetDraw(chart, args, options) {
    // chart.ctx
    const {
      ctx,
      chartArea: { left, right, top, bottom, width, height },
    } = chart;

    ctx.save();
    ctx.font = "bolder 30px Arial";
    ctx.fillStyle = "rgba(255, 26, 104, 1)";
    ctx.textAlign = "center";
    ctx.fillText(`${labelText.value}`, width / 2, height / 2 + top - 20);
    ctx.fillText(`${rateText.value}%`, width / 2, height / 2 + top + 20);
  },
  // afterDraw(chart, args, options) {
  //   const {
  //     ctx,
  //     chartArea: { left, top, width, height },
  //   } = chart;
  //   ctx.save();
  //   ctx.strokeStyle = options.borderColor;
  //   ctx.lineWidth = options.borderWidth;
  //   ctx.setLineDash(options.borderDash || []);
  //   ctx.lineDashOffset = options.borderDashOffset;
  //   ctx.strokeRect(left, top, width, height);
  //   ctx.restore();
  // },
};

const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      label: "Dataset 1",
      data: [11971, 17406],
      background: ["#059BFF", "#FF6384"],
      hoverBackgroundColor: ["#045c96", "#d00e37"],
      weight: 0.5,
    },
  ],
};

const labelText = ref("Male");
const rateText = ref("50");

const options = {
  responsive: true,
  maintainAspectRatio: true, //是否保持寬高比
  // aspectRatio: 2,
  /** animation TYPES
   * duration
   * easing
   */
  plugins: {
    legend: {
      display: false,
      position: "top", // 將Legend位置設置為 'top', 'bottom', 'left', 'right' 或 'chartArea'
      align: "start", // 對齊方式
      labels: {
        padding: 20, // legend圖例說明 之間的垂持間距
        boxWidth: 20, // legend圖例說明 的寬度
      },
    },
    Tooltip: {
      enabled: true,
      zIndex: 100,
    },
    layout: {
      padding: 20,
    },
    title: {
      display: false,
    },
  },
  cutout: "80%", //中間切出圓心百分比(預設50，0為圓餅圖)
  onHover: (event, elements, chart) => {
    if (elements.length) {
      const index = elements[0].index; // 獲取懸停的資料索引
      hoverShowTextFunc(index);
    }
    // chart.update();
  },
};

const config = {
  type: "doughnut",
  data,
  options,
  plugins: [centerText],
};

// 圓圖表中顯示資訊
const hoverShowTextFunc = (index) => {
  labelText.value = data.labels[index];
  let value = data.datasets[0].data[index];
  let allValue = data.datasets[0].data.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  let percentValue = (value / allValue) * 100;
  rateText.value = percentValue.toFixed(2);
};

onMounted(() => {
  new Chart(chartRef.value, config);

  const index = data.datasets[0].data.indexOf(
    Math.max(...data.datasets[0].data)
  );
  hoverShowTextFunc(index);
});
</script>
<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>
<style lang="scss" scoped>
canvas {
  max-height: 100%; /* 圖表畫布自適應容器高度 */
}
.chart-container {
  max-height: 300px;
}
</style>
