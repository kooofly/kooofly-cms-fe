import config from '../common/config'
export default {
    sidebar: function(params) {
        var self = this,
            module = params.module,
            uri = config.sidebarUri[params.module]
        this.$http.get({
            url: uri
        }).then(function(res) {
            var sidebarModel = []
            res.data.forEach(function(v, i) {
                var link = '#!/'+ config.admin + module + '/' + v._id + '/' + 'catagory'
                v.link = v.link || link
                sidebarModel.push(v)
            })
            self.$set('sidebarRoot', undefined)
            self.$set('sidebarModel', sidebarModel)
        })
    },
    list: function(params) {
        var self = this
        var uri = config.listUri[params.module],
            pid = params.id
        this.$set('module', params.module)
        this.$set('parentId', pid)
        this.$set('listColumns', config.listColumns[params.module])
        this.$http.get({
            url: uri,
            data: {
                parentId: pid
            }
        }).then(function(res) {
            self.$set('listData', res.data)
        })
    }
}