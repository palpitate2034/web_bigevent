$(function () {
    let layer = layui.layer
    initArtCateList()


    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function (res) {
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 实现添加文章类别
    let indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式为form-add 绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $('#form-add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加分类失败' + res.message)
                }
                initArtCateList()
                layer.msg('新增分类成功')
                layer.close(indexAdd)
            }
        });
    });
})