import config from '../common/config'
export default {
    setModule: function (params, store) {
        this.systemConfig.module = 'content'
        // mainData默认module为article
        params.main = {}
        this.main.module = params.main.module = 'link'
        params.parentPath = '/admin/content'
    },
    initSidebar: function(params) {
        this.initSidebar(params)
    },
    initMain: function(params) {
        this.initMain(params)
    }
}