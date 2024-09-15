<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import dateZhCN from 'dayjs/locale/zh-cn'
import Home from './views/Home.vue'
</script>

<template>
  <el-config-provider :locale="zhCn" :date-locale="dateZhCN">
    <Home />
  </el-config-provider>
</template>
