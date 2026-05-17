<template>
    <view class="fixed-layer">
        <uv-modal
            ref="thisModal"
            @close="thisModalOnClose"

            :showConfirmButton="false"
            :showCancelButton="false"
        >
            <view class="app-modal">

                <!-- Icon组 -->
                <view class="app-modal-icon-group" v-if="icon">
                    <uni-view class="icon-circle icon-circle-l" :class="'icon-circle-' + type">
                        <text class="app-iconfont" :class="icon"></text>
                        <view class="app-modal-star" v-if="iconStar"></view>
                    </uni-view>
                </view>

                <!-- 内容 -->
                <view class="app-modal-content" v-if="title || desc">
                    <view class="app-modal-title">{{ title }}</view>
                    <view class="app-modal-desc">{{ desc }}</view>
                </view>

                <!-- 按钮组 -->
                <view class="app-modal-btn-group">
                    <!-- 确定按钮 -->
                    <button class="app-btn circle-1" :class="'app-btn-' + type" @click="thisModalOnConfirm">
                        <text v-if="confirmIcon" class="app-iconfont" :class="confirmIcon"></text>
                        <text>{{ confirmText }}</text>
                    </button>
                    <!-- 取消按钮 -->
                    <button class="app-btn circle-1 app-btn-text" @click="thisModalDoClose">
                        <text>{{ cancelText }}</text>
                    </button>
                </view>
            </view>

        </uv-modal>
    </view>
</template>

<script lang="ts">
import {
    ref,
    watch
} from 'vue'
/**
 * @description 模态弹出框(基于uv-ui)
 * 内容全部要自己实现，注意showConfirmButton两个属性只是跟uv同名
 */
export default {
    props:{
        modal:Boolean,                          // 启停
        type:{                                  // 样式主题  primary / danger 等
            type:String,
            default:'primary'
        },
        title:{                                 // 标题
            type:String,
            default:''
        },
        desc:{                                 // 描述
            type:String,
            default:''
        },
        icon:{                                  // 顶部 Icon 是否打开
            type:String,
            default:''
        },
        iconStar:{                              // 顶部 Icon 是否带星
            type:Boolean,
            default:false
        },
        confirmText:{                           // 确定按钮的文字
            type:String,
            default:'确定'
        },
        cancelText:{                            // 取消按钮的文字
            type:String,
            default:'取消'
        },
        confirmIcon:{                           // 确定按钮的图标
            type:String,
            default:''
        },
        showConfirmButton:{                     // 显示确定按钮
            type:Boolean,
            default:true
        },
        showCancelButton:{                      // 显示取消按钮
            type:Boolean,
            default:true
        },
    },
    setup(props,context){
        /******* Datas *******/
        const {emit} = context
        const thisModal:any = ref(false)                // 插件实例

        /******* 组件启停 *******/
        watch(
            () => props.modal,
            (newVal) => {
                if (newVal) thisModal.value.open()
            }
        )
        const thisModalOnClose = () => {
            emit('close',false)
        }
        const thisModalDoClose = () => {
            thisModal.value.close()
        }

        /******* 事件转交 *******/
        const thisModalOnConfirm = () => {
            emit('confirm')
        }
    
        return {
            thisModal,
            thisModalOnClose,
            thisModalDoClose,
            thisModalOnConfirm,
        }

    }
}
</script>