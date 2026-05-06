export default function goHref(url,func='',options={}){
    console.log('here?')
    switch(func){

        /* 返回上一页 */
        case 'back':
        default:
            uni.navigateBack(options)
        
    }
}