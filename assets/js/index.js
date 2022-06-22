$(() => {
    getUserInfo();
    // console.log(123);
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: (res) => {
            if (res.status !== 0) {
                return show_msg(res);
            }
            console.log(res.data);
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
        $('.user_info avatar').show().html(name[0].toUpperCase());
    } else {
        $('.user_info img').show().prop('src', pic);
        $('.user_info avatar').hide();
    }




}