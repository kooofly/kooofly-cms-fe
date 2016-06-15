<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }

    .media{ margin-top: 0.15rem; display: block; }

    .panel{ margin: 0 0 0.15rem; }
    .panel .body { position: relative; }
    .panel .body .close{ position: absolute; right: 6px;  top: -8px; font-size: 30px; }
    .panel .body .body{ margin: 0.15rem 0; background: #f1f1f1; }
    .panel .media-body .body:last-child{ margin-bottom: 0; }

    .panel .media .media-left { text-align: right; }
    .control-label{ display: inline-block; width: 60px; }
    .media-middle .media-left,
    .media-middle .media-body,
    .media-middle .media-right{ vertical-align: middle; }
    .check-group label{ margin-right: 10px; }
    .check-group label * { vertical-align: middle; }


    .branch {  }
    .branch .branch { padding-left: 28px; margin-top: 10px; }
    .branch .check-group{ padding: 10px; border:1px solid #eee; background: #fcfcfc; margin-bottom: 10px; }
    .branch .sub-group{ margin-top: 10px; }
</style>
<template>
    <div class="media">
        <div class="media-left">
            <aside class="sidebar">
                <div class="customArea">
                    <a class="btn btn-success btn-block btn-radius" href="javascript:;">一个自定义Link</a>
                </div>
                <ul class="tree tree-root">
                    <tree :model.sync="sidebar.data" :root.sync="sidebar.root"></tree>
                </ul>
            </aside>
        </div>

        <div class="main media-body">
            <div class="panel form">
                <div class="title">
                    新建/编辑 {{mainRenderData.name}}
                </div>
                <div class="body">
                    <v-controls v-for="item in mainRenderData.fields" :attrs="item" :model.sync="model[item.name]"></v-controls>
                </div>
                <div class="footer text-right">
                    <button class="btn btn-primary" @click="execAction()">提交</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import util from '../common/base/base'
    import store from '../common/store'
    import config from '../common/config'
    import plugs from '../plugs/plugs'
    import Tree from './tree.vue'
    import VControls from './common_controls.vue'
    export default {
        data() {
            return {
                sidebar: {
                    // 数据模块
                    module: '',
                    root: '',
                    data: []
                },
                mainRenderData: {},
                model: {}
            }
        },
        computed: {
            activeNav () {
                return store.state.activeNav
            }
        },
        watch: {
            activeNav: function(newVal, oldVal) {
                if(newVal._id !== oldVal._id) {
                    this.$emit('dataReady')
                }
            }
        },
        route: {
            data: function(transition) {
                this.$emit('dataReady')
            }
        },
        init: function() {
            console.log('cedit', this)
            this.$on('dataReady', function() {
                var activeNav = store.state.activeNav,
                        params = this.$route.params
                if(!activeNav) return
                this.initMod(params)
            })
        },
        methods: {
            initMod: function(params) {
                util.initMod.call(this, plugs, params)
            },
            initSidebar: function(params) {
                util.initSidebar.call(this, params)
            },
            initMain: function(params) {
                var self = this,
                        module = params.module,
                        uri = config.modelUri + module
                this.$http.get({
                    url: uri
                }).then(function(res) {
                    var mainRenderData = res.data[0]
                    var array = []
                    //过滤只读字段
                    if (mainRenderData && mainRenderData.fields) {
                        mainRenderData.fields.forEach(function (v, i) {
                            if (!v.control) return
                            if (v.control.default) {
                                self.model[v.name] = v.control.default
                            }
                            array.push(v)
                        })

                    }
                    mainRenderData.fields = array
                    self.mainRenderData = mainRenderData
                })

                if(this.action === 'update') {
                    this.$http.get({
                        url: util.getUri.call(this, module, 'c_update_model', '?_single=1'),
                        data: {
                            _id: this.$route.params.id
                        }
                    }).then(function (res) {
                        var model = res.data
                        var array = []
                        //过滤只读字段
                        if (model && model.fields) {
                            model.fields.forEach(function (v, i) {
                                if (!v.control) return
                                array.push(v)
                            })

                        }
                        model.fields = array
                        self.model = model
                    })
                }
            },
            execAction () {
                var module = this.$route.params.module
                // config.apiRoot + module
                var resource = this.action === 'save' ? this.$resource(util.getUri.call(this, module, 'c_create')) : this.$resource(config.apiRoot + module + '?_id=' + this.$route.params.id)
                var mock = {
                    parentId: "5754ea84dc29080822000014",
                    alias: '添加的猫',
                    name: '添加的猫',
                    isEnable: true
                }
                var mock2 = {
                    name: 'test561',
                    collectionName: 'test2',
                    fields: [
                        {
                            name: 'testF',
                            attribute: { type: 'String' },
                            control: {
                                name: 'text',
                                label: 'testHAHA'
                            }
                        }
                    ],
                    isEnable: true
                }
                resource[this.action](this.model).then(function (res) {
                    console.log('success', res)
                }, function (res) {
                    console.log('error', res)
                })
            }
        },
        components: {
            Tree,
            VControls
        }
    }
</script>