$(() => {
    const rootpath = 'http://www.liulongbin.top:3007';

    $.ajaxPrefilter((options) => {
        options.url = rootpath + options.url;
    })
})

function show_msg(res) {
    const layer = layui.layer;
    layer.msg(res.message);
}