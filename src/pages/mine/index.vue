<template>
    <view id="page-mine-index" >

      <!-- 用户信息卡 -->
      <user-info-card />

      <!-- 主要内容 -->
      <view class="section mt-5">

        <!-- 积分，余额，优惠券 -->
        <view class="user-info-list-1 flex" v-if="userStore.hasLogin">
          <!-- 积分 -->
          <view class="user-info-list-1-item">
            <text class="row1">{{ userStore.userInfo.integral }}</text>
            <text class="row2">积分</text>
          </view>
          <view class="user-info-list-1-item">
            <text class="row1">{{ userStore.userInfo.balance }}</text>
            <text class="row2">余额</text>
          </view>
          <view class="user-info-list-1-item">
            <text class="row1">{{ userStore.userInfo.couponCount }}</text>
            <text class="row2">优惠券</text>
          </view>
        </view>

        <!-- 我的订单 -->
        <view class="order-box card-box mt-6">
          <view class="card-box-header">
            <text class="title">我的订单</text>
            <view class="right-side">
              <text>查看全部</text>
              <text class="ml-1 arrow">></text>
            </view>
          </view>

          <view class="card-box-body">
            <view class="th3-list">
              <view class="item">
                <view class="icon-circle">
                  <text class="app-iconfont if-icon-a-package2-line"></text>
                </view>
                <text class="title">待收货</text>
              </view>
              <view class="item">
                <view class="icon-circle">
                  <text class="app-iconfont if-icon-store"></text>
                </view>
                <text class="title">待自提</text>
              </view>
              <view class="item">
                <view class="icon-circle">
                  <text class="app-iconfont if-icon-local_shipping"></text>
                </view>
                <text class="title">快递中</text>
              </view>
            </view>
          </view>

        </view>

        <!-- 功能列表 -->
        <view class="options-list card-box mt-6">
          <view class="card-box-body cell-list">
            <!-- 地址管理 -->
            <view class="cell-item">
              <view class="left-side">
                <text class="app-iconfont if-icon-locationon"></text>
                <text class="title">地址管理</text>
              </view>
              <view class="right-side">
                <text class="app-iconfont if-icon-a-rightsmallline-line"></text>
              </view>
            </view>

            <!-- 联系客服 -->
            <view class="cell-item">
              <view class="left-side">
                <text class="app-iconfont if-icon-support-agent"></text>
                <text class="title">联系客服</text>
              </view>
              <view class="right-side">
                <text class="app-iconfont if-icon-a-rightsmallline-line"></text>
              </view>
            </view>

            <!-- 关于我们 -->
            <view class="cell-item">
              <view class="left-side">
                <text class="app-iconfont if-icon-admonish-line"></text>
                <text class="title">关于我们</text>
              </view>
              <view class="right-side">
                <text class="app-iconfont if-icon-a-rightsmallline-line"></text>
              </view>
            </view>

          </view>
        </view>

        <!-- 点击联系客服 -->
        <view class="app-cell-card style-1 mt-6">
          <view class="app-iconfont-box">
            <view class="app-iconfont if-icon-call"></view>
          </view>
          <view class="app-content">
            <view class="app-title">一键呼叫客服</view>
            <view class="app-desc">为您解决任何使用难题</view>
          </view>
          <view class="app-iconfont if-icon-a-rightsmallline-line"></view>
        </view>

        <!-- 退出登录 -->
        <button class="mt-6 app-btn app-btn-danger circle-2" @click="modalLogout = true">
          <text class="app-iconfont if-icon-login-variant"></text>
          <text>退出登录</text>
        </button>

      </view>

      <!-- 插件 -->
      <common-modal
        :modal="modalLogout"
        type="danger"
        title="确定要退出登录吗？"
        desc="退出后可从服务小助手接收服务通知。"
        icon="if-icon-login-variant"
        :iconStar="true"
        confirmText="退出登录"
        confirmIcon="if-icon-login-variant"
        @confirm="goLogout"
        @close="modalLogout=$event"
      ></common-modal>

    </view>
</template>

<script lang="ts" setup>
/******  @page 个人页 ******/
import { useUserStore } from '@/store/user'
import goHref from '@/utils/goHref'

const userStore = useUserStore()      /* 用户信息状态管理实例 */

/*********  自定义组件 ***********/
import UserInfoCard from '@/components/users/info_card/index.vue'
import CommonModal from '@/components/common/modal/index.vue'

/******* Datas *******/
const modalLogout = ref(false)        /* 模态框（注销） */


/******* Methods *******/
const goLogout = () => {
  userStore.userLogout()
  goHref('/','tab')
}


/*********  页面设置 ***********/
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
  padding-top: 20rpx;
  padding-bottom: 310rpx;

  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: scroll;

  .user-info-list-1{

    gap: 14rpx;

    .user-info-list-1-item{
      width: 33.33%;
      height: 180rpx;
      border-radius: 28rpx;
      background-color: var(--app-box-bg-color);

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10rpx;

      .row1{
        font-size: 40rpx;
        font-weight: 700;
        color: var(--app-text-color2);
      }

      .row2{
        font-size: 30rpx;
        color: var(--app-text-gray-color);
      }

    }

  }

}

</style>