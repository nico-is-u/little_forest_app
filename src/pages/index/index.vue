<template>
  <view id="page-index">
    <say-hi />
  </view>
</template>


<script lang="ts" setup>

import { onShow } from '@dcloudio/uni-app'
import { tabbarStore } from '../../tabbar/store'

/* 自定义组件 */
import SayHi from '@/components/say_hi/index.vue'

/**
 * @确认tabbar的高亮是否正确
 */
onShow(() => tabbarStore.confirmCurIdex(0))

defineOptions({
  name: 'Home',
})
definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
  },
  excludeLoginPath: true, // 该页面不需要登录即可访问
})
</script>

<style lang="scss" scoped>

</style>
