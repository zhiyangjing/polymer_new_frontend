<script setup lang="ts">
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "@/store/modules/app";

import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

import { onMounted } from "vue";

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const candleStickRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(
  candleStickRef as Ref<HTMLDivElement>,
  {
    theme
  }
);

const props = defineProps({
  tempInitialArray: [],
  tempEndArray: []
});

onMounted(() => {
  console.log(props.tempEndArray, props.tempInitialArray);
})

setOptions({
  toolbox: {
    feature: {
      saveAsImage: {},
      restore: {},
      dataView: {
      },
      magicType: {
        type: ['line', 'bar']
      },
      dataZoom: {}
    }
  },
  xAxis: {
    data: ["起始裂解温度(℃)", "最终裂解温度(℃)"]
  },
  yAxis: {},
  series: [
    {
      type: "candlestick",
      data: [props.tempInitialArray, props.tempEndArray]
    }
  ]
});

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="candleStickRef" style="width: 100%; height: 60vh" />
</template>
