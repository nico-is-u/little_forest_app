<template>
  <view>
    <KuRootView />
    <FgTabbar v-if="isCurrentPageTabbar" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FgTabbar from '@/tabbar/index.vue'
import { isPageTabbar } from './tabbar/store'
import { currRoute } from './utils'

const isCurrentPageTabbar = ref(true)
onShow(() => {
  /* 防止链接为 / 的时候tabbar不出现 */
  const { path } = currRoute()
  isCurrentPageTabbar.value = (path === '/') ? true : isPageTabbar(path)

})
</script>
