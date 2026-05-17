<template>
    <!-- 用户未登录 -->
    <uv-avatar v-if="!userHasLogin" text="森" size="60" fontSize="30" bg-color="#89c152"></uv-avatar>
    <!-- 用户已登录 -->
    <view class="user-portrait" v-else>
        <!-- 默认头像 -->
        <image v-if="!userInfo.portrait" :src="defaultPortrait"></image>
        <!-- 用户头像 -->
        <image v-else :src="userPortrait"></image>
    </view>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/user'

import defaultPortraitMale from '@/static/images/default-portrait-male.jpg'
import defaultPortraitFemale from '@/static/images/default-portrait-female.jpg'

const { VITE_ASSETS_BASEURL } = import.meta.env

export default {
    name: 'UserPortrait',
    setup(){
        /* 获取用户信息 */
        const userStore = useUserStore()
        const userHasLogin = userStore.hasLogin
        const userInfo = userStore.userInfo

        /* 设置默认头像 和 用户头像 */
        const defaultPortrait = userInfo.sex == 1 ? defaultPortraitMale : defaultPortraitFemale
        const userPortrait = computed(() => userInfo.portrait ? VITE_ASSETS_BASEURL + userInfo.portrait : '')

        return {
            userHasLogin,
            userInfo,
            defaultPortrait,
            userPortrait,
        }
    }
}
</script>
