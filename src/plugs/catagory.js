import config from '../common/config'
export default {
    initSidebar: function(params) {
        var self = this,
            module = params.module,
            uri = config.sidebarUri[params.module]
        this.$http.get({
            url: uri
        }).then(function(res) {
            var sidebarData = []
            res.data.forEach(function(v, i) {
                var link = '/'+ config.admin + module + '/' + v._id + '/' + 'catagory'
                v.link = v.link || link
                sidebarData.push(v)
            })
            self.$set('sidebar.root',  null)
            self.$set('sidebar.data', sidebarData)
        })
    },
    initMain: function(params) {
        this.initMain(params)
    }
}