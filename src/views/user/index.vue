<script setup lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { UserDataDisplay, getUserData, deleteUserData } from "@/api/userTable";
//*组件引入/
import ActionDialog from "./actionDialog.vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
defineOptions({
  // name 作为一种规范最好必须写上并且和路由的name保持一致
  name: "User"
});

defineComponent({
  ActionDialog
});

const tableData = ref([]);
// const tableData: Array<UserDataDisplay> = await getUserData();
const actionDialogRef = ref();

const handleAdd = () => {
  actionDialogRef.value.add();
};

const handleEdit = (row: UserDataDisplay) => {
  actionDialogRef.value.edit(row);
};

const handleQuery = () => {
  getUserData().then(({ data }) => {
    tableData.value = data;
  });
};

const handleDelete = (row: UserDataDisplay) => {
  deleteUserData(row.id).then(res => {
    if (res.success) {
      ElMessage({
        message: "删除成功！",
        type: "success"
      });
      handleQuery();
    } else {
      ElMessage({
        message: "删除失败！",
        type: "error"
      });
    }
  });
};

onMounted(() => {
  handleQuery();
});
</script>

<template>
  <div class="root">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <el-button class="button" type="primary" @click="handleAdd"
            >添加用户
          </el-button>
        </div>
      </template>

      <el-table :data="tableData" stripe :border="true" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="phone" label="电话" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="time" label="修改时间" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="large" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              width="220"
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="你确定要删除这位用户嘛?"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button size="large" type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <action-dialog ref="actionDialogRef" @ok="handleQuery" />
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
