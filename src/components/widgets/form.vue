<template>
    <div class="panel form">
        <div class="title">
            新建/编辑 {{renderData.name}}
        </div>
        <div class="body">
            <v-controls v-for="item in renderData.fields" :attrs="item" :model.sync="model[item.name]"></v-controls>
        </div>
        <div class="footer text-right">
            <button class="btn btn-primary" @click="execAction()">{{attrs.action === "update" ? "更新" : "创建"}}</button>
        </div>
    </div>
</template>
<script>
    import util from '../../common/base/base'
    import store from '../../common/store'
    import config from '../../common/config'
    import VControls from './controls/controls.vue'
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {
                        action: 'create'
                    }
                }
            }
        },
        data () {
            return {
                model: {},
                renderData: {}
            }
        },
        ready () {
            var self = this
            this.$http.get({
                url: this.attrs.uri || config.modelUri + this.attrs.module + "&_single=1"
            }).then(function (res) {
                var data = res.data
                var fields = res.data.fields
                var array = []
                if (fields) {
                    fields.forEach(function (v, i) {
                        if (!v.control) return
                        if (v.control.default) {
                            self.model[v.name] = v.control.default
                        }
                        array.push(v)
                    })
                }
                data.fields = array
                self.renderData = data
            })
            if(this.attrs.action === 'update') {
                this.$http.get({
                    url: this.attrs.modelUri || util.getUri.call(this, module, 'c_update_model', '?_single=1'),
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
                        model.fields = array
                    }

                    self.model = model
                })
            }
        },
        methods: {
            execAction () {
                var module = this.$route.params.module
                // config.apiRoot + module
                var resource = this.attrs.action !== 'update' ?
                        this.$resource(util.getUri.call(this, module, 'c_create')) :
                        this.$resource(util.getUri.call(this, module, 'c_update') + '?_id=' + this.$route.params.id)
                resource[this.action](this.model).then(function (res) {
                    console.log('success', res)
                }, function (res) {
                    console.log('error', res)
                })
            }
        },
        components: {
            VControls
        }
    }
</script>