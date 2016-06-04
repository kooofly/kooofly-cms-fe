import config from '../common/config'
import catagory from './catagory'
export default {
    sidebar: catagory.sidebar,
    initMain: function(params) {
        var self = this,
            module = params.module,
            uri = config.modelUri + module
        this.$set('module', params.module)

        this.$http.get({
            url: uri
        }).then(function(res) {
            self.$set('layoutData', res.data[0])
        })
    }
}