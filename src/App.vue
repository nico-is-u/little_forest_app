<script setup lang="ts">
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { navigateToInterceptor } from '@/router/interceptor'

/* onLaunch((options) => {}) */

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

  /**************** 按钮工具 ****************/
  .uv-circle-button{
    .uv-button.uv-button--square{
      width:88rpx;
      height: 88rpx;
      border-radius: 50%;
      background-color: #eceeec;
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
      background-color: #eceeec;
      transform: scale(.97);
    }

  }

}
</style>
