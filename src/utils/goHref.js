export default function goHref(url,func='',options={}){
    switch(func){

        /* tab页切换 */
        case 'tab':
            uni.switchTab({url,...options})
            break

        /* 返回上一页 */
        case 'back':
        default:
            uni.navigateBack(options)
        
    }
}