<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { navigateToInterceptor } from '@/router/interceptor'

onLaunch((options) => {
  const userToken = uni.getStorageSync('app-user-token')
  if (userToken) {
    const userStore = useUserStore()
    userStore.setUserToken(userToken)
    /* 在这里异步更新一次用户信息，确保用户信息是最新的（如果401则也从这里弹出） */
    const userInfo = uni.getStorageSync('app-user-info')
    userStore.setUserInfo(userInfo)
    userStore.getUserInfo()
  }
})

onShow((options) => {
  // 处理直接进入页面路由的情况：如h5直接输入路由、微信小程序分享后进入等 （https://github.com/unibest-tech/unibest/issues/192）
  if (options?.path) {
    navigateToInterceptor.invoke({ url: `/${options.path}`, query: options.query })
  }
  else {
    navigateToInterceptor.invoke({ url: '/' })
  }
})

/* onHide(() => {}) */

</script>

<style lang="scss">
/* 在pc限制最大宽度 并且居中显示 */
#app{
  max-width: var(--pc-max-width);
  margin: 0 auto;

  font-size: 28rpx;
  font-family: sans-serif;


  /**************** App自定义组件 ****************/
  
  /* 用户信息卡 */
  .user-portrait{
    width: 130rpx;
    height: 130rpx;
    border-radius: 50%;
    overflow: hidden;

    image{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  /* 卡片盒子容器 */
  .card-box{
    background-color: white;

    border-radius: 32rpx;

    border: 1.6rpx solid rgba(188,202,192,.3);
    box-shadow: 0 2rpx 4rpx 0 rgb(0 0 0 / 0.05);

    // padding-top: 32rpx;
    
    .card-box-header{
      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 2rpx solid rgba(188,202,192,.3);
      height: 120rpx;
      
      padding: 0 48rpx;

      .title{
        font-size: 36rpx;
        line-height: 56rpx;
        font-weight: 700;
      }

      .right-side{
        font-weight: 700;
        font-family: SimHei;
        color: var(--app-text-color2);
        letter-spacing: 2rpx;

        padding: 12rpx 0rpx 12rpx 10rpx;

        .arrow{
          font-size: 24rpx;
        }

        &:active{
          background-color: var(--app-box-bg-color);
        }

      }

    }

    .card-box-body{
      padding: 48rpx;
    }
  }

  /* 模态框 */
  .app-modal{
    width: 100%;

    .app-modal-icon-group{
    
      width: 100%;

      display: flex;
      justify-content: center;

      padding-top: 27rpx;
      margin-bottom: 54rpx;

      .icon-circle{
        position: relative;

        .app-modal-star{
          &::before{
            content: '';
            width: 30rpx;
            height: 30rpx;
            border-radius: 50%;
  
            position: absolute;
            top: 70%;
            left: -26rpx;
            
            background-color: #86f8c2;
          }
          &::after{
            content: '';
            width: 50rpx;
            height: 50rpx;
            border-radius: 50%;

            position: absolute;
            top: -13rpx;
            right: -13rpx;

            background-color: #c9eadb;
          }
        }
      }
    }

    .app-modal-content{
      min-height: 200rpx;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .app-modal-title{
        font-size: 46rpx;
        font-weight: 600;
        letter-spacing: 2rpx;
      }
      
      .app-modal-desc{
        font-size: 34rpx;
        color: var(--app-text-gray-color);
        margin: 32rpx 0 60rpx;
        padding: 0 12rpx;
        line-height: 1.6;
        letter-spacing: 2rpx;

        text-align: center;
      }

    }

    .app-modal-btn-group{
      display: flex;
      flex-direction: column;
      gap: 32rpx;

      width: 100%;
      padding-bottom: 10rpx;

      .app-btn{
        width: 100%;
      }

    }
  }

  /***************** 其他工具 *****************/
  .heng-dash{
    width: 90rpx;
    height: 2rpx;
    background-color: rgba(188,202,192,.3);
    margin: 0 30rpx;
  }

  /**************** flex分栏工具 ****************/
  .flex-row{
    display: flex;
    align-items: center;

    gap: 32rpx;

    .flex-40{
      width: 40%;
    }
    .flex-50{
      width: 50%;
    }
    .flex-60{
      width: 60%;
    }
    
  }

  /**************** 按钮工具 ****************/
  .uv-circle-button{
    .uv-button.uv-button--square{
      width:88rpx;
      height: 88rpx;
      border-radius: 50%;
      background-color: #eceeec;
    }
  }

  /* 带圈图标 */
  .icon-circle{
    width: 96rpx;
    height: 96rpx;
    background-color: var(--app-primary-color4);

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;

    .app-iconfont{
      font-size: 48rpx;
      color: var(--app-text-color2);
    }

    &.icon-circle-l{
      width: 168rpx;
      height: 168rpx;
      .app-iconfont{
        font-size: 84rpx;
      }
    }

    &.icon-circle-xl{
      width: 192rpx;
      height: 192rpx;
    }

    /********  主题色  *********/
    &.icon-circle-danger{
      background-color: var(--app-red-color2);
      .app-iconfont{
        color: var(--app-text-red-color);
      }
    }

  }
  
  /**************** 列表 ****************/
  .app-uv-cell-group{

      display: flex;
      flex-direction: column;
      gap: 1rem;

      box-sizing: border-box;
      padding: 1.5rem 1rem;
      border-radius: 2rem;
      background-color: #f2f4f2;

      .uv-cell-group{
        border-radius: 1.25rem;
        background-color: white;
        overflow: hidden;
      }

      .app-uv-cell{
        display: flex;
        align-items: center;
        height: 120rpx;
        border-radius: 1.75rem;
        padding: 0 1.25rem;
        background-color: white;

        .app-iconfont{
          width: 80rpx;
          font-size: 50rpx;
          color: var(--app-text-color2);

          padding-top: 6rpx;

          /* 右侧箭头 */
          &.if-icon-a-rightsmallline-line{
            padding-top: 0;
            text-align: right;
            color: var(--app-icon-dark-color);
          }

        }

        .app-title{
          font-size: 36rpx;
          flex-grow: 1;
          font-weight: 700;
          color: var(--app-text-block-color);
        }

        &:active{
          background-color: #eceeec;
        }
        
      }

  }

  .app-cell-card{
    display: flex;
    align-items: center;

    background-color: white;
    padding: 1.2rem 1.4rem;
    border-radius: 2rem;

    box-shadow: 0px 4px 20px rgba(0, 105, 71, 0.06);

    &.style-1{
      padding: 48rpx 1.4rem;
      border-radius: 32rpx;
      box-shadow: none;
      background-color: rgba(0,133,91,.1);
      border: 2rpx solid rgba(0,105,71,.2);

      .app-iconfont-box{
        width: 100rpx;
        height: 100rpx;
        background-color: var(--app-text-color2);

        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        transform: translateY(4rpx);

        .app-iconfont{
          font-size: 50rpx;
          color: white;
        }
      }

      /* 内容正文 */
      .app-content{
        flex-grow: 1;
        padding-left: 1rem;

        .app-title{
          font-size: 36rpx;
          font-weight: 700;
          color: var(--app-text-block-color);
        }

        .app-desc{
          color: var(--app-icon-dark-color);
          margin-top: 2rpx;
        }

      }

      /* 右箭头 */
      .if-icon-a-rightsmallline-line{
        display: flex;
        align-items: center;
        justify-content: flex-end;

        width: 80rpx;
        font-size: 50rpx;
        color: var(--app-icon-dark-color);
      }

    }

    &.style-2{
      flex-direction: column;
      align-items: flex-start;

      padding: 1.55rem 1.75rem;

      .app-iconfont-box{
        .app-iconfont{
          font-size: 54rpx;
          color: var(--app-text-color2);
        }
      }

      .app-content{

        margin-top: .35rem;

        .app-title{
          font-size: 36rpx;
          font-weight: 700;
          color: var(--app-text-block-color);
        }
      }

    }

    &:active{
      // background-color: #eceeec;
      transform: scale(.97);
    }

  }

  /* 分栏列表 */
  .th3-list{
    display: flex;
    justify-content: space-between;

    .item{
      display: flex;
      flex-direction: column;
      align-items: center;
      
      width: 25%;
      gap: 20rpx;

      .title{
        font-size: 30rpx;
        font-weight: 500;
      }

      &:active{
        background-color: var(--app-box-bg-color);
      }
      
    }
  }

  /* cell列表 */
  .cell-list{
    .cell-item{
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 48rpx;

      .left-side{
        display: flex;
        align-items: center;
        .app-iconfont{
          font-size: 48rpx;
          color: var(--app-text-color2);

          margin-top: 4rpx;
        }
        .title{
          font-size: 38rpx;
          font-weight: 600;

          margin-left: 26rpx;
        }
      }

      .right-side{
        color: var(--app-icon-dark-color);
        .app-iconfont{
          font-size: 46rpx;
        }
      }

      &:active{
        background-color: var(--app-box-bg-color);
      }

      &:not(:last-child){
        border-bottom: 2rpx solid rgba(188,202,192,.3);
      }
    }

    /* 将边距让给下级容器，使点击态正确 */
    &.card-box-body{
      padding: 0;
    }
    
  }


  /**************** 表单部分 ****************/
  .form-group{

    display: flex;
    flex-direction: column;
    gap: 28rpx;

    .form-control{
      box-sizing: content-box;

      min-height: 120rpx;
      background-color: white;

      border-radius: 50rpx;
      border-width: 4rpx;
      border-style: solid;
      border-color: #bccac04d;
      box-shadow: 0 2rpx 4rpx 0 rgb(0 0 0 / 0.05);

      display: flex;
      align-items: center;
      justify-content: space-between;


      .label{
        width: 100rpx;
        flex-shrink: 0;
        padding-top: 3rpx;
        .app-iconfont{
          font-size: 50rpx;
          color: var(--app-icon-dark-color);
        }
      }

      .form-content{
        flex-grow: 1;
        padding: 0 60rpx;

        input{
          font-size: 38rpx;
          font-weight: 500;
          .input-placeholder{
            color: var(--app-input-placeholder);
          }
        }
      }

      &.form-control-border{
        border-width: 4rpx;
        border-color: var(--app-text-color2);
      }

    }
  }

  /**************** 按钮部分 ****************/

  // 主按钮
  .app-btn{
    min-height: 120rpx;

    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 500;
    color: var(--app-text-color3);
    background-color: var(--app-primary-color3);

    /********  iconfont *********/
    .app-iconfont{
      font-size: 42rpx;
      margin-left: -10.5rpx;
      margin-right: 10.5rpx;
    }
    
    /********  圆角 *********/
    &.circle-1{
      border-radius: 60rpx;
    }
    &.circle-2{
      border-radius: 32rpx;
    }

    /********  点击态  *********/
    &.button-hover{
      transform: scale(.97);
    }
    &::after{
      border: none;
    }
    &[disabled]{
      background-color: var(--app-btn-dark-color);
      box-shadow: none;
    }

    /********  主题色  *********/
    &.app-btn-primary{
      color: white;
      background-color: var(--app-text-color2);
      box-shadow: 0px 24rpx 80rpx rgba(0, 105, 71, 0.25);

    }

    &.app-btn-danger{
      color: white;
      background-color: var(--app-red-color);
      &:hover{
        filter: brightness(1.1);
      }
    }

    &.app-btn-text{
      color: var(--app-text-gray-color);
      background-color: var(--app-gray-color);
      &:hover{
        background-color: var(--app-gray-color2);
      }
    }

  }


}
</style>
