<script setup lang="ts">
import { reactive, ref, toRaw } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import { addUserData, putUserData } from "@/api/userTable";
const userFormRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const emit = defineEmits(["ok"]);

//*表单数据源/
const userForm = reactive({
  title: "",
  username: "",
  password: "",
  phone: "",
  role: ""
});

//*表单检验规则设置/

const checkPass = (rule: any, value: any, callback: any) => {
  if (value.length < 6) {
    callback(new Error("密码至少为6位"));
  } else {
    callback();
  }
};
const checkPhone = (rule: any, value: any, callback: any) => {
  setTimeout(() => {
    if (isNaN(Number(value))) {
      callback(new Error("请输入数字"));
    } else {
      if (value.toString().length != 11) {
        callback(new Error("手机号码必须是11位"));
      } else {
        callback();
      }
    }
  }, 1000);
};

const rules = reactive<FormRules>({
  password: [{ validator: checkPass, trigger: "blur" }],
  phone: [{ validator: checkPhone, trigger: "blur" }]
});

const handleClose = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const handleCancel = (formEl: FormInstance | undefined) => {
  dialogFormVisible.value = false;
  formEl.resetFields();
};

const handleConfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      const _userData = { ...toRaw(userForm) };
      const _api = data => {
        if (data.id) {
          return putUserData(data.id, data);
        } else {
          return addUserData(data);
        }
      };
      _api(_userData).then(res => {
        if (res.success) {
          ElMessage({
            message: "提交信息成功！",
            type: "success"
          });
          emit("ok");
        } else {
          ElMessage({
            message: "出错了,后端校验失败！",
            type: "error"
          });
        }
      });
      dialogFormVisible.value = false;
      formEl.resetFields();
    } else {
      ElMessage({
        message: "出错了,前端校验失败！",
        type: "error"
      });
      return false;
    }
  });
};

const add = () => {
  dialogFormVisible.value = true;
  userForm.title = "创建用户";
};
const edit = row => {
  dialogFormVisible.value = true;
  userForm.title = "编辑用户";
  Object.assign(userForm, row);
  userForm.password = "";
};
defineExpose({
  add,
  edit
});
</script>

<template>
  <div>
    <ElDialog
      v-model="dialogFormVisible"
      :title="userForm.title"
      @close="handleClose(userFormRef)"
    >
      <ElForm
        :model="userForm"
        ref="userFormRef"
        status-icon
        :rules="rules"
        label-width="120px"
      >
        <ElFormItem
          label="用户名"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: '用户名是必填项' }]"
          prop="username"
        >
          <ElInput v-model="userForm.username" clearable />
        </ElFormItem>
        <ElFormItem
          label="密码"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: '密码是必填项' }]"
          prop="password"
        >
          <ElInput
            v-model="userForm.password"
            type="password"
            :show-password="true"
            clearable
          />
        </ElFormItem>
        <ElFormItem
          label="电话"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: '电话是必填项' }]"
          prop="phone"
        >
          <ElInput v-model.number="userForm.phone" :maxlength="11" clearable />
        </ElFormItem>
        <ElFormItem
          label="角色"
          :label-width="formLabelWidth"
          :rules="[{ required: true, message: '角色是必填项' }]"
          prop="role"
        >
          <ElSelect v-model="userForm.role" placeholder="请分配角色身份">
            <ElOption label="管理员" value="admin" />
            <ElOption label="普通用户" value="common" />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="handleCancel(userFormRef)">取消</ElButton>
          <ElButton type="primary" @click="handleConfirm(userFormRef)">
            确认
          </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped></style>
