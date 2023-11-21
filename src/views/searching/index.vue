
<template>
  <div>
    <div class="table-container">
      <table class="bordered-table">
        <thead>
          <tr>
            <th>数据库名称</th>
            <th>材料数据种类</th>
            <th>网址</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in tableData" :key="index">
            <td>
              <!-- 从 setup 中访问 togglePanel 函数 -->
              <button @click="togglePanel(index)">{{ row.column1 }}</button>
            </td>
            <td>{{ row.column2 }}</td>
            <td><a :href="row.link" target="_blank" class="linkweb">{{ row.link }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="content-panel">
      <!-- 从 setup 中访问 expandedRow -->
      <div v-if="expandedRow !== null">
        <!-- 从 setup 中访问 tableData -->
        <p>内容：{{ tableData[expandedRow].linkContent }}</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

// Define options
defineOptions({
  name: "Searching"
});

const tableData = ref([
  { column1: "无机材料晶体结构库(Inorganic Crystal Structure Database, ICSD)", column2: "该库提供除了金属和合金以外，不含C-H键的所有无机化合物晶体结构信息,包括化学名和化学式、矿物名和相名称、晶胞参数、空间群、原子坐标、热参数、位置占位度、R因子及有关文献等各种信息", link: "http://www.fiz-karlsruhe.de/icsd.html" ,linkContent:"1"},
  { column1: "剑桥晶体结构数据库(Cambridge Structural Database, CSD)", column2: "数据库含有 875000 多个有机及金属有机化合物的X射线和中子剑桥晶体结构数据库(Cambridge Strctural Database, CSD)射线衍射的分析数据。它只负责收集并提供具有CH键的所有晶体结构，包括有机化合物、金属有机化合物、配位化合物的晶体结构数据", link: "http://www.ccdc.cam.uk" ,linkContent:"2"},
  { column1: "金属和合金晶体数据库(Metals and Alloys Crystallographie Database, CRYSTMET)", column2: "CrystMet 数据库包含金属、合金和金属间化合物的品体学信息。里面收集了 1913 年以来金属单质、金属化合物和固溶体的晶体数据，包括金属元泰与硼、硫、硅、锗等元素的化合物", link: "http://crystalworks.ca" ,linkContent:"2"},
  { column1: "开放晶体结构数据库(Crystallography open database, COD)", column2: "COD 是储存晶体学数据、原子坐标参数以及详细的化学内容和参考文献的数据库。它对所收集的大量分子结构数据进行了全面、广泛的整理、核对和质量评价，因此它所提供的数据要比原始文献更为准确。可以方便地检素、筛选和进行系统的分析，还可对数据进行加工并绘成各种规格的图形", link: "http://www.crystallography.net/cod/" ,linkContent:"2"},
  { column1: "沸石结构数据库(the database of zeolite structures, DZS)", column2: "DS 提供了所有沸石骨架类型材料的结构信息，包括每个框架式的说明和图纸、晶体学数据和代表性材料模拟粉未衍射图案、建筑模型的详细说明、无序沸石结构的描述等", link: "http://www.iza-structure.org/databases/" ,linkContent:"2"},
  { column1: "Paulingfile数据库(Paulingfile database)", column2: "一个集相图、晶体结构和物理性质的无机化合物数据库", link: "http://paulingfile.com" ,linkContent:"2"},
  { column1: "材料计划(Materials project)", column2: "该库专门用于搜家查找各种材料的性质，以较高的标准衡量是否将计算机顶测的材料纳入数据库。例如：锂电池相关（约15000个结构;沸石、金属有机骨架 MOF(约13万种）", link: "http://materialsproject.org" ,linkContent:"2"},
  { column1: "材料云项目(Materials cloud project)", column2: "该库主要以石墨烯等二维材料为主，初步预测产生1500种可能的二维结构", link: "http://www.materialscloud.org" ,linkContent:"2"},
  { column1: "NIMS材料数据库(NIMS materials database)", column2: "世界上最大的聚合物、陶瓷、合金、超导材料、复合材料和扩散材料数据库之一", link: "https://www.nist.gow/" ,linkContent:"2"},
  { column1: "AFLOWlib数据库(Automatic-FlOW for materials discovery, Aflowlib)", column2: "AFLOWlib是目前最大的材料数据库，主要是金属合金，该库拥有超过一百万的不同材料和一亿左右的性能属", link: "http://www.aflowlib.org" ,linkContent:"2"},
  { column1: "开放量子材料数据库(Open quantum materials database, OQMD)", column2: "该库主要以钙钛矿数居多，用户可以下载整个数据库而不仅仅是单个搜索结果", link: "http://oqmd.org" ,linkContent:"2"}
  // Add other rows
]);

const expandedRow = ref(null);

const togglePanel = (index: number) => {
  if (expandedRow.value === index) {
    expandedRow.value = null;
  } else {
    expandedRow.value = index;
  }
};
</script>



<style>
.bordered-table {
  border-collapse: collapse;
  width: 100%;
}

.bordered-table th,
.bordered-table td {
  border: 1px solid #ffffff;
  padding: 8px;
  text-align: left;
}

.bordered-table th {
  background-color: #ffffff;
}

.table-container {
  width: 100%;
  margin-bottom: 20px;
}

.content-panel {
  border: 1px solid #ffffff;
  padding: 10px;
}

.content-panel p {
  margin: 0;
}
.linkweb{
  color: rgb(52, 0, 207);
}
</style>
