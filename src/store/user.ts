import { userInfoState } from './type/user'
import { ref,computed } from 'vue'
import { defineStore } from 'pinia'

import { getUserInfo as _getUserInfo } from '@/api/users'

export const useUserStore = defineStore(
  'user',
  () => {

    /**
     * @states
     */

    /* 定义用户信息 */
    const userInfo = ref({ ...userInfoState })
    const userToken = ref('')

    /**
     * @getters
     */

    /* 认证状态判断 */
    const hasValidLogin = computed(() => userInfo.value.userId !== -1)

    /**
     * @actions
     */
    const setUserInfo = (info: typeof userInfoState) => userInfo.value = info

    const getUserInfo = async () => {
      try{
        const response = await _getUserInfo()
        const {code = 0 , data = {} as any} = response
        /* 缓存用户信息 便于持久化 */
        if(code == 1){
          uni.setStorage({
            key:'app-user-info',
            data
          })
          
          setUserInfo(data)

        }
        return response
      }catch(e){
        throw e
      }
    }

    const setUserToken = (token: string) => {
      /* 缓存token */
      uni.setStorageSync('app-user-token', token)
      userToken.value = token
    }

    const userLogout = () => {
      /* 清除用户信息 */
      uni.removeStorageSync('app-user-info')
      uni.removeStorageSync('app-user-token')
      userInfo.value = { ...userInfoState }
      userToken.value = ''
    }

    return {
      /* states */
      userInfo,
      userToken,
      /* getters */
      hasLogin: hasValidLogin,
      /* actions */
      setUserInfo,
      getUserInfo,
      setUserToken,
      userLogout,
    }

  }
)
