<style>
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .form-search { background: #fff; margin-bottom: 10px; }
    .handlers{ padding: 10px; background: #fff; }
    .handlers .btn{ margin-left: 10px; }
    .handlers .btn:first-child{ margin-left: 0; }
    .sidebar{ width: 300px; }
    .sidebar .customArea{ background: #fff; padding: 10px; text-align: center; margin-bottom: 20px; }
    .sidebar .customArea .btn{ margin: 0 0 0px; }
    .sidebar .customArea .btn:last-child{ margin: 0; }
    .table-footer{ padding: 10px; text-align: right; background: #fff; line-height: 1; }
    .table-footer .pagination{ vertical-align: middle; }
    body .panel .footer { padding: 0.1rem; }
    .btn-search { margin-left: 10px; }
    .btn-search-switch { display: inline-block; width: 60px; font-size: 12px; }
</style>
<template>

    <div class="media media-top">
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
            <div v-if="search.isSenior && search.area" class="panel form-search">
                <div class="body">
                    <div class="row">
                        <div v-for="item in search.area" class="col-md-6">
                            <v-controls  :attrs="item" :model.sync="search.temp[item.name]"></v-controls>
                        </div>
                    </div>
                </div>
                <div class="footer text-right">
                    <a class="btn-search-switch" @click="search.isSenior = false" href="javascript:;">收起</a>
                    <button @click="excSearch()" class="btn btn-primary btn-search">搜索</button>
                </div>
            </div>
            <div v-else v-if="search.key" class="panel">
                <div class="body" >
                    <div class="media">
                        <div class="media-body">
                            <div class="media media-top search">
                                <div class="media-body"><input :placeholder="search.key.placeholder" class="form-control" :name="search.temp[search.key.name]" v-model="search.temp[search.key.name]" type="search"><i class="icon icon-error clear"></i></div>
                                <div class="media-right"><button @click="excSearch()" class="btn">搜索</button></div>
                            </div>
                        </div>
                        <div class="media-right text-right">
                            <a class="btn-search-switch" @click="search.isSenior = true" href="javascript:;">高级搜索</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row handlers">
                <div class="col-md-12">
                    <v-widgets v-for="item in systemConfig.data.handlers.config" :attrs="item"></v-widgets>
                </div>
            </div>
            <div style="min-height: 472px; background: #fff; border-bottom: 1px solid #f1f1f1;">
                <v-table :data.sync="main.data" :columns.sync="main.columns"></v-table>
            </div>
            <div class="table-footer">
                <v-pagination :limit="search.option._limit" :page.sync="search.option._page"></v-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import util from '../../common/base/base'
    import store from '../../common/store'
    import config from '../../common/config'
    import plugs from '../../plugs/plugs'
    import Tree from '../com/tree.vue'
    import VTable from '../com/table.vue'
    import VWidgets from '../widgets/_index.vue'
    import VPagination from '../widgets/pagination.vue'
    import VControls from '../controls/_index.vue'
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
                // 查询条件
                search: {
                    isSenior: true,
                    temp: {
                        _map: 'catagory_link_content',
                        _pattern: 'onetomany'
                    },
                    area: [],
                    key: null,
                    option: {
                        _limit: 10,
                        _page: 1
                    }
                },
                main: {
                    module: '',
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
            },
            'search.option': {
                handler () {
                    this.initMain(this.$route.params)
                },
                deep: true
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
                util.initMod.call(this, plugs, params, store)
            },
            initSidebar: function(params) {
                util.initSidebar.call(this, params)
            },
            initMain: function(params) {
                var self = this
                var module = self.main.module
                var uri = config.apiRoot + module
                var pid = params.id
                this.search.area = config.module[this.main.module] && config.module[this.main.module].searchArea
                this.search.key = config.module[this.main.module] && config.module[this.main.module].searchKey
                this.$http.get({
                    url: uri,
                    data: self.search.option
                    /*data: {
                        _limit: self.main.searchOption.limit,
                        _page: self.main.searchOption.page,
                        parentId: pid
                    }*/
                }).then(function(res) {
                    if(config.module[module] && config.module[module]['l_columns']) {
                        self.$set('main.columns', config.module[module]['l_columns'])
                    } else {
                        console.log('config error: module ' + module + ' l_columns error')
                    }
                    self.$set('main.data', res.data)
                })
            },
            initSystemConfig: function(systemConfig) {
                util.initSystemConfig.call(this, systemConfig)
            },
            excSearch: function () {
                var self = this
                var translateData = (function () {
                    var result = {}
                    var temp = self.search.temp
                    for (var k in temp) {
                        if(temp[k] === '') {
                            delete self.search.option[k]
                        } else {
                            result[k] = temp[k]
                        }
                    }
                    return result
                })()
                util.mix(this.search.option, translateData)
                this.initMain(this.$route.params)
            }
        },
        events: {
            refreshMain () {
                this.initMain(this.$route.params)
            }
        },
        components: {
            Tree,
            VTable,
            VWidgets,
            VPagination,
            VControls
        }
    }
</script>