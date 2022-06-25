$(() => {
    const filterObj = {
        pagenum: 1, //页码值
        pagesize: 2, //页条数
        cate_id: '', //分类Id
        state: '' //发表状态
    }

    const form = layui.form;

    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: filterObj,
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                // console.log(res);
                const test_data = {
                    "status": 0,
                    "message": "获取文章列表成功！",
                    "data": [{
                            "Id": 1,
                            "title": "AAA",
                            "pub_date": "2020-01-03 12:19:57.690",
                            "state": "已发布",
                            "cate_name": "最新"
                        },
                        {
                            "Id": 2,
                            "title": "BBB",
                            "pub_date": "2020-01-03 12:20:19.817",
                            "state": "已发布",
                            "cate_name": "新闻"
                        },
                        {
                            "Id": 3,
                            "title": "CCC",
                            "pub_date": "2020-01-03 12:20:19.817",
                            "state": "草稿",
                            "cate_name": "技术"
                        }
                    ],
                    "total": 3
                }

                const rows = template('row', res);
                $('#list_body').empty().append(rows);


                const test_rows = template('row', test_data);
                $('#list_body').append(test_rows);

                // renderPage(res.total);
            }

        })
    }

    function initCate() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }
                const cates = template('cate', res);
                $('select[name="cates"]').empty().append(cates);
                form.render();
            }
        })
    }

    function getFilter() {
        const cate_id = $('select[name="cates"]').val(),
            state = $('select[name="states"]').val();
        filterObj.cate_id = cate_id;
        filterObj.state = state;

    }

    function renderPage(total) {
        console.log(total);
    }

    initList();
    initCate();

    $('#filter_form').on('submit', (e) => {
        e.preventDefault();
        getFilter();

        //展示不直接调用initList，等有文章后再用
        // initList();
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: filterObj,
            success: (res) => {
                if (res.status !== 0) {
                    return show_msg(res);
                }

                const rows = template('row', res);
                $('#list_body').empty().append(rows);

            }

        })
    })
})