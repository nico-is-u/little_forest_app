<template>
    <view class="section say_hi_to_users">
        <view class="row font-bold">{{ greeting }}</view>
        <view class="row row2 font-bold">{{ greetingWithName }}</view>
    </view>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

console.log(userInfo.value)

/**
 * 根据当前时间返回问候语
 * @returns 问候语字符串
 */
const getGreeting = (): string => {
  const now = new Date()
  const hour = now.getHours()
  switch (true) {
    case hour >= 3 && hour < 8:
      return '早安,'
    case hour >= 8 && hour < 12:
      return '上午好,'
    case hour >= 12 && hour < 14:
      return '中午好,'
    case hour >= 14 && hour < 18:
      return '下午好,'
    default:
      return '晚上好,'
  }
}

/**
 * 根据登录状态和用户昵称返回问候语
 * @returns 问候语字符串
 */
const getGreetingWithName = (): string => {
  /* 未登录 */
  if (userInfo.value.username === '') {
    return '小森邻!'
  } else {
    return ''
  }
}


// 响应式问候语
const greeting = getGreeting()
const greetingWithName = getGreetingWithName()

</script>

<style lang="scss" scoped>
.say_hi_to_users{
    padding-top: 100rpx;
    color: var(--app-text-block-color);

    .row{
        font-size: 112rpx;
        line-height: 1.25;
        letter-spacing: -2.8rpx;
    }

    .row2{
        color: var(--app-primary-color2);
    }


}
</style>