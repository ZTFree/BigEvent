$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径 
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // options.complete = function (res) {
    //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败') {
    //         localStorage.removeItem('token')
    //         location.href = '/login.html'
    //     }
    // }
    options.complete = function (res) {
        // console.log('执行了 complete 回调：')   
        // console.log(res)  
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据    
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token   

            localStorage.removeItem('token') // 2. 强制跳转到登录页面  
            location.href = '/login.html'
        }
    }
})