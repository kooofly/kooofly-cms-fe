<style>
    .module-editor { margin-bottom: 20px;
        border: 1px solid #ccc;   }
    .module-editor .editor {   padding: 0 20px 20px;   }
    .module-editor .switch{ margin: 0 0 10px; border-bottom: 1px solid #ccc; }
    .module-editor .switch .remove{ font-size: 24px; color: #ccc; padding: 6px; line-height: 1; display: inline-block; }
    .module-editor .switch .advanced{ font-size: 12px; margin-left: 10px; }
    .module-editor .editor .visual{ }
    .module-editor .editor .check-group{ display: inline-block; width: 110px; margin-bottom: 6px; }
    .module-editor .editor .uris{ margin-top: 20px;  }
    .module-editor .editor .add-uri{ margin-top: 10px; display: inline-block; }
    .module-editor .editor .uris:first-child{ margin-top: 0; }
    .add-module { margin-top: -20px; }
</style>
<template>
    <label class="media media-top">
        <div class="media-left">
            <span class="control-label">模块{{attrs.control.label}}</span>
        </div>
        <div class="media-body">
            <div v-for="m in model" class="module-editor">
                <div class="switch">
                    <a class="btn" @click="switchStatus($index)" href="javascript:;" v-text="helpers[$index].switchText"></a>
                    <a class="advanced" v-show="helpers[$index].isVisual" @click="helpers[$index].isAdvanced = !helpers[$index].isAdvanced" href="javascript:;">{{helpers[$index].isAdvanced ? '隐藏' : '显示'}}高级配置</a>
                    <a href="javascript:;" @click="removeModule($index)" class="pull-right remove">×</a>
                </div>
                <div class="editor">
                    <div v-show="helpers[$index].isVisual" class="visual">
                        <label v-show="helpers[$index].isAdvanced" class="media">
                            <div class="media-left">
                                <span class="control-label">Widget</span>
                            </div>
                            <div class="media-body">
                                <input class="form-control" v-model="m.widget" type="text"/>
                            </div>
                        </label>
                        <label v-show="helpers[$index].isAdvanced" class="media">
                            <div class="media-left">
                                <span class="control-label">参数</span>
                            </div>
                            <div class="media-body">
                                <textarea class="form-control" :name="attrs.name" :placeholder="attrs.control.placeholder" cols="30" rows="3" v-model="m.params | json"></textarea>
                            </div>
                        </label>
                        <label class="media">
                            <div class="media-left">
                                <span class="control-label">标题</span>
                            </div>
                            <div class="media-body">
                                <input class="form-control" v-model="m.title" type="text"/>
                            </div>
                        </label>
                        <label class="media media-top">
                            <div class="media-left">
                                <span class="control-label">资源</span>
                            </div>
                            <div class="media-body">
                                <div class="uris" v-for="(index, item) in m.uris">
                                    <div class="check-group">
                                        <label>
                                            <input :value="true" type="radio" v-model="item.isGroup" :name="'uri' + index">
                                            <span>组</span>
                                        </label>
                                        <label>
                                            <input :value="false" type="radio" v-model="item.isGroup" :name="'uri' + index">
                                            <span>自定义</span>
                                        </label>
                                    </div>
                                    <select v-if="item.isGroup" v-model="item.uri" class="form-control">
                                        <option value="a">1</option>
                                        <option value="b">2</option>
                                        <option value="c">4</option>
                                    </select>
                                    <input v-else class="form-control" v-model="item.uri" type="text"/>
                                </div>
                                <a class="add-uri" @click="addUri($index)" href="javascript:;">添加资源</a>
                            </div>
                        </label>
                    </div>
                    <textarea v-show="!helpers[$index].isVisual" :id="'_meditor' + $index" class="form-control json" :name="attrs.name" :placeholder="attrs.control.placeholder" cols="30" rows="6" @blur="changeModel($index)">{{model[$index] | json}}</textarea>
                </div>
            </div>
            <a href="javascript:;" @click="addModel()" class="btn btn-block add-module">添加模块</a>
        </div>
    </label>
</template>
<script>
    export default {
        props: {
            attrs: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            model: {
                twoWay: true
            }
        },
        data: function () {
            return {
                helpers: [],
                defaultHelper: {
                    // 默认显示方式为可视化
                    switchText: 'JSON',
                    isVisual: true,
                    // 默认隐藏高级配置
                    isAdvanced: false
                },
                defaultModel: {
                    widget: '',
                    params: '',
                    title: '',
                    uris:[{
                        // 默认展示组配置
                        isGroup: true
                    }]
                }
            }
        },
        ready: function () {
            var self = this
            if (!this.model) this.model = [Object.assign({}, this.defaultModel)]
            this.model.forEach(function () {
                self.helpers.push(Object.assign({}, self.defaultHelper))
            })
        },
        methods: {
            addModel: function () {
                this.model.push(Object.assign({}, this.defaultModel))
                this.helpers.push(Object.assign({}, this.defaultHelper))
            },
            changeModel: function (index) {
                var el = document.querySelector('#_meditor' + index)
                try {
                    var json = JSON.parse(el.value)
                    this.model[index] = json
                } catch (ex) {
                    // 不作任何处理
                }
            },
            removeModule: function (index) {
                this.model.splice(index, 1)
                this.helpers.splice(index, 1)
            },
            addUri: function (index) {
                this.model[index].uris.push({
                    // 默认展示组配置
                    isGroup: true
                })
            },
            switchStatus: function (index) {
                this.helpers[index].isVisual = !this.helpers[index].isVisual
                this.helpers[index].switchText = this.helpers[index].isVisual ? 'JSON' : '可视化'
            }
        }
    }
</script>