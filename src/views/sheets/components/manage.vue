<script setup lang="ts">
import axios from "axios";
import Sortable from "sortablejs";
import UploadForm from "./form.vue";
import { ref, reactive, computed } from "vue";
import { formUpload } from '@/api/files';
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import type { UploadFile } from "element-plus";
import { ElMessage } from 'element-plus'
import { getKeyList, extractFields, downloadByData } from "@pureadmin/utils";
import { createFormData } from "@pureadmin/utils";

import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";

defineOptions({
  name: "PureUpload"
});

const fileList = ref([]);
const router = useRouter();
const curOpenImgIndex = ref(0);
const dialogVisible = ref(false);

const urlList = computed(() => getKeyList(fileList.value, "url"));
const fileInfo = computed(() => extractFields(fileList.value, "name", "size"));

const getImgUrl = name => new URL(`./imgs/${name}.jpg`, import.meta.url).href;
const srcList = Array.from({ length: 3 }).map((_, index) => {
  return getImgUrl(index + 1);
});


const emits = defineEmits(["go_back"])
const go_back = ()=>{
  emits("go_back")
}

/** 上传文件前校验 */
const onBefore = file => {
  // if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
  //   message("只能上传图片");
  //   return false;
  // }
  const excelMimeTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel.sheet.macroEnabled.12',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
    'application/vnd.ms-excel.template.macroEnabled.12',
    'application/vnd.ms-excel.addin.macroEnabled.12',
    'application/vnd.ms-excel.sheet.binary.macroEnabled.12'
  ];
  if (!excelMimeTypes.includes(file.type)) {
    message("只能上传excel文件");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > 30;
  if (isExceed) {
    message(`单个图片大小不能超过30MB`);
    return false;
  }
};

/** 超出最大上传数时触发 */
const onExceed = () => {
  message("最多上传3张图片，请先删除在上传");
};

/** 移除上传的文件 */
const handleRemove = (file: UploadFile) => {
  fileList.value.splice(fileList.value.indexOf(file), 1);
};

/** 大图预览 */
const handlePictureCardPreview = (file: UploadFile) => {
  curOpenImgIndex.value = fileList.value.findIndex(img => img.uid === file.uid);
  dialogVisible.value = true;
};

const getUploadItem = () => document.querySelectorAll("#pure-upload-item");

/** 缩略图拖拽排序 */
const imgDrop = uid => {
  const CLASSNAME = "el-upload-list";
  const _curIndex = fileList.value.findIndex(img => img.uid === uid);
  getUploadItem()?.[_curIndex]?.classList?.add(`${CLASSNAME}__item-actions`);
  const wrapper: HTMLElement = document.querySelector(`.${CLASSNAME}`);
  Sortable.create(wrapper, {
    handle: `.${CLASSNAME}__item`,
    onEnd: ({ newIndex, oldIndex }) => {
      const oldFile = fileList.value[oldIndex];
      fileList.value.splice(oldIndex, 1);
      fileList.value.splice(newIndex, 0, oldFile);
      // fix: https://github.com/SortableJS/Sortable/issues/232 (firefox is ok, but chromium is bad. see https://bugs.chromium.org/p/chromium/issues/detail?id=410328)
      getUploadItem().forEach(ele => {
        ele.classList.remove(`${CLASSNAME}__item-actions`);
      });
    }
  });
};






const formRef = ref();
const uploadRef = ref();
const validateForm = reactive({
  fileList: [],
  date: ""
});


const submitForm = async data => {
  if (data.length == 0) {
    console.log("asdf")
    ElMessage({
      message: "未上传图片",
      type: "warning"
    })
    return
  }
  let res = await formUpload(data)
  if (res.success) {
    fileList.value = []
    ElMessage({
      message: "提交成功",
      type: "success"
    })
  }
}


</script>

<template>
  <el-card shadow="never">

    <template #header>
      <div class="card-header">

        <div class="text-lg font-bold">
          文件上传
        </div>
        <div class="mx-2 text-xs text-center h-full font-bold download" @click="go_back()">文件下载</div>
      </div>
    </template>

    <p class="mb-4">
    <div class="text-sm font-semibold">
      请上传excel文件
    </div>
    </p>
    <p v-show="fileList.length > 0" class="mb-4">
      <li v-for="file in fileInfo">{{ file.name }}</li>
    </p>
    <el-upload v-model:file-list="fileList" drag multiple class="pure-upload" list-type="picture-card"
      accept="image/jpeg,image/png,image/gif" action="https://run.mocky.io/v3/3aa761d7-b0b3-4a03-96b3-6168d4f7467b"
      :limit="3" :headers="{ Authorization: 'eyJhbGciOiJIUzUxMiJ9.admin' }" :on-exceed="onExceed"
      :before-upload="onBefore">
      <IconifyIconOffline :icon="Add" class="m-auto mt-4" width="30" />
      <template #file="{ file }">
        <div v-if="file.status == 'ready' || file.status == 'uploading'" class="mt-[35%] m-auto">
          <p class="font-medium">文件上传中</p>
          <el-progress class="mt-2" :stroke-width="2" :text-inside="true" :show-text="false"
            :percentage="file.percentage" />
        </div>
        <div v-else @mouseenter.stop="imgDrop(file.uid)" class="title-container">

          <img class="el-upload-list__item-thumbnail select-none h-4/5" src="/images/excel.svg"/>
          <span id="pure-upload-item" :class="[
            'el-upload-list__item-actions',
            fileList.length > 1 && '!cursor-move'
          ]">
            <span class="el-upload-list__item-delete" @click="handleRemove(file)">
              <span title="移除" class="hover:text-[var(--el-color-danger)]">
                <IconifyIconOffline :icon="Delete" class="hover:scale-125 duration-100" />
              </span>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <teleport to="body">
      <div v-if="fileList[curOpenImgIndex] && dialogVisible" effect="dark" round size="large" type="info"
        class="img-name">
        <p class="text-[#fff] dark:text-black">
          {{ fileList[curOpenImgIndex].name }}
        </p>
      </div>
    </teleport>
    <p class="el-upload__tip">
      可拖拽上传最多3张单个不超过30MB且为excel表格的文件
    </p>


    <el-button type="primary" text bg @click="submitForm(fileList); console.log(fileList)">
      提交
    </el-button>

  </el-card>
</template>

<style lang="scss" scoped>
:deep(.card-header) {
  display: flex;
  flex-direction: row;
  align-items:flex-end;

  .header-right {
    display: flex;
    flex: auto;
    align-items: center;
    justify-content: flex-end;
    font-size: 14px;
  }
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  z-index: 10;
  margin: 5px;;
  position: relative;
  bottom:40%;
  font-weight: 900;
  font-size: large;
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

.img-name {
  position: absolute;
  bottom: 80px;
  left: 50%;
  z-index: 4000;
  padding: 5px 23px;
  background-color: var(--el-text-color-regular);
  border-radius: 22px;
  transform: translateX(-50%);

  /** 将下面的 left: 50%; bottom: 80px; transform: translateX(-50%); 注释掉
   *  解开下面 left: 40px; top: 40px; 注释，体验不一样的感觉。啊？还是差强人意，自己调整位置吧🥹
   */
  // left: 40px;
  // top: 40px;
}
</style>
