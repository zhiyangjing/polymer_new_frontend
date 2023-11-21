<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { state } from "../share";
/* 数据接口 */
interface PolymerInfo {
  material?: string;
  formula_url?: string;
  initial_temp?: GLfloat;
  max_temp?: GLfloat;
  end_temp?: GLfloat;
  rate?: GLfloat;
  residual_mass?: GLfloat;
  atmosphere?: string;
  reference?: string;
  pdf_url?: string;
  time?: Date;
}
const FormRef = ref<FormInstance>();
const Form = reactive<PolymerInfo>({
  //*材料名称/
  material: undefined,
  //*起始裂解温度/
  initial_temp: undefined,
  //*最大速率裂解温度/
  max_temp: undefined,
  //*最终裂解温度/
  end_temp: undefined,
  //*加热速率/
  rate: undefined,
  //*剩余质量/
  residual_mass: undefined,
  //*加热气氛/
  atmosphere: undefined,
  
});
const importedColumnName = state.RecordingnewColumn.name;
const Formnew = ref({
  dynamicFormItems: {},
});

// 如果importedColumnName不为空，根据其值建立新的表单项
if (importedColumnName !== '') {
  Formnew.value.dynamicFormItems[importedColumnName] = ''; // 你可以设置默认值或者留空，根据需要
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const newrules = {
  // 定义你的验证规则
};
const updateFormItem = (key, inputValue) => {
  // Use the inputValue to update your Formnew.dynamicFormItems
  Formnew.value.dynamicFormItems[key] = inputValue;
};
const rules = reactive<FormRules>({
  material: [{ required: true, message: "!", trigger: "blur" }],

  initial_temp: [
    { required: true, message: "请输入起始裂解温度!", trigger: "blur" }
  ],

  max_temp: [
    { required: true, message: "请输入最大速率裂解温度!", trigger: "blur" }
  ],

  end_temp: [
    { required: true, message: "请输入最终裂解温度!", trigger: "blur" }
  ],

  rate: [{ required: true, message: "请输入加热速率!", trigger: "blur" }],
  residual_mass: [
    { required: true, message: "请输入剩余质量!", trigger: "blur" }
  ],
  atmosphere: [{ required: true, message: "请选择加热气氛!", trigger: "blur" }]
});

let searchData;
const handleSearchData = () => {
  searchData = [];
  for (const [key, value] of Object.entries(Form)) {
    const obj = new Object();
    obj[`${key}`] = `${value}`;
    searchData.push(obj);
  }
  searchData = JSON.parse(JSON.stringify(searchData));
  let searchStr = "";
  for (const item of searchData) {
    for (const [key, value] of Object.entries(item)) {
      searchStr += key + "=" + value + "&";
    }
  }
  return searchStr;
};



defineExpose({
  handleSearchData,
  resetForm,
  FormRef
});
</script>

<template>
  <div>
    <el-form
      ref="FormRef"
      :inline="true"
      :model="Form"
      label-width="180px"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="材料名称:" prop="material">
        <el-input v-model="Form.material" />
      </el-form-item>

      <el-form-item label="起始裂解温度(℃):" prop="initial_temp">
        <el-input v-model="Form.initial_temp" />
      </el-form-item>

      <el-form-item label="最大速率裂解温度(℃):" prop="max_temp">
        <el-input v-model="Form.max_temp" />
      </el-form-item>

      <el-form-item label="最终裂解温度(℃):" prop="end_temp">
        <el-input v-model="Form.end_temp" />
      </el-form-item>

      <el-form-item label="剩余质量(%):" prop="residual_mass">
        <el-input v-model="Form.residual_mass" />
      </el-form-item>

      <!-- <el-form-item label="加热速率:" prop="rate">
        <el-input v-model="Form.rate" />
      </el-form-item> -->

      <el-form-item label="加热气氛:" prop="atmosphere">
        <el-select v-model="Form.atmosphere">
          <el-option label="氮气" value="氮气" />
          <el-option label="空气" value="空气" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-form
    v-if="importedColumnName !== ''"
    ref="FormnewRef"
    :inline="true"
    :model="Formnew"
    label-width="180px"
    label-position="left"
    :rules="newrules"
  >
    <el-form-item
      v-for="(value, key) in Formnew.dynamicFormItems"
      :key="key"
      :label="key"
      :prop="key"
    >
      <el-input v-model="Formnew.dynamicFormItems[key]"/>
    </el-form-item>
  </el-form>
  </div>
</template>
