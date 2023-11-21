<script setup lang="ts">
import { ref, onMounted, defineComponent } from "vue";
import PolymerForm from "./components/polymerForm.vue";
import PolymerTable from "./components/polymerTable.vue";

defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "Polymer"
});

defineComponent({
  PolymerForm,
  PolymerTable
});

const polymerTableRef = ref();
const polymerFormRef = ref();
const searchStr = ref();

const handleSearch = () => {
  searchStr.value = polymerFormRef.value.handleSearchData();
  polymerTableRef.value.handleQuery(searchStr.value);
};

const handleReset = () => {
  polymerTableRef.value.toggleSelection();
  polymerTableRef.value.handleQuery("");
  polymerFormRef.value.resetForm(polymerFormRef.value.FormRef);
};

const handleAdd = () => {
  polymerTableRef.value.handleAdd();
};

const handleDelete = () => {
  polymerTableRef.value.handleDelete();
};

const handleExportExcel = () => {
  polymerTableRef.value.exportExcel();
};
onMounted(() => {
  handleSearch();
});
</script>

<template>
  <div class="root">
    <div class="form-group">
      <polymer-form ref="polymerFormRef" />
    </div>
    <div class="button-group">
      <el-button type="primary" @click="handleSearch">确定</el-button>
      <el-button type="primary" @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button type="primary" @click="handleDelete">删除</el-button>
      <el-button type="primary" @click="handleExportExcel"
        >导出数据(xlsx)</el-button
      >
    </div>
    <div class="table-group">
      <polymer-table
        :searchStr="searchStr"
        ref="polymerTableRef"
        @search="handleSearch"
      />
    </div>
  </div>
</template>

<style scoped>
.table-group {
  margin-top: 15px;
}
</style>
