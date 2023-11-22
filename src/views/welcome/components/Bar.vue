<script setup lang="ts">
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const barChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(barChartRef as Ref<HTMLDivElement>, {
  theme
});

const props = defineProps({
  materialNameArray: [],
  tempInitialArray: [],
  tempEndArray: [],
  max_tempArray: [],
  residual_massArray: []
});

setOptions({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {},
      restore: {},
      dataView: {
        show: true,
        readOnly: false,
        // 自定义样式
        optionToContent: (opt: { yAxis: { data: any[] }, series: any[] }) => {
          let axisData = opt.yAxis[0].data; // 获取横轴坐标数据
          let series = opt.series; // 获取折线图数据
          let tdHeads = '<td style="padding: 2px 10px;background-color: #eeeeee;font-weight: 700;color: #333333">时间</td>'; // 表头
          let tdBodys = ''; // 数据
          console.log(series)
          series.forEach(function (item) {
            // 组装表头
            tdHeads += `<td style="padding: 2px 10px;background-color: #eeeeee;font-weight: 700;color: #333333">${item.name}</td>`;
          });
          let table = `<table border="1" style="width: 96%;margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center" class="dataViewTable"><tbody><tr>${tdHeads}</tr>`;

          for (let i = 0, l = axisData.length; i < l; i++) {
            for (let j = 0; j < series.length; j++) {
              // 组装表数据
              tdBodys += `<td><input class="${j}x" type="text" value="${series[j].data[i]}" style="border: none;text-align: center;color: #444444;color: #444444"></td>`;
            }
            table += `<tr><td style="padding: 2px 10px;text-align: center"><input type="text" value="${axisData[i]}" style="border: none;text-align: center;color: #444444"></td>${tdBodys}</tr>`;
            tdBodys = '';
          }
          table += '</tbody></table>';
          return table;


        },
        //编辑功能
        contentToOption: (HTMLDomElement, opt: { series: { data: any[] }[] }) => {
          if (document.getElementsByClassName('dataViewTable').length > 1) {
            if (this && this.$message) {
              this.$message.error('有其他未关闭的数据视图，请关闭后重试');
            }
            for (let i = 0; i < opt.series.length; i++) {
              var name = 'dataX' + i;
              window[name] = []
              for (let j of Array.from(document.getElementsByClassName(`${i}x`))) {
                window[name].push((j as HTMLInputElement).value);
              }
              opt.series[i].data = window[name]
            }
            return opt;
          }
        },
      },
      magicType: {
        type: ['line', 'bar']
      },
      dataZoom: {}
    }
  },
  legend: {},
  grid: {
    left: "3%",
    right: "6%",
    top: 20,
    bottom: "6%",
    containLabel: true,
    height: "auto"
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: "category",
    data: props.materialNameArray,
    axisLabel: {
      color: "#6c706f",
      interval: 0
    }
  },
  series: [
    {
      name: "Ti(℃)",
      type: "bar",
      barWidth: 8,
      data: props.tempInitialArray
    },
    {
      name: "Tmax(℃)",
      type: "bar",
      barWidth: 8,
      data: props.max_tempArray
    },
    {
      name: "T最终(℃)",
      type: "bar",
      barWidth: 8,
      data: props.tempEndArray
    },
    {
      name: "M剩余(%)",
      type: "bar",
      barWidth: 8,
      data: props.residual_massArray
    },
  ]
}),
  watch(
    () => useAppStoreHook().getSidebarStatus,
    () => {
      delay(600).then(() => resize());
    }
  );
</script>

<template>
  <div ref="barChartRef" style="width: 100%; height: 60vh" />
</template>


<style scoped lang="scss">
.echartsTable {
  width: 100%;
  text-align: center;
  min-height: 25px;
  line-height: 25px;
  border-collapse: collapse;
  padding: 2px;
}

.echartsTable,
.echartsTable tr th,
.echartsTable tr td {
  border: 1px solid gray;
}
</style>