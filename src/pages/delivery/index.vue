<template>
    <view id="page-delivery">
      <view class="section">

        <!-- 正在开发中 -->
        <development
          title="功能正在努力建设中..."
          desc="小森邻正在为您准备快递代取服务，敬请期待！"
          :poster="posterImg"
        ></development>

        
      </view>


    </view>
</template>

<script lang="ts" setup>
import { tabbarStore } from '../../tabbar/store'
import posterImg from '@/static/images/delivery-poster.png'

/**
 * @description: 自定义组件
 */
import Development from '@/components/development/index.vue'


 /**
 * @description: 确认tabbar的高亮是否正确
 */

onShow(() => tabbarStore.confirmCurIdex(1))

defineOptions({
  name: 'DeliveryIndex',
})

definePage({
  style: {
    navigationStyle: 'custom',
  },
  excludeLoginPath: true, // 该页面不需要登录即可访问
})
</script>

<style lang="scss" scoped>
#page-delivery{
  padding-bottom: 310rpx;
}
</style>