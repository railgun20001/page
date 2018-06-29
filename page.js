var log = console.log.bind(console)

function (params) {
    
}

function Page(option, getPageFunc) {
    var defaultOption = {
        page: 1,
        limit: 10,
        list: [],
        filter: {},
    }
    var o = Object.assign(defaultOption, option)

   


    o.next = function() {

    }

    return 0
}

/**
 * page初始化
 */
Page.prototype.init = function() {
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
var page = page()

