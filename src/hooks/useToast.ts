/**
 * 对uniapp的默认toast方法的简易封装
 */

interface toastOptions {

}

type toast = string | toastOptions

export default function useToast(options:toast) {

    const _options = <any>{
        title: '',
        icon: 'none'
    }

    if(typeof options === 'string') {
        _options.title = options
        _options.icon = 'none'
    } else {

    }

    /* 当作结果输出 */
    uni.showToast(_options)

}