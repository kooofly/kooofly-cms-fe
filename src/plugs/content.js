import config from '../common/config'
export default {
    setModule: function (params, store) {
        this.systemConfig.module = 'content'
        // mainData默认module为article
        params.main = {}
        this.main.module = params.main.module = 'link'
    },
    initSidebar: function(params) {
        var self = this,
            module = params.module,
            uri = config.sidebarUri['catagory']
        this.$http.get({
            url: uri
        }).then(function(res) {
            var sidebarData = []
            res.data.forEach(function(v, i) {
                var link = '#!/'+ config.admin + module + '/' + v._id + '/' + 'content'
                v.link = v.link || link
                sidebarData.push(v)
            })
            self.$set('sidebar.root', undefined)
            self.$set('sidebar.data', sidebarData)
        })
    },
    initMain: function(params) {
        this.initMain(params)
    }
}