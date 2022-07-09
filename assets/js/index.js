$(function () {
    getUserInfo()

    let layer = layui.layer

    $('#btnLogout').on('click', function () {
        // 弹出提示框 提示用户确定退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 点击之后做的事
            // 1、清空token
            localStorage.removeItem('token')
            // 2、跳转页面
            location.href = '/login.html'
            layer.close(index);
        });
    });
})


//  获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // 请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 调用renderAbadar渲染用户头像
            renderAvatar(res.data)
        }
        // complete: function (res) {
        //     console.log('执行了complete函数')
        //     console.log(res);
        //     // 在complete回调函数中可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 清空token
        //         localStorage.removeItem('token')
        //         // 跳转登录页
        //         location.href = '/login.html'
        //     }
        // }
    });
}

function renderAvatar(user) {
    // 获取用户昵称
    let name = user.nickname || user.username
    // 设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}