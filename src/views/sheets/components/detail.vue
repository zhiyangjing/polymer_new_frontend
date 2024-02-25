<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { get_file_list, download_file } from '@/api/files';
import { ElMessage } from 'element-plus';
const emits = defineEmits(["go_back"])
const size = ref(20)

function goBack() {
  emits("go_back");
}

let data = ref()

async function files_list() {
  let res = await get_file_list();
  if (res.success) {
    data.value = res.data
  }
  console.log(data.value)
}

function download_by_id(id: number, filename: string) {
  let success:boolean = download_file(id, filename)
  console.log(success,"<---")
  if (!success) {
    ElMessage({
      type:"error",
      message:"无权下载"
    })
  } else {
    ElMessage({
      type:"success",
      message:"开始下载"
    })

  }
}

onMounted(() => {
  files_list()
})

</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <div class="text-lg font-bold">
          文件下载
        </div>
        <div class="mx-2 text-xs text-center h-full font-bold download" @click="goBack()">文件上传</div>
      </div>
    </template>
    <div class="m-2">
      <el-button type="primary" @click="files_list()">刷新列表</el-button>
    </div>

    <el-space direction="vertical" alignment="start" :size="30">
      <el-space wrap :size="size">
        <el-card v-for="file in data" :key="file.id" class="box-card" style="width: 250px">
          <template #header>
            <div class="card-header flex flex-col justify-around items-center">
              <span><img class="select-none h-16 " src="/images/excel.svg" /></span>
              <el-button class="button" type="primary" @click="download_by_id(file.id, file.fileName)">下载</el-button>
            </div>
          </template>

          <el-descriptions title="文件信息" direction="vertical" :column="1" size="default" border>
            <el-descriptions-item label="文件名">
              <div class="file-name">
                {{ file.fileName }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="大小">{{ (file.fileSize / 1024).toFixed(1) }}Kb</el-descriptions-item>
            <el-descriptions-item label="上传日期" :span="2">{{ new Date(file.createdAt).toLocaleString()
            }}</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-space>
    </el-space>

  </el-card>
</template>

<style lang="scss" scoped>
#go-back {
  transition: 0.3s;
}

.file-name {
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
}

#go-back:hover {
  cursor: pointer;
  color: #8f99f0;
}

:deep(.card-header) {
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  .header-right {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
  }
}

.download {
  transition: 0.3s;
}

.download:hover {
  color: rgb(102, 158, 255);
  cursor: pointer;
}

:deep(.pure-upload) {
  .el-upload-dragger {
    background-color: transparent;
    border: none;
  }
}
</style>


<!--
  @FILE detail,
  @author: Zackary,
  @description: none,
  @CREATED:  2024-02-22 22:35:18,
-->