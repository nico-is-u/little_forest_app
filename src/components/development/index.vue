<template>
    <view class="there-is-development flex flex-col justify-center items-center">
        
        <template v-if="poster">
            <image :src="poster" class="image" mode="aspectFit"></image>    
        </template>
        <template v-else>
             <image src="@/static/images/development.png" class="image" mode="aspectFit"></image>
        </template>

        <view class="text-group flex flex-col justify-center items-center">
            <view class="title text-2xl font-bold mt-4 mb-2">{{ title }}</view>
            <view class="desc text-gray-500 text-center">{{ desc }}</view>
        </view>

        <button class="app-btn app-btn-primary circle-1" @click="$goHref('/','tab')">
            <text class="app-iconfont if-icon-home-outline"></text>
            <text>去首页看看</text>
        </button>

    </view>
</template>

<script setup lang="ts">

/**
 * @description: 开发中组件
 */

defineProps({
    title: String,
    desc: String,
    poster: String
})
</script>

<style lang="scss" scoped>
.there-is-development{
    position: relative;
    padding-top: 100rpx;
    .poster{
        position: absolute;
        top: 75rpx;
        right: 25rpx;

        width: 250rpx;
        height: 250rpx;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);

        image{
            width: 230rpx;
            opacity: .75;
        }        
    }
    .text-group{
        .title{
            font-size: 60rpx;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 700;
        }
        .desc{
            font-size: 36rpx;
            margin-top: 28rpx;
            color:var(--app-text-dark-color2);

            width: 500rpx;
            line-height: 70rpx;
        }
    }

    .app-btn{
        width: 600rpx;
        margin-top: 60rpx;
        letter-spacing: 2rpx;

        font-weight: 500;

        .app-iconfont{
            font-size:46rpx;
            margin-right: 20rpx;
        }
    }
}
</style>