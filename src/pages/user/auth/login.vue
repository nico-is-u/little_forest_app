<template>
<view id="page-login" class="app-scroll-page">

    <!-- 返回按钮 -->
    <view class="back-btn-box" @click="$goHref('back')">
        <view class="back-btn-bg"></view>
        <image class="back-btn-icon" src="@/static/images/back-icon.png" mode="widthFix"></image>
    </view>

    <!-- LOGO区域 -->
    <view class="logo-box">
        <!-- <image src="@/static/images/logo-text.png" mode="widthFix"></image> -->
        <view class="h1 flex justify-center">{{ t('app.name') }}</view>
        <view class="flex justify-center desc">{{ t('app.slogan1') }}</view>
        <view class="flex justify-center">
          <view class="like-hr"></view>
        </view>
    </view>


    <!-- 表单区域 -->
    <view class="section mt-12">
      <view class="form-group">
        <!-- 请输入手机号 -->
        <view class="form-control" :class="focusId == 'phone' ? 'form-control-border' : ''" @click="formGetFocus('phone')">
          <view class="label label-icon text-right">
            <view class="app-iconfont if-icon-iPhone-line"></view>
          </view>
          <view class="form-content">
            <input id="formPhone" type="number" v-model="formData['phone']" :placeholder="t('form.enter') + t('form.phone')" :focus="formFocusPhone" @blur="formLoseFocus('phone')" :maxlength="11" >
          </view>
        </view>
  
        <!-- 请输入验证码 -->
        <view class="flex-row">
          <view class="flex-60">
            <view class="form-control" :class="focusId == 'verify-code' ? 'form-control-border' : ''" @click="formGetFocus('verify-code')">
              <view class="label label-icon text-right">
                <view class="app-iconfont if-icon-a-securitychose-line"></view>
              </view>
              <view class="form-content">
                <input id="formVerifyCode" type="number" v-model="formData['verifyCode']" :placeholder="t('form.verifyCode')" :maxlength="4" :focus="formFocusVerifyCode" @blur="formLoseFocus('verify-code')">
              </view>
            </view>
          </view>
          <view class="flex-40">
            <button class="app-btn app-btn-circle" @click="getSmsCode">{{t('app.get') + t('form.verifyCode')}}</button>
          </view>
        </view>
      </view>

      <!-- 立即登录/注册 -->
      <view class="btn-group mt-12">
        <button 
          class="app-btn2 app-btn-circle"
          :disabled="httpLoading"
          :loading="httpLoading"
          v-text="btnText"
          @click="submitCheck"></button>
        
        <!-- 底部说明 -->
        <view class="tips-group mt-12">
          <view class="row flex justify-center items-center">
            <view class="heng-dash"></view>
            <view class="app-iconfont if-icon-a-shareto-line"></view>
            <text>{{ t('form.otherLoginFunc') }}</text>
            <view class="heng-dash"></view>
          </view>

          <view class="row flex justify-center items-center mt-2">
            <view class="heng-dash"></view>
            <text>(测试验证码6666)</text>
            <view class="heng-dash"></view>
          </view>
        </view>

      </view>

    </view>

    <!-- 插件区域 -->
    <uv-toast ref="$toast"></uv-toast>

</view>
</template>

<script lang="ts" setup>
/******  (一般来说提供给H5和App的）登录页 ******/
import { nextTick,onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@/locale/index'

import useToast from '@/hooks/useToast'
import $goHref from '@/utils/goHref'
import { useUserStore } from '@/store/user'
import { getSmsCode as $http1 } from '@/api/common'
import { userLogin as $http2 } from '@/api/users'

/******* Datas *******/
const focusId = ref('')               /* 当前获得焦点的表单ID */
const $toast = ref<any>(null)         /* 提示组件实例 */
const $route = useRoute()             /* 路由实例 */
const userStore = useUserStore()      /* 用户信息状态管理实例 */
const httpLoading = ref(false)        /* 请求等待 */

const formData = reactive({
  phone: '18200000001',          /* 手机号 */
  verifyCode: '6666',     /* 验证码 */
})

const formFocusPhone = ref(false)
const formFocusVerifyCode = ref(false)

/******* Computed ********/
const btnText = computed(() => {
  return httpLoading.value ? t("app.httpLoading") : t("app.asap") + t("app.login") + '/' + t("app.register")
})

/******* Methods *******/

/* 表单焦点 */
const formGetFocus = (id: string) => {
  /* 先让外框高亮 */
  focusId.value = id
  if (id == 'phone')
      nextTick(() => formFocusPhone.value = true)
  if (id == 'verify-code')
      nextTick(() => formFocusVerifyCode.value = true)
        
}

const formLoseFocus = (id: string) => {
  focusId.value = ''
  if (id == 'phone')
    nextTick(() => formFocusPhone.value = false)
  if (id == 'verify-code')
    nextTick(() => formFocusVerifyCode.value = false)
}

/* 提交登录/注册请求 */
const goRequest = async () => {
  httpLoading.value = true
  try{
    const response = await $http2(formData)
    const {code = 0,data=''} = response as {code:number,data:string}
    if(code == 1){
      userStore.setUserToken(data)
      /* 继续请求用户信息 */
      await userStore.getUserInfo()
      /* 登录成功 */
      //$goHref('/pages/index?remind=1','')
    }
  }catch(e){
    console.log('???')
    /* 错误不在这里抛出 */
    httpLoading.value = false
  }
  
}

/* 表单验证 */
const submitCheck = () => {
  /* 手机号没输入 */
  if (!formData.phone) {
    useToast(t('form.enter') + t('form.phone'))
    formGetFocus('phone')
    return
  }
  /* 验证码没输入 */
  else if(!formData.verifyCode){
    useToast(t('form.enter') + t('form.verifyCode'))
    formGetFocus('verify-code')
    return
  }
  /* 手机号不合法 */
  else if(/^1[3-9]\d{9}$/.test(formData.phone) == false){
    useToast(t('form.enter') + t('form.correct') + t('form.phone'))
    formGetFocus('phone')
    return
  }
  /* 验证码不合法 */
  else if(/^\d{4}$/.test(formData.verifyCode) == false){
    useToast(t('form.enter') + t('form.correct') + t('form.verifyCode'))
    formGetFocus('verify-code')
    return
  }

  /* 所有验证通过 */
  else{
    goRequest()
  }
}

/* 获取短信验证码 */
const getSmsCode = async () => {
  /* 手机号没输入 */
  if (!formData.phone) {
    useToast(t('form.enter') + t('form.phone'))
    formGetFocus('phone')
    return
  /* 手机号不合法 */
  } else if(/^1[3-9]\d{9}$/.test(formData.phone) == false){
    useToast(t('form.enter') + t('form.correct') + t('form.phone'))
    formGetFocus('phone')
    return
  }

  const response = await $http1({phone:parseInt(formData.phone)})
  const {code = 0,msg=''} = response
  if(code == 1){
    useToast(msg)
  }


}

/*********  生命周期 ***********/
onMounted(() => {
  const {remind = 0} = $route.query as any
  if(remind == 1)
    useToast(t('user.login.remind'))
})

/*********  页面设置 ***********/
defineOptions({
  name: 'Login',
})
definePage({
  style: {
    navigationStyle: 'custom',
  },
})
</script>

<style lang="scss" scoped>
#page-login{
    padding-bottom: 280rpx;
    background-image: linear-gradient(to bottom, #f5fff6 , #f8faf8 , #f8faf8);

    .back-btn-box{

      height: 100rpx;
      top: 0;
      left: 0;

      .back-btn-bg{
        width: 150rpx;
        height: 150rpx;
        background-color: var(--app-green-color);
        transform: rotate(115deg) translateX(-30%) translateY(15%);

        position: absolute;
        z-index: 1;
      }

      .back-btn-icon{
        position: relative;
        z-index: 2;
        
        width: 80rpx;

        margin-top: 20rpx;
        margin-left: 28rpx;
      }

      &:active{
        .back-btn-bg{
          background-color: var(--app-primary-color3);
        }
      }

    }

    .logo-box{

        width: 100%;
        padding-top: 100rpx;

        .h1{
          height: auto;

          font-size: 120rpx;
          font-weight: 900;
          color: var(--app-text-color2);
          text-shadow: 0 0 20px rgba(0, 105, 71, 0.1);
        }

        .desc{
            color: var(--app-text-dark-color2);
            margin-top: 22rpx;

            font-size: 44rpx;
            font-weight: 600;
        }

        .like-hr{
          width: 96rpx;
          height: 8rpx;
          background-color: #00694733;
          border-radius: 4rpx;

          margin-top: 24rpx;
        }
    }
}

.app-scroll-page{

  .app-btn2{

    height: 140rpx;
    font-size: 40rpx;
    font-weight: bold;

    &.app-btn-circle{
      border-radius: 70rpx !important;
    }

  }

  .tips-group{
    font-size: 30rpx;
    font-weight: 600;
    color: var(--app-input-placeholder);

    .app-iconfont{
      font-size: 34rpx;
      margin-right: 16rpx;
    }

  }


}

</style>