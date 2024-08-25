<script lang="ts" setup>
import { NDropdown } from 'naive-ui'
import { h } from 'vue'

function renderIcon(icon: string) {
  return () => {
    return h('span', { class: `text-6 ${icon}` })
  }
}

const menuOptions = [
  {
    label: '创建链接',
    key: 'createConnection',
    icon: renderIcon('mdi:link-plus'),
  },
]

function handleSelect(key: string | number) {
  console.log(key)
}
</script>

<template>
  <div class="h-100vh flex flex-col text-[rgba(255,255,255,0.87)] bg-#2a2927">
    <!-- <div class="bar pl-20 pr-20 h-8">
      this is bar
    </div> -->
    <div class="flex flex-1">
      <div class="menu w-50 b-r-solid b-r-#000 b-r-1px pl-2 pt-4">
        <div class="text-align-end pr-2">
          <NDropdown :options="menuOptions" @select="handleSelect">
            <span class="text-6 mdi:menu" />
          </NDropdown>
        </div>
      </div>
      <div class="local h-100% flex-1 b-r-solid b-r-#000 b-r-1px">
        this is local
      </div>
      <div class="remote flex-1 b-r-solid b-r-#000 b-r-1px">
        this is remote
      </div>
      <div class="info w-50">
        this is info
      </div>
    </div>
  </div>
</template>
