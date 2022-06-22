$(() => {

    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', () => {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    let form = layui.form;
    form.verify({
        username: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === 'xxx') {
                alert('用户名不能为敏感词');
                return true;
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: (value) => {
            if ($('#pwd').val() !== value) {
                return '两次密码不一致'
            }
        }
    });

    $('#form_login').on('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(($('#form_login'))[0]);
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: {
                username: fd.get('username'),
                password: fd.get('password')
            },
            success: (res) => {
                if (res.status !== 0) {
                    show_msg(res);
                } else {
                    localStorage.setItem('token', res.token);
                    location.href = '/index.html';
                }

            }
        })
    })

    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(($('#form_reg'))[0]);
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: fd.get('username'),
                password: fd.get('password')
            },
            success: (res) => {
                show_msg(res);
                if (res.status === 0) {
                    $('.reg-box input').prop('value', '')
                    $('link_login').click();
                }

            }
        })
    })
})