$(() => {
    getUserInfo();
    $('#exit').on('click', Exit);
})

function Exit() {
    const layer = layui.layer;

    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, () => {
        localStorage.removeItem('token');
        location.href = '/login.html';
    }, (index) => {
        layer.close(index);
    });
}

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            if (res.status !== 0) {
                return show_msg(res);
            }
            // console.log(res.data);
            renderAvatar(res.data);
        }

    })
}

function renderAvatar(user) {
    const name = user.nickname || user.username;
    const pic = user.user_pic;

    $('.welcome').html(`欢迎&nbsp;&nbsp;${name}`);
    if (!pic) {
        $('.user_info img').hide();
        $('.user_info .avatar').show().html((name)[0].toUpperCase());
    } else {
        $('.user_info img').show().prop('src', pic);
        $('.user_info avatar').hide();
    }

}