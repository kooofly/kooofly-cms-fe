"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../../src/common/base/base'
//import commonRouter from '../../src/common/router'

import routers from './router'
import App from './app.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.options.crossOrigin = true
Vue.filter('isOrNot', function(value) {
    return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
})

var router = new VueRouter()

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
window.router = router;