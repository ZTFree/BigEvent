$(() => {
    const showMethod = {
        pagenum: 1, //页码值
        pagesize: 4, //页条数
        cate_id: '', //分类Id
        state: '' //发表状态
    }

    function getList() {
        console.log(123);
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: showMethod,
            success: (res) => {
                if (res.status !== 0) {
                    show_msg(res);
                }
                // show_msg(res);
                console.log(res);
            }
        })
    }

    getList();
})