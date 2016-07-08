"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../../src/common/base/base'

import routers from './router'
import App from './app.vue'

import Index from '../../src/components/index.vue'
var layout = {
    Index: Index
}
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.crossOrigin = true
Vue.filter('isOrNot', function(value) {
    return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
})
var router = new VueRouter()
Vue.http('http://api.kooofly.com:3000/resetful/menu', {
    data: {
        _id: '577cb4b27fe00b2c32000099'
    }
}).then(function() {

    common.mix(routers, {
        '/': {
            component: layout['Index']
        }
    })
    router.map(routers)
    /*router.alias({
     '/admin/system/': '/admin/system/api'
     })*/
    router.redirect({
        '/admin': '/admin/content'
    })

    router.redirect({
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