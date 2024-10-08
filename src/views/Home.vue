<script lang="ts" setup>
import { nextTick, onMounted, ref, useTemplateRef } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { IDirs, ISshForm, SourceType } from '../../types/index'
import { treeIconsMap } from '../utils/tree'

const menuOptions = [
  {
    label: '创建链接',
    key: 'createConnection',
    icon: 'mdi:link-plus',
  },
]
const sshFormRef = useTemplateRef<FormInstance>('sshFormRef')
const createConnectionVisible = ref(false)
const sshForm = ref<ISshForm>({
  linkName: '',
  username: '',
  host: '',
  password: '',
})

const sshFormRules = ref<FormRules<typeof sshForm>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})

const localHomeDir = ref<IDirs[]>([])
const links = ref<ISshForm[]>([])

onMounted(async () => {
  localHomeDir.value = await window.ipcRenderer.invoke('get:localHomeDir')
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
  links.value.push(sshForm.value)
}

async function lazyLoadNode(node: Node, resolve: (data: IDirs[]) => void) {
  console.log('lazy load', node)
  if (node.data.type !== 'directory') {
    return resolve([])
  }
  const path = node.data.path
  if (!path) {
    return
  }
  try {
    const res = await window.ipcRenderer.invoke('get:localDirs', path)
    console.log(res)
    resolve(res)
  }
  catch (e) {
    console.error(e)
    ElMessage.error('Operation not permitted')
    resolve([])
  }
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
      <div class="links w-50 b-r-1px b-r-#000 b-r-solid pl-2 pt-4">
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
        <div>
          <div v-for="link in links" :key="link.host"
            class="flex cursor-pointer items-center justify-between pb-1 pl-3 pr-3 pt-1 text-3">
            <div>{{ link.linkName ? link.linkName : link.host }}</div>
            <span class="ep:more-filled text-4 hover:text-[var(--el-color-primary)]" />
          </div>
        </div>
      </div>
      <div class="local h-100% flex-1 b-r-1px b-r-#000 b-r-solid">
        <el-tree :data="localHomeDir" node-key="path" :expand-on-click-node="true" :load="lazyLoadNode" :props="{
          isLeaf: 'leaf',
        }" lazy>
          <template #default="{ data }">
            <div class="flex items-center">
              <span class="mr-1" :class="[treeIconsMap[data.type as SourceType] || 'mdi:file']" />
              <span>{{ data.name }}</span>
            </div>
          </template>
        </el-tree>
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
      <el-form-item prop="linkName" label="链接名称:">
        <el-input v-model="sshForm.linkName" placeholder="请输入链接名称" />
      </el-form-item>
      <el-form-item prop="username" label="username:">
        <el-input v-model="sshForm.username" placeholder="请输入用户名称" />
      </el-form-item>
      <el-form-item prop="host" label="host: ">
        <el-input v-model="sshForm.host" placeholder="请输入主机地址" />
      </el-form-item>
      <el-form-item prop="password" label="password: ">
        <el-input v-model="sshForm.password" type="password" placeholder="请输入密码" show-password />
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
