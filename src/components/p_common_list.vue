<style>
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }
    .handlers .btn{ margin-left: 10px; }
    .handlers .btn:first-child{ margin-left: 0; }
    .sidebar{ width: 300px; }
    .sidebar .customArea{ background: #fff; padding: 10px; text-align: center; margin-bottom: 20px; }
    .sidebar .customArea .btn{ margin: 0 0 0px; }
    .sidebar .customArea .btn:last-child{ margin: 0; }
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
            <div id="" class="row handlers">
                <div class="col-md-12">
                    <v-widgets v-for="item in systemConfig.data.handlers.config" :attrs="item"></v-widgets>
                </div>
            </div>
            <v-table :data.sync="mainData.data" :columns.sync="mainData.columns"></v-table>
        </div>
    </div>
</template>
<script>
    import util from '../common/base/base'
    import store from '../common/store'
    import config from '../common/config'
    import plugs from '../plugs/plugs'
    import Tree from './tree.vue'
    import VTable from './table.vue'
    import VDropdown from './widget/dropdown.vue'
    import VWidgets from './common_widgets.vue'
    export default {
        data() {
            return {
                // 左侧菜单
                sidebar: {
                    // 数据模块
                    module: '',
                    root: '',
                    data: []
                },
                mainData: {
                    module: '',
                    // 查询条件
                    searchOption: {},
                    // 表头
                    columns: [],
                    // 数据
                    data: []
                },
                // 系统配置项
                systemConfig: {
                    module: '',
                    data: {
                        handlers: {
                            code: 'area_list_handlers',
                            config: {}
                        }
                    }

                }
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
                /*var params = this.$route.params
                this.initMod(params)*/
            }
        },
        init: function() {
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
                var self = this
                var module = self.mainData.module
                var uri = config.apiRoot + module
                var pid = params.id
                this.$http.get({
                    url: uri,
                    data: {
                        parentId: pid
                    }
                }).then(function(res) {
                    self.$set('mainData.columns', config.listColumns[module])
                    self.$set('mainData.data', res.data)
                })
            },
            initSystemConfig: function(systemConfig) {
                util.initSystemConfig.call(this, systemConfig)
            }
        },
        components: {
            Tree,
            VTable,
            VDropdown,
            VWidgets
        }
    }
</script>