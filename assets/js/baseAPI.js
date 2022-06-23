$(() => {
    const rootpath = 'http://www.liulongbin.top:3007';

    $.ajaxPrefilter((options) => {
        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            };
            options.complete = (res) => {
                if (res.responseJSON.status === 1) {
                    location.href = '/login.html';
                }
            };
        }
        options.url = rootpath + options.url;

    })
})

function show_msg(res) {
    const layer = layui.layer;
    layer.msg(res.message);
}