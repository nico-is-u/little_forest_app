<template>
    <view id="page-group-buying">
      <!-- 正在开发中 -->
        <development
          title="好物正在赶来的路上..."
          desc="更多社区超值好礼即将开启，敬请期待！"
          :poster="posterImg"
        ></development>
    </view>
</template>

<script lang="ts" setup>
import { tabbarStore } from '../../tabbar/store'
import posterImg from '@/static/images/group-buying-poster.png'

/**
 * @description: 自定义组件
 */
import Development from '@/components/development/index.vue'

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

<style lang="scss" scoped>
#page-group-buying {
  padding-bottom: 310rpx;
}
</style>