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
  tempEndArray: []
});

setOptions({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
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
      name: "T最终(℃)",
      type: "bar",
      barWidth: 8,
      data: props.tempEndArray
    }
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
