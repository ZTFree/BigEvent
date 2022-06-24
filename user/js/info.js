$(() => {

    initUserInfo();

    let form = layui.form;
    form.verify({
        nickname: [
            /^[\S]{1,6}$/, '昵称必须1到6位，且不能出现空格'
        ]
    });

    $('#user_form').on('submit', (e) => {
        e.preventDefault();
        const fd = new FormData($('#user_form')[0]);

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $('#user_form').serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                show_msg(res);
                window.parent.getUserInfo();
            }
        })
    })

    $('#reset').on('click', (e) => {
        e.preventDefault();
        initUserInfo();
    })

})

function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) {
                return show_msg(res);
            }
            const form = layui.form;

            form.val('user_form', res.data)


        }
    })
}