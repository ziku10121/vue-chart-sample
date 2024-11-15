// 方式一(前端需要資料處理)
const objectData = {
  data: [
    {
      date: "2024/09/30",
      regions: [
        {
          title: "入口",
          value: 200,
        },
        {
          title: "A區",
          value: 500,
        },
        {
          title: "B區",
          value: 200,
        },
        {
          title: "出口",
          value: 100,
        },
      ],
      total: 1000,
    },
    {
      date: "2024/09/30",
      regions: [
        {
          title: "入口",
          value: 200,
        },
        {
          title: "A區",
          value: 500,
        },
        {
          title: "B區",
          value: 200,
        },
        {
          title: "出口",
          value: 100,
        },
      ],
      total: 1000,
    },
  ],
  flowData: {
    entryExitFlow: 109490,
    prevEEFRatio: -11.82,
    regionFlow: 14166,
    prevRFRatio: -63.7,
    flowConversionRatio: 13,
    prevFCRRatio: -15,
  },
  chartData: {
    xAxis: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
    yAxis: [29, 30],
  },
};

// 方式二(好帶入chart)
const chartData = {
  // chart資料
  data: [
    {
      title: "入口",
      data: [
        {
          date: "2024/09/29",
          value: 200,
        },
        {
          date: "2024/09/30",
          value: 300,
        },
      ],
    },
    {
      title: "A區",
      data: [
        {
          date: "2024/09/29",
          value: 500,
        },
        {
          date: "2024/09/30",
          value: 550,
        },
      ],
    },
    {
      title: "B區",
      data: [
        {
          date: "2024/09/29",
          value: 200,
        },
        {
          date: "2024/09/30",
          value: 100,
        },
      ],
    },
    {
      title: "出口",
      data: [
        {
          date: "2024/09/29",
          value: 100,
        },
        {
          date: "2024/09/30",
          value: 200,
        },
      ],
    },
  ],
  flowData: {
    // 顯示文字資料
    entryExitFlow: 109490,
    prevEEFRate: 11.82,
    regionFlow: 14166,
    prevRFRate: 63.7,
    flowConversionRate: 13,
    prevFCRRate: 15,
  },
  chartData: {
    //顯示xy軸間格名稱
    xAxis: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
    yAxis: [29, 30],
    total: [1000, 1150],
  },
};
