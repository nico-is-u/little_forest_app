<template>
    <view>group.buying</view>
</template>

<script lang="ts" setup>
import { tabbarStore } from '../../tabbar/store'

/**
 * @确认tabbar的高亮是否正确
 */
onShow(() => tabbarStore.confirmCurIdex(2))

defineOptions({
  name: 'GroupBuyingIndex',
})

definePage({
  style: {
    navigationStyle: 'custom',
  },
  excludeLoginPath: true, // 该页面不需要登录即可访问
})
</script>