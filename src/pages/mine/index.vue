<template>
    <view id="page-mine-index">

        <userinfo-card />

        <view class="section mt-8">
          <!-- 列表1 -->
          <view class="app-uv-cell-group">
            <!-- 地址管理 -->
            <view class="app-uv-cell">
              <view class="app-iconfont if-icon-admonish-fill"></view>
              <view class="app-title">地址管理</view>
              <view class="app-iconfont if-icon-a-rightsmallline-line"></view>
            </view>
            <!-- 地址管理 -->
            <view class="app-uv-cell">
              <view class="app-iconfont if-icon-admonish-fill"></view>
              <view class="app-title">地址管理</view>
              <view class="app-iconfont if-icon-a-rightsmallline-line"></view>
            </view>
          </view>
        </view>

        <!-- 列表2 -->
        <view class="section mt-6">
          <!-- 点击联系客服 -->
          <view class="app-cell-card style-1">
            <view class="app-iconfont-box">
              <view class="app-iconfont if-icon-call"></view>
            </view>
            <view class="app-content">
              <view class="app-title">一键呼叫客服</view>
              <view class="app-desc">为您解决任何使用难题</view>
            </view>
            <view class="app-iconfont if-icon-a-rightsmallline-line"></view>
          </view>

          <uv-row class="mt-4" gutter="14">
            <uv-col span="6">
              <!-- 常见问题 -->
              <view class="app-cell-card style-2">
                <view class="app-iconfont-box">
                  <view class="app-iconfont if-icon-a-Informationquestions-fill"></view>
                </view>
                <view class="app-content">
                  <view class="app-title">常见问题</view>
                </view>
              </view>
            </uv-col>
            <uv-col span="6">
              <!-- 关于我们 -->
              <view class="app-cell-card style-2">
                <view class="app-iconfont-box">
                  <view class="app-iconfont if-icon-admonish-line"></view>
                </view>
                <view class="app-content">
                  <view class="app-title">关于我们</view>
                </view>
              </view>
            </uv-col>
          </uv-row>

        </view>

    </view>
</template>

<script lang="ts" setup>
/* 自定义组件 */
import UserinfoCard from '@/components/userinfo_card/index.vue'

defineOptions({
  name: 'MineIndex',
})
definePage({
  style: {
    navigationStyle: 'custom',
  },
})

</script>

<style lang="scss" scoped>
#page-mine-index{
  padding-bottom: 310rpx;
}

</style>