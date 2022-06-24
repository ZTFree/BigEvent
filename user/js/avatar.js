$(() => {
    const $image = $('#image')
    const options = {
        aspectRatio: 1,
        preview: '.img-preview'
    }
    $image.cropper(options);

    $('#load').on('click', (e) => {
        e.preventDefault();
        // console.log(123);
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

    $('#change').on('click', (e) => {
        e.preventDefault();

        const dataURL = $image.cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        }).toDataURL('image/png');

        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                show_msg(res);
                window.parent.getUserInfo();
            }
        })
    })
})