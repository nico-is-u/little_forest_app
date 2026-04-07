<template>
  <view v-if="customTabbarEnable" class="border-and-fixed" @touchmove.stop.prevent>
    <view id="app-tabbar"  class="flex items-center bg-white">
      <view v-for="(item, index) in tabbarList" :key="'tabbar-item-' + index"
        class="flex flex-col items-center justify-center flex-none" :class="tabbarStore.curIdx === index ? 'app-tabbar-item app-tabbar-item-active' : 'app-tabbar-item'"
        @click="handleClick(index)"
      >
        <view v-if="item.isBulge" class="relative">
          <!-- 中间一个鼓包tabbarItem的处理 -->
          <view class="bulge">
            <TabbarItem :item="item" :index="index" :active="tabbarStore.curIdx === index" class="text-center" is-bulge />
          </view>
        </view>
        <TabbarItem v-else :item="item" :index="index" :active="tabbarStore.curIdx === index" class="relative px-3 text-center" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// i-carbon-code
import { customTabbarEnable, needHideNativeTabbar, tabbarCacheEnable } from './config'
import { setTabbarItem } from './i18n'
import { tabbarList, tabbarStore } from './store'
import TabbarItem from './TabbarItem.vue'

// #ifdef MP-WEIXIN
// 将自定义节点设置成虚拟的（去掉自定义组件包裹层），更加接近Vue组件的表现，能更好的使用flex属性
defineOptions({
  virtualHost: true,
})
// #endif

/**
 * 中间的鼓包tabbarItem的点击事件
 */
function handleClickBulge() {
  uni.showToast({
    title: '点击了中间的鼓包tabbarItem',
    icon: 'none',
  })
}

function handleClick(index: number) {
  // 点击原来的不做操作
  if (index === tabbarStore.curIdx) {
    return
  }
  const list = tabbarList.value
  if (!list[index]) {
    return
  }
  if (list[index].isBulge) {
    handleClickBulge()
    return
  }
  const url = list[index].pagePath
  tabbarStore.setCurIdx(index)
  if (tabbarCacheEnable) {
    uni.switchTab({ url })
  }
  else {
    uni.navigateTo({ url })
  }
}
// #ifndef MP-WEIXIN || MP-ALIPAY
// 因为有了 custom:true， 微信里面不需要多余的hide操作
onLoad(() => {
  // 解决原生 tabBar 未隐藏导致有2个 tabBar 的问题
  needHideNativeTabbar
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif

// #ifdef MP-ALIPAY
onMounted(() => {
  // 解决支付宝自定义tabbar 未隐藏导致有2个 tabBar 的问题; 注意支付宝很特别，需要在 onMounted 钩子调用
  customTabbarEnable // 另外，支付宝里面，只要是 customTabbar 都需要隐藏
  && uni.hideTabBar({
    fail(err) {
      console.log('hideTabBar fail: ', err)
    },
    success(res) {
      // console.log('hideTabBar success: ', res)
    },
  })
})
// #endif

// 注意，上面处理的是自定义tabbar，下面处理的是原生tabbar，参考：https://unibest.tech/base/10-i18n
onShow(() => {
  setTabbarItem()
})
</script>

<style scoped lang="scss">
.border-and-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
}

.bg-white{
  background-color: rgb(255 255 255 / 0.9);
}

#app-tabbar{
  height: 250rpx;
  border-top-left-radius: 100rpx;
  border-top-right-radius: 100rpx;
  box-shadow: 0px -8rpx 40rpx rgba(0, 0, 0, 0.02);
  border: 1rpx solid var(--app-border-color);

  padding-left: 50rpx;
}

.app-tabbar-item{
  width: 160rpx;
  height: 160rpx;
  border-radius: 50rpx;

  color: var(--app-text-color2);
  font-family:sans-serif;
  font-weight: 500;

  &.app-tabbar-item-active{
    background-color: var(--app-secondary-color);
    font-weight: 700;
  }
}

</style>
