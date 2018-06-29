var log = console.log.bind(console)

// 配置 Mock 路径
require.config({
    paths: {
        mock: 'http://mockjs.com/dist/mock'
    }
})
// 加载 Mock
require(['mock'], function(Mock){
    // 使用 Mock
    var data = Mock.mock({
        'list|1-10': [{
            'id|+1': 1
        }]
    })

    function getList() {
        var data = Mock.mock({
            'list|1-10': [{
                'id|+1': 1
            }]
        })
        return data
    }
})

var data = getList()
log(data)

var page = function(option, getPageFunc) {
    var defaultOption = {
        page: 1,
        limit: 10,
        list: [],
        filter: {},
    }
    var o = Object.assign(defaultOption, option)

    /**
     * page初始化
     **/
    o.init = function() {
        return new Promise((resolve, reject) => {
            // getPageFunc异步完成后的回调函数
            var callback = function(list) {
                var oldList = o.list
                if(o.list.length === 0) {
                    o.list = list
                } else {
                    o.list = o.list.concat(list)
                }
                resolve(o.list, oldList)
            }

            var res = {
                page: o.page,
                limit: o.limit,
                filter: o.filter,
            }

            getPageFunc(res, callback)
        })
    }

    o.next = function() {

    }
}