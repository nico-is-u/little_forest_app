<template>
    <view>group.buying</view>
</template>

<script lang="ts" setup>
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