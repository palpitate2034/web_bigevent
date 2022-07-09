$(function () {
    let form = layui.form
    let layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1-6个长度之间'
            }
        }
    })

    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                // 调用form.val快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        });
    }

    // 重置
    $('#btnReset').on('click', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 初始化
        initUserInfo()
    })

    // 提交修改
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面的方法，渲染头像和昵称
                window.parent.getUserInfo()
            }
        });
    });
})