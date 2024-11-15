<script setup>
import { bottom } from "@popperjs/core";
import { Tooltip } from "bootstrap";
import { Chart, Legend, plugins } from "chart.js";
import { onMounted, ref, watch } from "vue";
const chartRef = ref(null); //chart圖表容器
let chartInstance = null; // chart初始化
const drawType = ref("preload"); // 繪製氣候圖標模式
const legendContainer = ref(null); // filter篩選容器
const dataFilterType = ref("days"); // 資料篩選方式

watch(dataFilterType, () => {
  // 抓取更新資料
  console.log(dataFilterType.value);
});
watch(drawType, () => {
  chartInstance.update();
});

const legendData = [
  {
    data: [
      { label: "孩童(男)", color: "#9CBDDC" },
      { label: "孩童(女)", color: "#5491CA" },
    ],
  },
  {
    data: [
      { label: "青壯年(男)", color: "#A7DCD4" },
      { label: "青壯年(女)", color: "#5EC7B8" },
    ],
  },
  {
    data: [
      { label: "中老年(男)", color: "#CDC8DB" },
      { label: "中老年(女)", color: "#A99FC3" },
    ],
  },
];

const iconMapping = {
  sun: "sun.svg",
  cloud: "cloud.svg",
  rain: "rain.svg",
};
// 模擬天氣數據，定義每天的天氣圖標類型
const weatherData = [
  "sun",
  "cloud",
  "rain",
  "sun",
  "cloud",
  "rain",
  "sun",
  "cloud",
  "rain",
  "sun",
  "cloud",
  "rain",
  "sun",
  "cloud",
];
// 緩存已加載圖示的圖標
let iconCache = {};

//快取並預先加載所有圖標
const preloadIcons = async (weatherData) => {
  const loadPromises = weatherData.map((weatherType) => {
    const iconSrc = `src/assets/icons/${iconMapping[weatherType]}`;

    // 如果缓存中没有图标才加载
    if (!iconCache[iconSrc]) {
      return new Promise((resolve) => {
        const icon = new Image();
        icon.src = iconSrc;
        icon.onload = () => {
          iconCache[iconSrc] = icon; // 快取圖示
          resolve();
        };
        icon.onerror = resolve; // 如果載入失敗，仍然完成載入流程
      });
    }

    return Promise.resolve(); // 如果圖示已加載，直接跳過
  });

  // 等待所有圖示載入完成
  await Promise.all(loadPromises);
};

//快取並繪製圖標
const loadIcon = async (src) => {
  return new Promise((resolve, reject) => {
    const icon = new Image();
    icon.src = src;
    icon.onload = () => resolve(icon); // 加载完成后返回图标
    icon.onerror = reject; // 加载失败时
  });
};

const drawIcons = async (chart, weatherData) => {
  const ctx = chart.ctx;
  const xAxis = chart.scales.x;

  // 加載並繪製圖標
  xAxis.ticks.forEach(async (tick, index) => {
    // 取得當前天氣類型
    const weatherType = weatherData[index];

    //取得圖示檔案路徑
    const iconSrc = `src/assets/icons/${iconMapping[weatherType]}`;
    // 檢查快取中是否有圖標
    let icon = iconCache[iconSrc];

    // 預先載入圖標模式
    if (drawType.value === "preload") {
      if (icon) {
        // 繪製圖標
        const x = xAxis.getPixelForTick(index);
        const y = chart.height - 50; // 控制圖標的Y位置
        const iconSize = 20; // 圖標大小

        ctx.drawImage(icon, x - iconSize / 2, y, iconSize, iconSize);
      }
    }

    // 繪製中沒有圖標再加載模式
    if (drawType.value === "drawload") {
      if (!icon) {
        icon = await loadIcon(iconSrc); // 非同步加載圖標
        iconCache[iconSrc] = icon; // 快取加載的圖標
      } // 繪製圖標
      const x = xAxis.getPixelForTick(index);
      const y = chart.height - 50; // 控制圖標的Y位置
      const iconSize = 20; // 圖標大小

      ctx.drawImage(icon, x - iconSize / 2, y, iconSize, iconSize);
    }
  });
};

const data = {
  labels: [
    "9/09",
    "9/10",
    "9/11",
    "9/12",
    "9/13",
    "9/14",
    "9/15",
    "9/16",
    "9/17",
    "9/18",
    "9/19",
    "9/20",
    "9/21",
    "9/22",
  ],
  datasets: [
    {
      type: "bar",
      label: "孩童(男)",
      data: [
        300, 700, 900, 700, 100, 1500, 1500, 700, 800, 150, 1400, 1700, 1800,
        1750,
      ],
      // categoryPercentage: 0.1, // 控制類別的寬度
      borderColor: "#0000ff",
      backgroundColor: "#9CBDDC",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "childStack",
    },
    {
      type: "bar",
      label: "孩童(女)",
      data: [
        200, 500, 600, 800, 200, 1500, 2000, 800, 800, 150, 1600, 1800, 1700,
        1750,
      ],
      // categoryPercentage: 0.1, // 控制類別的寬度
      borderColor: "#0000ff",
      backgroundColor: "#5491CA",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "childStack",
    },
    {
      type: "bar",
      label: "青壯年(男)",
      data: [
        1000, 250, 1500, 600, 150, 1000, 1200, 1700, 600, 150, 1000, 1500, 1000,
        500,
      ],
      borderColor: "#0000ff",
      backgroundColor: "#A7DCD4",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "youngStack",
    },
    {
      type: "bar",
      label: "青壯年(女)",
      data: [
        900, 250, 2000, 600, 150, 1100, 1300, 1800, 600, 150, 1200, 1000, 1500,
        2000,
      ],
      borderColor: "#0000ff",
      backgroundColor: "#5EC7B8",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "youngStack",
    },
    {
      type: "bar",
      label: "中老年(男)",
      data: [
        2500, 150, 1000, 1000, 500, 900, 900, 1000, 1000, 500, 500, 1000, 800,
        600,
      ],
      borderColor: "#0000ff",
      backgroundColor: "#CDC8DB",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "oldStack",
    },
    {
      type: "bar",
      label: "中老年(女)",
      data: [
        2500, 150, 1800, 1000, 600, 1000, 1000, 1900, 1000, 600, 1300, 800,
        1000, 1200,
      ],
      borderColor: "#0000ff",
      backgroundColor: "#A99FC3",
      //borderWidth: 1, //每個條形邊框寬度
      borderRadius: 20,
      borderSkipped: "bottom", //跳過繪製邊框，true、false、top、bottom、right、left。
      // barThickness: 10, //每個條形寬度
      barPercentage: 0.7, // 控制每個資料集（長條圖）寬度。
      categoryPercentage: 0.5, //控制每個類別寬度。
      stack: "oldStack",
    },
    {
      type: "line",
      stack: "combined",
      label: "總人數",
      data: [
        2200, 800, 4300, 2200, 900, 5100, 4600, 5200, 4300, 900, 3900, 4500,
        5300, 5000,
      ],
      borderColor: "#FFBF8B",
      backgroundColor: "#FFBF8B", //point color
      tension: 0.5,
      radius: 0, //point radius
    },
  ],
};

const options = {
  responsive: true,
  layout: {
    padding: {
      //top: 20, // 控製圖例下方與圖表主體的間距
      bottom: 50,
    },
  },
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
      align: "end",
      labels: {
        filter: function (legendItem, chartData) {
          return legendItem.text !== "總人數"; // 隱藏 "總人數" 圖例
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        padding: 5, // 設定標籤與刻度之間的間距
      },
    },
    y: {
      border: {
        display: false,
      },
      min: 0,
      // max: 6000,
      stack: true,
      ticks: {
        // forces step size to be 50 units
        stepSize: 1000,
      },
    },
  },
};

const legendMarginPlugin = {
  id: "legendMargin",
  beforeInit(chart) {
    const originalFit = chart.legend.fit;
    chart.legend.fit = function fit() {
      originalFit.bind(chart.legend)();
      this.height += 20; // 設定圖例下方的額外空間（類似 margin-bottom）
    };
  },
};

const renderLegend = () => {
  const legendHTML = legendData
    .map((item) => {
      return `
        <div class="customer-type">
          <div>
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${item.data[0].color}; margin-right: 5px;"></span>
            ${item.data[0].label}
          </div>
          <div>
            <span style="display: inline-block; width: 10px; height: 10px; background-color: ${item.data[1].color}; margin-right: 5px;"></span>
            ${item.data[1].label}
          </div>
        </div>
      `;
    })
    .join("");

  if (legendContainer.value) {
    legendContainer.value.innerHTML =
      `<span style="color:#ff0000;font-size:12px;font-weight: bold;margin-right:5px">(此處不是canvas產出)</span>` +
      legendHTML;
  }
  //   `
  //   <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
  //     <div>
  //       <span style="background-color: #f00; width: 10px; height: 10px; display: inline-block;"></span> Dataset 1
  //     </div>
  //     <div>
  //       <span style="background-color: #0f0; width: 10px; height: 10px; display: inline-block;"></span> Dataset 2
  //     </div>
  //     <div>
  //       <span style="background-color: #00f; width: 10px; height: 10px; display: inline-block;"></span> Dataset 3
  //     </div>
  //     <div>
  //       <span style="background-color: #f00; width: 10px; height: 10px; display: inline-block;"></span> Dataset 1
  //     </div>
  //     <div>
  //       <span style="background-color: #0f0; width: 10px; height: 10px; display: inline-block;"></span> Dataset 2
  //     </div>
  //     <div>
  //       <span style="background-color: #00f; width: 10px; height: 10px; display: inline-block;"></span> Dataset 3
  //     </div>
  //     <!-- 添加更多图例项 -->
  //   </div>
  // `;
};
/**
 * 第一方法: beforeInit + afterDraw
 * 預先載入圖標，檢查快取中是否有圖標，再判斷是否有圖標，有了在渲染。
 *
 * 第二方法: afterDraw
 * 檢查快取中是否有圖標，沒有的話載入圖標，有的話直接渲染。
 */
const weatherIconPlugin = {
  id: "weatherIcon",
  // 在圖表渲染之前預先載入圖標
  beforeInit: async (chart) => {
    console.log("beforeInit");
    // 預先加載模式
    if (drawType.value === "preload") {
      await preloadIcons(weatherData); // 預先載入圖標
    }
  },
  beforeUpdate: () => {
    console.log("before Update");
    if (drawType.value === "drawload") {
      iconCache = {};
    }
  },
  // 在圖表渲染完成後繪製圖標
  afterDraw: (chart) => {
    console.log("afterDraw");
    drawIcons(chart, weatherData); // 繪製圖標
  },
};

const config = {
  type: "line",
  data,
  options,
  plugins: [legendMarginPlugin, weatherIconPlugin],
};

onMounted(() => {
  chartInstance = new Chart(chartRef.value, config);

  renderLegend();
});
</script>
<template>
  <div>
    <div class="legend-wrapper">
      <div class="legend-container" ref="legendContainer"></div>
      <div>
        <select v-model="dataFilterType" class="rounded">
          <option value="days" selected>Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </select>
      </div>
    </div>
    <canvas ref="chartRef"></canvas>
    <select v-model="drawType" class="rounded">
      <option value="preload">預先載圖標</option>
      <option value="drawload">繪製中沒有在加載</option>
    </select>
  </div>
</template>
<style type="scss">
.legend-wrapper {
  display: flex;
  justify-content: flex-end;
  .legend-container {
    display: flex;
    justify-content: flex-end;
    .customer-type {
      margin-right: 1rem;
    }
  }
}
</style>
