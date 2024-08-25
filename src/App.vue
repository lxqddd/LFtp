<script setup lang="ts">
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
import Home from './views/Home.vue'
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme="darkTheme">
    <Home />
  </NConfigProvider>
</template>
