<template>
  <view id="page-index">
    <say-hi />
  </view>
</template>


<script lang="ts" setup>
/* 自定义组件 */
import SayHi from '@/components/say_hi/index.vue'


defineOptions({
  name: 'Home',
})
definePage({
  type: 'home',
  style: {
    navigationStyle: 'custom',
  },
})
</script>

<style lang="scss" scoped>

</style>
