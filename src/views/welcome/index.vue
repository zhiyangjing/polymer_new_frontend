<script setup lang="ts">
import Bar from "./components/Bar.vue";
import CandleStick from "./components/CandleStick.vue";
import TypeIt from "@/components/ReTypeit";
import { ref, computed, defineComponent, onMounted } from "vue";
import { getPolymerStaticData } from "@/api/polymerTable";

defineOptions({
  name: "Welcome"
});
defineComponent({
  Bar,
  CandleStick
});
const loading = ref<boolean>(true);
const titleClass = computed(() => {
  return ["text-base", "font-medium"];
});
let staticData = [];
const barData = {
  materialNameArray: [],
  tempInitialArray: [],
  tempEndArray: []
};
const candleStickData = {
  tempInitialArray: [],
  tempEndArray: []
};
const handleQuery = () => {
  getPolymerStaticData().then(({ data }) => {
    staticData = data.rows;
    for (const item of staticData) {
      barData.materialNameArray.push(item["material"]);
      barData.tempInitialArray.push(item["initial_temp"]);
      barData.tempEndArray.push(item["end_temp"]);
      candleStickData.tempInitialArray.push(item["initial_temp"]);
      candleStickData.tempEndArray.push(item["end_temp"]);
    }
  });
};
setTimeout(() => {
  loading.value = !loading.value;
}, 800);
onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="root">
    <el-row :gutter="24" class="el-row">
      <el-col :span="12">
        <el-card shadow="never" class="el-card">
          <template #header>
            <a :class="titleClass" target="_black">
              <TypeIt
                :className="'type-it1'"
                :values="['耐烧蚀高分子温度性能统计']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Bar
                :materialNameArray="barData.materialNameArray"
                :tempInitialArray="barData.tempInitialArray"
                :tempEndArray="barData.tempEndArray"
              />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="never" class="el-card">
          <template #header>
            <a :class="titleClass" target="_black">
              <TypeIt
                :className="'type-it2'"
                :values="['耐烧蚀高分子K线图统计']"
                :cursor="false"
                :speed="120"
              />
            </a>
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <CandleStick
                :tempInitialArray="candleStickData.tempInitialArray"
                :tempEndArray="candleStickData.tempEndArray"
              />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.el-col {
  margin-bottom: 18px;
}
</style>
