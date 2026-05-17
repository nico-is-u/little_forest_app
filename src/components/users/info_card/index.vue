<template>
    <view id="user_info_card">
        <view class="section flex items-center">

            <!-- 用户头像 -->
            <view class="avatar-box">
                <user-portrait />
            </view>
            
            <!-- 基本信息 -->
            <view v-if="userHasLogin" class="user-info flex flex-col justify-center">
                <view class="nickname">{{ userInfo.nickname }}</view>
                <view class="signature">{{ userInfo.phone }}</view>
            </view>
            <view v-else class="user-info flex flex-col justify-center">
                <view class="signature">请点此登录</view>
            </view>
            
            <!-- 设置按钮 -->
            <view v-if="userHasLogin" class="other flex justify-center items-center">
                <uv-button class="uv-circle-button" @click="$goHref('/pages/user/settings')">
                    <uv-icon name="setting-fill" size="22"></uv-icon>
                </uv-button>
            </view>

        </view>
    </view>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'

/*********  自定义组件 ***********/
import userPortrait from '../portrait/index.vue'

export default {
    name: 'UserInfoCard',
    setup() {
        /* 获取用户信息 */
        const userStore = useUserStore()
        const userHasLogin = userStore.hasLogin
        const userInfo = userStore.userInfo

        return {
            userHasLogin,
            userInfo,
        }
    },
    components: {
        userPortrait
    }
}
</script>

<style lang="scss" scoped>
#user_info_card{
    padding: 80rpx 20rpx 10rpx;

    .user-info{
        padding-left: 30rpx;
        flex-grow: 1;
        gap: 4rpx;

        margin-bottom: 5rpx;

        .nickname{
            font-size: 44rpx;
            font-weight: bold;
            letter-spacing: 1rpx;
        }
        .signature{
            color: var(--app-text-gray-color);
            font-size: 30rpx;
            font-weight: 500;
            letter-spacing: 2rpx;
        }
        
    }
}
</style>