"use strict";
import config from '../config'
import store from '../store'
export default {
    mix: function(o) {
        var i = 1,
            l = arguments.length
        for ( ; i < l; i++ ) {
            var arg = arguments[i]
            for ( var k in arg ) {
                if( arg.hasOwnProperty( k ) ){
                    o[k] = arg[k]
                }
            }
        }
        return o;
    },
    link: function(data, prefix) {
        var result = [];
        var pathname = location.pathname,
            pathnameWithHTML = pathname.match(/^\/.+\.html/i);
        var regExp = (pathnameWithHTML && new RegExp(pathnameWithHTML[0]));

        for (var i = 0, j = data.length; i < j; i++) {
            var obj = data[i],
                url = obj.url;
            if( /^(https?:\/\/)/i.test(url) ){
                result.push(obj);
            } else {
                if(/^\/.+\.html/i.test(url)) {
                    obj.url = url.replace('.html', '.html' + prefix)
                } else {
                    obj.url = url.replace('/', '/' + prefix + '/')
                }
                result.push(obj);
            }
        }
        return result;
    },
    routerBeforeEach: function(router) {
        var self = this;
        router.beforeEach(function (transition) {


            var toPath = transition.to.path,
                fromPath = transition.from.path
            //app 检测  不同的.html文件代表不同的app
            /*if(/\.html/i.test(toPath)) {
                //修复浏览器历史记录问题
                router.replace(transition.from.path);
                window.location.replace(urlRoot + (toPath.charAt(0) === '/' ? toPath : '/' + toPath) );
                return ;
            }*/

            //404 检测
            if(!transition.to.matched){
                console.log(transition)
                //修复404 退回问题
                fromPath && router.replace(fromPath);
                router.go('/404');
                return ;
            }

            var auths = transition.to.auths
            //身份 权限检测
            self.authsCheck(toPath, auths, transition)

            //组件 使用权限检测
            self.comCheck(toPath, auths, transition)

            transition.next()
        })
    },
    authsCheck: function(toPath, auths, transition) {


    },
    comCheck: function(toPath, auths, transition) {

    },
    validUser: function(router, common) {
        //获取用户信息
        var http = this.$resource('../data/user.json');
        http.get({id: 1}, function(res, status, request) {

            //记录用户信息
            this.$set('auth', res.data.auth);
            this.$set('isAdmin', true);
            this.$set('name', res.data.name);

            //添加特殊路由规则
            common.routerBeforeEach(router);

            console.log(this);
        }).error(function(data, status, request) {
            router.go('/500');
        })
        console.log(http);
    },
    initMod: function(plugs, params) {
        var module = params.module
        var plug = plugs[module]
        // 默认module
        this.sidebar.module = this.$route.path.split('/')[2]
        this.mainData && (this.mainData.module = module)
        if(this.systemConfig) {
            this.systemConfig.module = module
            this.initSystemConfig(this.systemConfig)
        }
        if(!plug) {
            this.initSidebar(params)
            this.initMain(params)
        } else {
            for (var fn in plug) {
                plug[fn].call(this, params)
            }
        }
    },
    initSidebar: function(params) {
        var self = this,
            uri = config.sidebarUri['menu'],
            sidebarRoot = this.activeNav._id,
            module = self.sidebar.module
        this.$set('sidebar.root', sidebarRoot)
        this.$http.get({
            url: uri,
            data: {
                parentId: sidebarRoot
            }
        }).then(function(res) {
            var sidebarData = []
            res.data.forEach(function(v, i) {
                var link = '#!/'+ config.admin + module + '/' + (v.alias ? v.alias : v._id)
                v.link = v.link || link
                sidebarData.push(v)
            })

            self.$set('sidebar.data', sidebarData)
        })
    },
    initSystemConfig: function(systemConfig) {
        var self = this
        var systemConfigData = systemConfig.data
        for (var key in systemConfigData) {
            var code = systemConfigData[key].code
            if (code) {
                self.$http.get({
                    url: config.systemconfigUri,
                    data: {
                        code: code
                    }
                }).then(function (res) {
                    var result = res.data[0]
                    var cfg
                    if (result) {
                        var module = systemConfig.module
                        var data = result.config.data
                        var defaults = data.default
                        var moduleData = data[module]
                        if (moduleData) {
                            var extend = moduleData.extend
                            if (extend) {
                                cfg = defaults.widgets.concat(moduleData.controls)
                            } else {
                                cfg = moduleData.widgets
                            }
                        } else {
                            cfg = defaults.widgets
                        }
                        self.systemConfig.data[key].config = cfg
                    }
                })
            }
        }
    },
    getUri: function (module, action) {
        var result
        if(config.module[module] && config.module[module][action]) {
            result = config.module[module][action]
        } else {
            result = config.apiRoot + module
        }
         return result
    }
}