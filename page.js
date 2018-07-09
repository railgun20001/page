function getListTest() {
    var list = []
    for (let i = 0; i < 10; i++) {
        list.push({
            id: i,
        })
    }
    return list
}

var log = console.log.bind(console)

function Page(getPageFunc, option) {
    var defaultOption = {
        initPage: 1,
        limit: 10,
        initList: [],
        initFilter: {},
    }

    this.option = Object.assign(defaultOption, option) 

    this.page = this.option.initPage
    this.list = this.option.initList
    this.filter = this.option.initFilter
    this.getPageFunc = getPageFunc
}

/**
 * page初始化
 */
Page.prototype.init = function() {
    return new Promise((resolve, reject) => {
        var that = this
        // getPageFunc异步完成后的回调函数
        var callback = function(list) {
            var oldList = that.list
            that.list = that.list.concat(list)
            resolve(that.list, oldList)
        }

        var res = {
            page: this.page,
            limit: this.option.limit,
            filter: this.filter,
        }

        this.getPageFunc(res, callback)
    })
}

Page.prototype.next = function() {
    return new Promise((resolve, reject) => {
        this.page++

    })
}

var page = new Page((res, callback) => {
    var list = getListTest()
    callback(list)
})
page.init().then((list, oldList) => {
    console.log(list)
})