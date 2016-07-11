"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../../src/common/base/base'
import config from '../../src/common/config'
import routers from './router'
import App from './app.vue'

import Index from '../../src/components/index.vue'
import LayoutH from '../../src/components/layout/layouth.vue'
import LayoutS from '../../src/components/layout/layouts.vue'
import LayoutM from '../../src/components/layout/layoutm.vue'
var layout = {
    Index: Index,
    LayoutH: LayoutH,
    LayoutS: LayoutS,
    LayoutM: LayoutM
}
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.crossOrigin = true
Vue.filter('isOrNot', function(value) {
    return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
})
var router = new VueRouter()
Vue.http(config.page).then(function(res) {

    var data = res.data
    var r = (function() {
        var result = {}
        data.forEach(function (v) {
            result[v.router] = {
                component: layout[v.layout]
            }
        })
        return result
    })()
    common.mix(routers, r)
    common.mix(routers, {
        '/': {
            title: '首页 - Kooofly CMS',
            component: layout['Index']
        }
    })
    router.map(routers)
    /*router.alias({
     '/admin/system/': '/admin/system/api'
     })*/
    router.redirect({
        title: '内容管理 - Kooofly CMS',
        '/admin': '/admin/content'
    })

    router.redirect({
        title: 'API管理 - 系统管理 - Kooofly CMS',
        '/admin/system/': '/admin/system/api'
    })

    var app = Vue.extend(App).extend({
        ready: function() {
            common.routerBeforeEach(router);
            //common.validUser.call(this, router, common)
        }
    })

    router.start(app, 'app');
})