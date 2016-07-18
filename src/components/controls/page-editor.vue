<style>
    .page-config .switch{ margin: 0 0 10px; border-bottom: 1px solid #ccc; }
    .page-config .switch .remove{ font-size: 24px; color: #ccc; padding: 6px; line-height: 1; display: inline-block; }
    .page-config .switch .advanced{ font-size: 12px; margin-left: 10px; }
    .widget-editor { margin-bottom: 20px; border: 1px solid #ccc; }
    .widget-editor .editor {   padding: 0 20px 20px;   }
    .widget-editor .editor .visual{ }
    .widget-editor .editor .check-group{ display: inline-block; width: 130px; margin-bottom: 6px; }
    .add-widget { margin-top: -20px; }
</style>
<template>
    <label class="media media-top">
        <div class="media-left">
            <span class="control-label">{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <div class="page-config">
                <div class="switch">
                    <a class="btn" @click="switchStatus()" href="javascript:;" v-text="switchText"></a>
                </div>
                <textarea v-if="!isVisual" class="form-control" :name="attrs.name" cols="30" rows="30" v-model="model | json"></textarea>
                <div v-else>
                    <div v-for="m in model | widgets" class="widget-editor">
                        <div class="switch">
                            <a class="btn" @click="switchStatus($index)" href="javascript:;" v-text="helpers | helpers $index 'switchText'"></a>
                            <a href="javascript:;" @click="removeWidgets($index)" class="pull-right remove">×</a>
                        </div>
                        <div class="editor">
                            <div v-if="helpers | helpers $index 'isVisual'" class="visual">
                                <label class="media">
                                    <div class="media-left">
                                        <span class="control-label">Widget</span>
                                    </div>
                                    <div class="media-body">
                                        <input class="form-control" v-model="m.widget" type="text"/>
                                    </div>
                                </label>
                                <label class="media media-top">
                                    <div class="media-left">
                                        <span class="control-label">参数</span>
                                    </div>
                                    <div class="media-body">
                                        <textarea class="form-control" :name="attrs.name" :placeholder="attrs.control.placeholder" cols="30" rows="3" v-model="m.params | json"></textarea>
                                    </div>
                                </label>
                                <label class="media">
                                    <div class="media-left">
                                        <span class="control-label">资源</span>
                                    </div>
                                    <div class="media-body">
                                        <div class="uri">
                                            <input v-else class="form-control" placeholder="默认值为 /widgetdata?pageId=:pageId&widgetId=:widgetId，由前端设置" v-model="m.uri" type="text"/>
                                        </div>
                                    </div>
                                </label>
                            </div>
                            <textarea v-else :id="'weditor_' + $index" class="form-control json" :name="attrs.name" :placeholder="attrs.control.placeholder" cols="30" rows="6" @blur="changeWidgets($index)">{{model.widgets[$index] | json}}</textarea>
                        </div>
                    </div>
                    <a href="javascript:;" @click="addWidgets()" class="btn btn-block add-widget">添加模块</a>
                </div>
            </div>
        </div>
    </label>
</template>
<script>
    var defaultWidget = {
        widget: '',
        params: '',
        uri:''
    }
    var defaultModel = {
        page: '',
        widgets: [Object.assign({}, self.defaultHelper)]
    }
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {
                twoWay: true,
                default: function () {
                    return Object.assign({}, defaultModel)
                }
            }
        },
        data: function () {
            return {
                // 默认显示方式为可视化
                switchText: 'JSON',
                isVisual: true,
                // 默认隐藏高级配置
                isAdvanced: false,
                helpers: [],
                defaultHelper: {
                    // 默认显示方式为可视化
                    switchText: 'JSON',
                    isVisual: true,
                    // 默认隐藏高级配置
                    isAdvanced: false
                },
                defaultWidget: defaultWidget
            }
        },
        watch: {
            model: function (newVal) {
                var self = this
                if (newVal && newVal.widgets.length) {
                    var widgets = newVal.widgets
                    widgets.forEach(function () {
                        self.helpers.push(Object.assign({}, self.defaultHelper))
                    })
                }
            }
        },
        created: function () {
            var self = this
            if (!this.model) this.model = Object.assign({}, defaultModel)
            if (this.model && this.model.widgets.length) {
                var widgets = this.model.widgets
                widgets.forEach(function () {
                    self.helpers.push(Object.assign({}, self.defaultHelper))
                })
            }
        },
        methods: {
            addWidgets: function () {
                debugger
                this.model.widgets.push(Object.assign({}, defaultModel))
                this.helpers.push(Object.assign({}, this.defaultHelper))
            },
            changeWidgets: function (index) {
                var el = document.querySelector('#_meditor' + index)
                try {
                    var json = JSON.parse(el.value)
                    this.model.widgets[index] = json
                } catch (ex) {
                    // 不作任何处理
                }
            },
            removeWidgets: function (index) {
                this.model.widgets.splice(index, 1)
                this.helpers.splice(index, 1)
            },
            switchStatus: function (index) {
                if (typeof index === 'number') {
                    this.helpers[index].isVisual = !this.helpers[index].isVisual
                    this.helpers[index].switchText = this.helpers[index].isVisual ? 'JSON' : '可视化'
                } else {
                    this.isVisual = !this.isVisual
                    this.switchText = this.isVisual ? 'JSON' : '可视化'
                }
            }
        },
        filters: {
            widgets: function (value) {
                return value ? value.widgets : []
            },
            helpers: function (value, index, key) {
                return (value && value[index]) ? value[index][key] : ''
            }
        }
    }
</script>