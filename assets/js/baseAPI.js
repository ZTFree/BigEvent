$(() => {
    const rootpath = 'http://www.liulongbin.top:3007';

    $.ajaxPrefilter((options) => {
        options.url = rootpath + options.url;
    })
})