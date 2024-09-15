<script lang="ts" setup>
import { nextTick, ref, useTemplateRef } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const menuOptions = [
  {
    label: '创建链接',
    key: 'createConnection',
    icon: 'mdi:link-plus',
  },
]
const sshFormRef = useTemplateRef<FormInstance>('sshFormRef')
const createConnectionVisible = ref(false)
const sshForm = ref({
  username: '',
  host: '',
  password: '',
})

const sshFormRules = ref<FormRules<typeof sshForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

async function showCreateConnectDialog() {
  createConnectionVisible.value = true
  await nextTick()
  console.log(sshFormRef.value)
  sshFormRef.value?.resetFields()
}

function handleCancelCreateConnect() {
  createConnectionVisible.value = false
}

function handleCreateConnect() {
  createConnectionVisible.value = false
}

async function handleSelect(key: string) {
  switch (key) {
    case 'createConnection':
      await showCreateConnectDialog()
      break
  }
}
</script>

<template>
  <div class="h-100vh flex flex-col">
    <div class="flex flex-1">
      <div class="menu w-50 b-r-1px b-r-#000 b-r-solid pl-2 pt-4">
        <div class="pr-2 text-align-end">
          <el-dropdown>
            <span class="mdi:menu cursor-pointer text-6" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in menuOptions" :key="item.key" @click="handleSelect(item.key)">
                  <span :class="item.icon" class="mr-2" /> {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="local h-100% flex-1 b-r-1px b-r-#000 b-r-solid">
        this is local
      </div>
      <div class="remote flex-1 b-r-1px b-r-#000 b-r-solid">
        this is remote
      </div>
      <div class="info w-50">
        this is info
      </div>
    </div>
  </div>
  <el-dialog v-model="createConnectionVisible" title="创建链接" width="500px">
    <el-form ref="sshFormRef" :model="sshForm" label-width="100px" :rules="sshFormRules">
      <el-form-item prop="username" label="username:">
        <el-input v-model="sshForm.username" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item prop="host" label="host: ">
        <el-input v-model="sshForm.host" placeholder="请输入主机地址" />
      </el-form-item>
      <el-form-item prop="password" label="password: ">
        <el-input v-model="sshForm.password" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancelCreateConnect">
        取消
      </el-button>
      <el-button type="primary" @click="handleCreateConnect">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
