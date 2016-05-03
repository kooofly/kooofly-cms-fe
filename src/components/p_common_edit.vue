<style type="text/css">
    .progress-top{ position: absolute; width: 100%; top: 0; left: 0; }
    .table{ width: 100%; }
    .handlers{ padding: 10px; background: #fff; }

    .media{ margin-top: 0.15rem; display: block; }

    .panel{ margin: 0 0 0.15rem; }
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
                    <tree :model.sync="sidebarModel" :root.sync="sidebarRoot"></tree>
                </ul>
            </aside>
        </div>

        <div class="main media-body">
            <div class="panel form">
                <div class="title">
                    新建/编辑 {{layoutData.name}}
                </div>
                <div class="body">
                    <div v-for="item in layoutData.fields">
                        <vtext :text="item.control.label" :model.sync="model[item.name]" @click="test"></vtext>
                    </div>
                    <vtext :text="abc" :model.sync="abc" @click="test"></vtext>

                    <label class="media media-middle">
                        <div class="media-left">
                            <span class="control-label">模型名称</span>
                        </div>
                        <div class="media-body">
                            <input class="form-control" type="text"/>
                        </div>
                    </label>

                    <label class="media media-middle">
                        <div class="media-left">
                            <span class="control-label">模型表名</span>
                        </div>
                        <div class="media-body">
                            <input class="form-control" type="text"/>
                        </div>
                    </label>
                    <div class="media media-middle">
                        <div class="media-left">
                            <span class="control-label">&nbsp;</span>
                        </div>
                        <div class="media-body">
                            <button class="btn btn-block">添加字段</button>
                            <div class="body">
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">字段名称</span>
                                    </div>
                                    <div class="media-body">
                                        <input class="form-control" placeholder="字段key" type="text"/>
                                    </div>
                                </label>

                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">控件类型</span>
                                    </div>
                                    <div class="media-body">
                                        <select class="form-control">
                                            <option value="text">text</option>
                                            <option value="textarea">textarea</option>
                                            <option value="select">select</option>
                                            <option value="rich_textarea">富文本</option>
                                        </select>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">数据类型</span>
                                    </div>
                                    <div class="media-body">
                                        <select class="form-control">
                                            <option value="text">Int</option>
                                            <option value="textarea">Double</option>
                                            <option value="select">String</option>
                                            <option value="rich_textarea">.etc</option>
                                        </select>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">是否启用</span>
                                    </div>
                                    <div class="media-body">
                                        <div class="check-group">
                                            <label>
                                                <input name="isEnableField-0" value='{"text": "是", "value": 1}' checked type="radio"/>
                                                <span>是</span>
                                            </label>
                                            <label>
                                                <input name="isEnableField-0" value='{"text": "否", "value": 0}' type="radio"/>
                                                <span>否</span>
                                            </label>
                                        </div>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">字段描述</span>
                                    </div>
                                    <div class="media-body">
                                        <input class="form-control" placeholder="描述字段的用途等" type="text"/>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="media media-middle">
                        <div class="media-left">
                            <span class="control-label">&nbsp;</span>
                        </div>
                        <div class="media-body">
                            <button class="btn btn-block">添加API</button>
                            <div class="body">
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">API名称</span>
                                    </div>
                                    <div class="media-body">
                                        <input class="form-control" type="text"/>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">API URI</span>
                                    </div>
                                    <div class="media-body">
                                        <input class="form-control" placeholder="前缀由API Owner决定，不用填写，如： api/public/、api/role/、api/user/" type="text"/>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">API Method</span>
                                    </div>
                                    <div class="media-body">
                                        <select class="form-control">
                                            <option value="text">GET</option>
                                            <option value="textarea">POST</option>
                                            <option value="select">PUT</option>
                                            <option value="rich_textarea">DELETE</option>
                                        </select>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">API Owner</span>
                                    </div>
                                    <div class="media-body">
                                        <div class="check-group">
                                            <label>
                                                <input name="owner-0" value='{"text": "Public", "value": 0}' checked type="radio"/>
                                                <span>Public</span>
                                            </label>
                                            <label>
                                                <input name="owner-0" value='{"text": "Role", "value": 1}' type="radio"/>
                                                <span>Role</span>
                                            </label>
                                            <label>
                                                <input name="owner-0" value='{"text": "User", "value": 2}' type="radio"/>
                                                <span>User</span>
                                            </label>
                                        </div>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">是否启用</span>
                                    </div>
                                    <div class="media-body">
                                        <div class="check-group">
                                            <label>
                                                <input name="isEnableAPI-0" value='{"text": "是", "value": 1}' checked type="radio"/>
                                                <span>是</span>
                                            </label>
                                            <label>
                                                <input name="isEnableAPI-0" value='{"text": "否", "value": 0}' type="radio"/>
                                                <span>否</span>
                                            </label>
                                        </div>
                                    </div>
                                </label>
                                <label class="media media-middle">
                                    <div class="media-left">
                                        <span class="control-label">API描述</span>
                                    </div>
                                    <div class="media-body">
                                        <textarea class="form-control"cols="30" placeholder="描述Request、Response等" rows="3"></textarea>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer text-right">
                    <button class="btn btn-primary">提交</button>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import config from '../common/config'
    import plugs from '../plugs/plugs'
    import Tree from './tree.vue'
    import Vtext from './control_text.vue'
    export default {
        props: ['activeNav'],
        data() {
            return {
                abc: 'xgda'
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
                var activeNav = this.$get('activeNav'),
                        params = this.$route.params
                if(!activeNav) return
                this.initMod(params)
            })
        },
        methods: {
            test: function() {
                console.log(this)
            },
            initMod: function(params) {
                var plug = plugs[params.module]
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
            initMain: function(params) {
                var self = this,
                        module = params.module,
                        uri = config.modelUri + module
                this.$set('module', params.module)

                this.$http.get({
                    url: uri
                }).then(function(res) {
                    self.$set('layoutData', res.data[0])
                })
            }
        },
        components: {
            Tree,
            Vtext
        }
    }
</script>