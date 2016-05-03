<style>
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }

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
                    <tree :model.sync="sidebarModel" :root.sync="sidebarRoot"></tree>
                </ul>
            </aside>
        </div>

        <div class="main media-body">
            <div class="row handlers">
                <div class="col-md-12">
                    <a v-if="parentId" v-link="{ path: '/' + module + '/' + parentId + '/create' }" class="btn btn-primary btn-radius">{{ '新增' | addText }}</a>
                    <a v-else v-link="{ path: module + '/create' }" class="btn btn-primary btn-radius">{{ '新增' | addText }}</a>
                    <a href="javascript:;" class="btn btn-danger btn-radius">批量删除</a>
                </div>
            </div>
            <v-table :data.sync="listData" :columns.sync="listColumns"></v-table>
        </div>
    </div>
</template>
<script>
    import config from '../common/config'
    import plugs from '../plugs/plugs'
    import Tree from './tree.vue'
    import VTable from './table.vue'
    export default {
        props: ['activeNav'],
        data() {
            console.log(this)
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
        filters: {
            addText: function(v) {
                var module = this.$route.params.module,
                    menu = this.$parent.$get('menu')
                if(menu && menu.length) {
                    for (var i = 0, j = menu.length; i < j; i++) {
                        if(menu[i].alias === module) {
                            return v + menu[i].name.replace('管理', '')
                        }
                    }
                    return v
                }
            }
        },
        init: function() {
            this.$on('dataReady', function() {
                var activeNav = this.$get('activeNav'),
                    params = this.$route.params
                if(!activeNav) return
                this.initMod(params)
            })
        },
        methods: {
            initMod: function(params) {
                var plug = plugs[params.module]
                if(!plug) {
                    this.initSidebar(params)
                    this.initList(params)
                } else {
                    for (var fn in plug) {
                        plug[fn].call(this, params)
                    }
                }
            },
            initSidebar: function(params) {
                var self = this,
                    uri = config.sidebarUri['menu'],
                    parentId = self.$get('activeNav')._id,
                    path = this.$route.path,
                    module = path.split('/')[2]
                this.$set('sidebarRoot', parentId)
                this.$http.get({
                    url: uri,
                    data: {
                        parentId: parentId
                    }
                }).then(function(res) {
                    var sidebarModel = []
                    res.data.forEach(function(v, i) {
                        var link = '#!/'+ config.admin + module + '/' + (v.alias ? v.alias : v._id)
                        v.link = v.link || link
                        sidebarModel.push(v)
                    })

                    self.$set('sidebarModel', sidebarModel)
                })
            },
            initList: function(params) {
                var self = this,
                    module = params.module,
                    uri = config.apiRoot + module
                this.$set('module', params.module)

                this.$http.get({
                    url: uri
                }).then(function(res) {
                    self.$set('listColumns', config.listColumns[module])
                    self.$set('listData', res.data)
                })
            }
        },
        components: {
            Tree,
            VTable
        }
    }
</script>