$(() => {

    let form = layui.form;
    form.verify({
        oldPwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        newPwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        rePwd: (val) => {
            if (val !== $('input[name="newPwd"]').val()) {
                return '两次密码不一致';
            }
        }
    });

    $('#pwd_form').on('submit', (e) => {
        e.preventDefault();
        const fd = new FormData($('#pwd_form')[0]);

        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $('#pwd_form').serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                show_msg(res);
                let a = $('#pwd_form')[0];
                a.reset();
                // form不能有id为‘reset’的标签!!!
                $('#pwd_form')[0].reset();
            }
        })
    })

})