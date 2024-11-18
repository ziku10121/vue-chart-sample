<script setup>
import barChart from "../components/BarChart/index.vue";
import lineChart from "../components/LineChart/index.vue";
import barLineChart from "../components/BarLineChart/index.vue";
import doughnutChart from "../components/Doughnut/index.vue";
import heatMapTableChart from "../components/HeatMapTable/index.vue";
import heatMapChart from "../components/HeatMap/index.vue";
import peopleChart from "../components/PeopleChart/index.vue";

import { ref, computed } from "vue";

const currentTab = ref("barChart");

// Define available tabs and their corresponding components
const tabs = {
  barChart: barChart,
  lineChart: lineChart,
  barLineChart: barLineChart,
  doughnut: doughnutChart,
  heatMapTable: heatMapTableChart,
  heatMap: heatMapChart,
  peopleChart: peopleChart,
};

// Compute the current component to display based on the selected tab
const currentTabComponent = computed(() => tabs[currentTab.value]);
</script>

<template>
  <div class="d-flex justify-content-center align-items-center mb-5">
    <a href="/#">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <h3>Chart.js Sample</h3>
    <a href="/#">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>

  <div>
    <!-- Bootstrap Nav Tabs -->
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'barChart' }"
          href="#"
          @click.prevent="currentTab = 'barChart'"
        >
          Bar
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'lineChart' }"
          href="#"
          @click.prevent="currentTab = 'lineChart'"
        >
          Line
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'barLineChart' }"
          href="#"
          @click.prevent="currentTab = 'barLineChart'"
        >
          BarLine
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'doughnut' }"
          href="#"
          @click.prevent="currentTab = 'doughnut'"
        >
          Doughnut
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'heatMapTable' }"
          href="#"
          @click.prevent="currentTab = 'heatMapTable'"
        >
          heatMapTable
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'heatMap' }"
          href="#"
          @click.prevent="currentTab = 'heatMap'"
        >
          heatMap
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: currentTab === 'peopleChart' }"
          href="#"
          @click.prevent="currentTab = 'peopleChart'"
        >
          peopleChart
        </a>
      </li>
    </ul>

    <!-- Show Components Based on Tab -->
    <div
      class="p-4"
      style="
        border: 1px solid #dee2e6;
        border-top: none;
        width: 720px;
        height: 480px;
      "
    >
      <component :is="currentTabComponent"></component>
    </div>
  </div>
</template>
<style lang="scss">
ul {
  list-style: none;
}
</style>
