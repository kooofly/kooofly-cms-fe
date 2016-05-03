"use strict";
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import common from '../../src/common/base/base'
//import commonRouter from '../../src/common/router'

import routers from './router'

import App from './app.vue'

//page
import Index from '../../src/components/p_index.vue'
import Placeholder from '../../src/components/p_bad_placeholder.vue'
import Catagory from '../../src/components/p_catagory.vue'
import System from '../../src/components/p_system.vue'
import CommonList from '../../src/components/p_common_list.vue'
import CommonEdit from '../../src/components/p_common_edit.vue'

var dynRouter = {
    catagory: Catagory,
    system: System,
    commonList: CommonList,
    commonEdit: CommonEdit
}


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.filter('isOrNot', function(value) {
    return value ? '<span class="bg bg-success">是</span>' : '<span class="bg bg-danger">否</span>'
})

var router = new VueRouter()

router.map(routers)
/*router.alias({
    '/admin/system/': '/admin/system/api'
})*/
router.redirect({
    '/admin/system/': '/admin/system/api'
})
/*router.map(commonRouter)
router.map({
    /!*'/': {
        component: Index,
        auths: {
            allow: [],
            special: []
        }
    },*!/
    '/:module': {
        component: CommonList
    }, //可能是详情，可能是列表， 默认为列表
    '/:module/:id/list': {
        component: CommonList
    },

    '/:module/:id': {

    }, //详情
    '/:module/:id/detail': {

    }, //详情


    '/:module/create': {
        component: CommonEdit
    },
    '/:module/:id/create': {
        component: CommonEdit
    },
    '/:module/update': {
        component: CommonEdit
    },
    '/:module/:id/update': {
        component: CommonEdit
    },
    '/system/:module': {},
    '/system/:module/list': {},
    '/system/:module/create': {},
    '/system/:module/:id/create': {},
    '/system/:module/update': {},
    '/system/:module/:id/update': {},
})*/


var app = Vue.extend(App).extend({
    ready: function() {
        common.routerBeforeEach(router);
        //common.validUser.call(this, router, common)
    }
})

router.start(app, 'app');
window.router = router;

/*
Vue.http(config.menuUri).then(function(res) {
    console.log(self)
    /!*res.data.forEach(function(v, i) {
        var x = {
            '/':{
                component: Index
            }
        }
        var o = {}, alias = v.alias, mod = dynRouter[ alias ]
        if(mod) {
            o[alias] = {
                component: mod,
                data: v,
                xxx: this,
                options1: {
                    sidebar: {
                        handler: 'xxx',
                        params: {
                            abc: 'xxx'
                        }
                    }
                }
            }
            o[alias + '/:id' + '/:page'] = {
                component: mod,
                name: alias

            }
            o[alias + '/:page'] = {
                component: mod,
                name: alias + '_action'

            }
        } else {
            x[alias] = {
                component: Placeholder
            }
        }
        x['/'].subRoutes = o
        router.map(x)
    })*!/

    var app = Vue.extend(App).extend({
        data() {
            return {
                menu: res.data
            }
        },

        ready: function() {
            common.routerBeforeEach(router);
            //common.validUser.call(this, router, common)
        }
    })

    router.start(app, 'app');
    window.router = router;
})
*/
