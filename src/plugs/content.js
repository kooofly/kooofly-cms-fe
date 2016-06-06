import config from '../common/config'
export default {
    sidebar: function(params) {
        var self = this,
            module = params.module,
            uri = config.sidebarUri['catagory']
        this.$http.get({
            url: uri
        }).then(function(res) {
            var sidebarModel = []
            res.data.forEach(function(v, i) {
                var link = '#!/'+ config.admin + module + '/' + v._id + '/' + 'content'
                v.link = v.link || link
                sidebarModel.push(v)
            })
            self.$set('sidebarRoot', undefined)
            self.$set('sidebarModel', sidebarModel)
        })
    },
    list: function(params) {
        this.initList(params)
    }
}