$(function () {
    // 点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show();
    });
    // 点击去登陆
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 自定义校验规则
    form.verify({
        // 密码校验
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            if (value !== $('.reg-box [name="password"]').val()) {
                return '两次密码不一致'
            }
        }
    })


    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username').val(),
            password: $('#form_reg [name=password').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功');
                $('#link_login').click()
            },
        );
    })
    // 监听登陆表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        // let data = {
        //     username: $('#form_login [name=username').val(),
        //     password: $('#form_login [name=password').val()
        // }
        // $.post("http://www.liulongbin.top:3007/api/login", data,
        //     function (res) {
        //         if (res.status !== 0) {
        //             return layer.msg(res.message)
        //         }
        //         layer.msg('登陆成功')
        //     },
        // )
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // console.log(res.token);
                layer.msg('登陆成功')
                // 将登录成功得到的token保存到localstorage
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })
})
