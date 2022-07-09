// 每次调用$.get()或者$.post()或$.ajax()是都会调用这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 请求根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的接口设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空token
            localStorage.removeItem('token')
            // 跳转登录页
            location.href = '/login.html'
        }
    }
})