<template>
    <view id="userinfo_card">
        <view class="section flex items-center">
            
            <view class="avatar">
                <!-- (旧)默认头像 -->
                <!-- <image src="@/static/images/default-portrait-male.jpg" mode="widthFix" /> -->
                <!-- 默认头像 -->
                <uv-avatar v-if="userInfo.userId === -1" text="森" size="60" fontSize="30" bg-color="#89c152"></uv-avatar>

            </view>

            <!-- 基本信息 -->
            <view v-if="userInfo.userId === -1" class="userinfo flex flex-col justify-center">
                <view class="signature">请点此登录</view>
            </view>

            <!-- 设置按钮 -->
            <view v-if="userInfo.userId !== -1"  class="other flex justify-center items-center">
                <uv-button class="uv-circle-button">
                    <uv-icon name="setting" size="22"></uv-icon>
                </uv-button>
            </view>

        </view>
    </view>
</template>

<script lang="ts">
import { useUserStore } from '@/store/user'
export default {
  name: 'UserInfoCard',
  setup() {
    /* 获取用户信息 */
    const userStore = useUserStore()
    const userInfo = userStore.userInfo

    return {
        userInfo
    }

  }
}
</script>

<style lang="scss">
#userinfo_card{
    padding: 80rpx 20rpx 10rpx;

    .avatar{
        border-radius: 50%;
        overflow: hidden;
        image{
            width: 120rpx;
        }
    }

    .userinfo{
        padding-left: 30rpx;
        flex-grow: 1;
        .nickname{
            font-size: 44rpx;
            font-weight: bold;
        }
        .signature{
            color: var(--app-text-gray-color);
            font-weight: 500;
        }
    }

    /* 设置按钮 */
    .other{
        width: 100rpx;
        height: 50rpx;
        .app-iconfont{
            font-size: 42rpx;
        }
    }

    
}
</style>