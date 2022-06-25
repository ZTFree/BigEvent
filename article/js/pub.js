$(() => {
    const $image = $('#image')
    const options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    $image.cropper(options);

    const form = layui.form;

    // 分类获取并渲染下拉框
    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                const cates = template('cate', res);
                $('select[name="cate_id"]').empty().append(cates);
                form.render();
            }
        })
    }


    // 更换封面图片
    $('#load').on('click', (e) => {
        e.preventDefault();
        $('#loadImg').click();

    })

    $('#loadImg').on('change', (e) => {
        const files = e.target.files;
        if (files.length === 0) {
            const layer = layui.layer;
            layer.msg('请选择图片');
            return;
        }
        const file = files[0];
        const newImgURL = URL.createObjectURL(file);

        $image.cropper('destroy').attr('src', newImgURL).cropper(options);

    })

    // 发布文章
    let art_state = '已发布';

    $('#art_save').on('click', (e) => {
        e.preventDefault();
        art_state = '草稿';

        show_msg({ message: "文章已保存为草稿" })
    })



    $('#pub_form').on('submit', (e) => {
        e.preventDefault();
        tinyMCE.triggerSave();

        let fd = new FormData($('#pub_form')[0]);

        fd.append('state', art_state);


        // 裁剪封面转为图片对象
        $image.cropper('getCroppedCanvas', {
            width: 400,
            height: 280
        }).toBlob((blob) => {
            fd.append('cover_img', blob);
        })

        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res)
                }
                show_msg(res);
            }
        })
    })

    initCate();
    initEditor();
})