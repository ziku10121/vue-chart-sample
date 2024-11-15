<script setup>
import { clearCanvas } from "chart.js/helpers";
import { onMounted, ref } from "vue";

const chartRef = ref(null);
const heatmapInstance = ref(null);
const heatMapData = ref({
  imageUrl: "../../assets/imgs/exampleMap.png",
});

// 操作處理函式
async function getDataAPI() {
  // 動態資料
  // data = await callDataAPI();

  // 靜態資料
  heatMapData.value = {
    imageUrl: "../../assets/imgs/exampleMap.png",
    createDate: "2024/09/23 11:00:00",
    heatPoints: [
      {
        x: "15",
        y: "50",
        radius: 10,
        value: 20,
      },
      {
        x: "20",
        y: "50",
        radius: 20,
        value: 25,
      },
      {
        x: "40",
        y: "50",
        radius: 30,
        value: 20,
      },
      {
        x: "75",
        y: "50",
        radius: 40,
        value: 30,
      },
      {
        x: "100",
        y: "50",
        radius: 30,
        value: 35,
      },
      {
        x: "130",
        y: "50",
        radius: 40,
        value: 40,
      },
      {
        x: "150",
        y: "50",
        radius: 40,
        value: 48,
      },
      {
        x: "180",
        y: "50",
        radius: 40,
        value: 70,
      },
      {
        x: "500",
        y: "100",
        radius: 55,
        value: 50,
      },
      {
        x: "700",
        y: "180",
        radius: 45,
        value: 80,
      },
      {
        x: "650",
        y: "180",
        radius: 45,
        value: 80,
      },
      {
        x: "700",
        y: "60",
        radius: 50,
        value: 80,
      },
      {
        x: "330",
        y: "150",
        radius: 60,
        value: 99,
      },
      {
        x: "350",
        y: "170",
        radius: 60,
        value: 99,
      },
      {
        x: "360",
        y: "130",
        radius: 60,
        value: 99,
      },
      {
        x: "180",
        y: "150",
        radius: 55,
        value: 50,
      },
      {
        x: "330",
        y: "180",
        radius: 45,
        value: 80,
      },
      {
        x: "180",
        y: "210",
        radius: 30,
        value: 60,
      },
      {
        x: "200",
        y: "230",
        radius: 40,
        value: 60,
      },
      {
        x: "250",
        y: "230",
        radius: 55,
        value: 55,
      },
      {
        x: "800",
        y: "220",
        radius: 50,
        value: 90,
      },
      {
        x: "800",
        y: "180",
        radius: 80,
        value: 99,
      },
      {
        x: "700",
        y: "200",
        radius: 70,
        value: 99,
      },
      {
        x: "800",
        y: "100",
        radius: 70,
        value: 60,
      },
      {
        x: "820",
        y: "50",
        radius: 70,
        value: 60,
      },
    ],
  };

  if (heatMapData.value) setHeatMap();
}

// 清除熱區圖
const clearHeatMap = () => {
  heatmapInstance.value.setData({ data: {} });
  title.textContent = "default";
};

// 渲染熱區圖函式
function setHeatMap() {
  let pointData = {
    max: 100,
    data: heatMapData.value.heatPoints,
  };
  heatmapInstance.value.setData(pointData);
}

// String路徑 convert 路徑位置
const getImageUrl = (path) => new URL(path, import.meta.url).href;

// // 監聽窗口大小變化
const handleResize = () => {
  const width = chartRef.value.offsetWidth;
  const height = chartRef.value.offsetHeight;
  let newHeatMap = document.querySelector(".heatmap-canvas");
  newHeatMap.style.width = width + "px";
  newHeatMap.style.height = height + "px";
};

onMounted(() => {
  // 初始建立熱感應設置
  heatmapInstance.value = h337.create({
    container: chartRef.value,
    radius: 30,
    maxOpacity: 0.6,
    minOpacity: 0,
    blur: 0.75,
  });
  // 渲染資料
  let pointData = {
    max: 100,
    data: [
      {
        x: "100",
        y: "100",
        radius: 100,
        value: 99,
      },
    ],
  };
  heatmapInstance.value.setData(pointData);

  // 啟動監聽模式
  window.addEventListener("resize", handleResize);
});
</script>
<template>
  <div class="heatmapCanvas" ref="chartRef">
    <img :src="getImageUrl(heatMapData.imageUrl)" alt="place" />
  </div>
  <div class="mt-2">
    <button class="btn btn-primary me-2" @click="getDataAPI">Render</button>
    <button class="btn btn-primary" @click="clearHeatMap">Clear</button>
  </div>
</template>
<style lang="scss">
.heatmapCanvas {
  max-width: 100%;
  max-height: 100%;
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    /* object-fit: cover; */
    border-radius: 1rem;
    border: 1px solid #ccc;
  }
}
</style>
