<template>
  <view class="flex flex-col items-center justify-center">
    
    <!-- iconfont -->
    <template v-if="item.iconType === 'iconfont'">
      <view :class="[active ? item.iconActive : item.icon, isBulge ? 'text-80px' : 'text-55rpx']" />
    </template>

    <!-- 文字显示 -->
    <view v-if="!isBulge" class="tabbar-item-text text-35rpx">
      {{ getI18nText(item.text) }}
    </view>

    <!-- 角标显示 -->
    <view v-if="item.badge">
      <template v-if="item.badge === 'dot'">
        <view class="absolute right-0 top-0 h-2 w-2 rounded-full bg-#f56c6c" />
      </template>
      <template v-else>
        <view class="absolute top-0 box-border h-5 min-w-5 center rounded-full bg-#f56c6c px-1 text-center text-xs text-white -right-3">
          {{ item.badge > 99 ? '99+' : item.badge }}
        </view>
      </template>
    </view>
  </view>
</template>


<script setup lang="ts">
import type { CustomTabBarItem } from './types'
import { getI18nText } from './i18n'
import { tabbarStore } from './store'

defineProps<{
  item: CustomTabBarItem
  index: number
  isBulge?: boolean
  active: boolean
}>()

function getImageByIndex(index: number, item: CustomTabBarItem) {
  if (!item.iconActive) {
    console.warn('image 模式下，需要配置 iconActive (高亮时的图片），否则无法切换高亮图片')
    return item.icon
  }
  return tabbarStore.curIdx === index ? item.iconActive : item.icon
}
</script>
