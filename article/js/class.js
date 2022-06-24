$(() => {
    initArtiCateList();

    const layer = layui.layer;
    let index, id;

    // 添加分类按钮事件
    $('#addClass').on('click', (e) => {
        e.preventDefault();
        index = showAdd();
    })

    // 编辑文章分类按钮事件
    $('body').on('click', '#updateClass', (e) => {
        e.preventDefault();
        const tr = e.target.parentNode.parentNode;
        id = tr.dataset.id;

        index = showUpdate();
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                const form = layui.form;
                form.val('class_update_form', res.data)
            }
        })

    })

    $('body').on('click', '#deleteClass', (e) => {
        e.preventDefault();
        const tr = e.target.parentNode.parentNode;
        id = tr.dataset.id;

        layer.confirm('确定删除?', { icon: 3, title: '提示' }, (index) => {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: (res) => {
                    if (res.status !== 0) {
                        return show_msg(res);
                    }
                    layer.close(index);
                    show_msg(res);
                    initArtiCateList();
                }
            })
        }, (index) => {
            layer.close(index);
        });



    })

    // 添加文章分类弹出层提交事件
    $('body').on('submit', '#class_add_form', (e) => {
        e.preventDefault();

        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#class_add_form').serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                layer.close(index);
                show_msg(res);
                initArtiCateList();
            }

        })
    })

    // 编辑文章分类弹出层提交事件
    $('body').on('submit', '#class_update_form', (e) => {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $('#class_update_form').serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                layer.close(index);
                show_msg(res);
                initArtiCateList();
            }

        })
    })

    // 渲染分类页面
    function initArtiCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                const cb = $('#class_body');
                cb.empty();

                const rows = template('row', res);
                cb.append(rows);
            }
        })
    }

    // 添加文章分类弹出层配置
    function showAdd() {
        return layer.open({
            type: 1,
            area: ['400px', '250px'],
            offset: ['100px', '300px'],
            title: '添加文章类别',
            content: $('#add').html()
        });
    }

    // 编辑文章分类弹出层配置
    function showUpdate() {
        return layer.open({
            type: 1,
            area: ['400px', '250px'],
            offset: ['100px', '300px'],
            title: '修改文章类别',
            content: $('#update').html()
        });
    }


})