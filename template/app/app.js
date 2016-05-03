"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../../src/common/base/base'
import commonRouter from '../../src/common/router'

import App from './app.vue'

//page
import Index from '../../src/components/index.vue'


Vue.use(VueRouter)
Vue.use(VueResource)
var router = new VueRouter()
router.map(commonRouter)
router.map({
    '/item/:id': {
        component: Index,
        auths: {
            allow: [],
            special: []
        }
    }
})
var app = Vue.extend(App).extend({
    ready: function() {
        common.routerBeforeEach(router);
        //common.validUser.call(this, router, common)
    }
})

router.start(app, 'app');
window.router = router;